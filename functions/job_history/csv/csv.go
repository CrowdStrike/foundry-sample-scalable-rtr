package csv

import (
	"encoding/json"
	"fmt"
	"reflect"
	"sort"
	"strconv"
	"strings"
)

// String converts a slice of maps into the string representation of the contents of a CSV file.
func String(records []map[string]any) (string, error) {
	data, err := Table(records)
	if err != nil {
		return "", err
	}

	var buf strings.Builder
	for i, d := range data {
		if i > 0 {
			if _, err = buf.WriteString("\r\n"); err != nil {
				return "", err
			}
		}
		if _, err = buf.WriteString(strings.Join(d, ",")); err != nil {
			return "", err
		}
	}

	return buf.String(), nil
}

// Table coverts a slice of maps into the parts of a CSV table.
// If conversion is successful, Table returns a slice data with the first row containing the headers.
// An error is returned if there are any issues.
func Table(records []map[string]any) ([][]string, error) {
	var err error

	headers := colHeaders(records)
	data := make([][]string, len(records)+1)
	for i, rec := range records {
		data[i+1], err = toRow(rec, headers)
		if err != nil {
			return nil, fmt.Errorf("failed to convert record %d to CSV: %s", i, err)
		}
	}

	data[0] = make([]string, len(headers))
	for i, h := range headers {
		data[0][i] = fmt.Sprintf(`%s`, strconv.Quote(h))
	}

	return data, nil
}

func colHeaders(records []map[string]any) []string {
	headerSet := make(map[string]bool)
	for _, rec := range records {
		for k := range rec {
			headerSet[k] = true
		}
	}

	headers := make([]string, len(headerSet))
	i := 0
	for h := range headerSet {
		headers[i] = h
		i++
	}

	sort.Strings(headers)
	return headers
}

func toRow(rec map[string]any, headers []string) ([]string, error) {
	r := make([]string, len(headers))
	i := 0

	for _, h := range headers {
		v, ok := rec[h]
		if !ok {
			r[i] = `""`
			i++
			continue
		}

		s, err := asString(v)
		if err != nil {
			return nil, fmt.Errorf("failed to convert to string: %s", err)
		}
		r[i] = fmt.Sprintf(`%s`, strconv.Quote(s))
		i++
	}

	return r, nil
}

func asString(v any) (string, error) {
	if s, ok := v.(fmt.Stringer); ok {
		return s.String(), nil
	}

	v = deref(v)
	val := reflect.ValueOf(v)
	switch val.Kind() {
	case reflect.Bool,
		reflect.Complex64, reflect.Complex128,
		reflect.Float32, reflect.Float64,
		reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64,
		reflect.String,
		reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return fmt.Sprint("", v), nil
	case reflect.Array, reflect.Map, reflect.Slice:
		if val.IsNil() {
			return "", nil
		}
		s, err := json.Marshal(v)
		return string(s), err
	case reflect.Struct:
		return fmt.Sprintf("%v", v), nil
	case reflect.Interface:
		if val.IsNil() {
			return "", nil
		}
		return fmt.Sprintf("%v", v), nil
	default:
		return "", fmt.Errorf("unsupported kind: %s", val.Kind().String())
	}
}

func deref(v any) any {
	val := reflect.ValueOf(v)
	if val.Kind() == reflect.Pointer || val.Kind() == reflect.UnsafePointer {
		if val.IsNil() {
			return nil
		}
		return deref(val.Elem())
	}
	return val
}

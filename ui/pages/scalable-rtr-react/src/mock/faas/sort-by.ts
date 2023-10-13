function sortAsc<T, K extends keyof T>(list: T[], fieldName: K) {
  return [...list].sort((a, b) => {
    if (a[fieldName] < b[fieldName]) {
      return -1;
    }
    if (a[fieldName] > b[fieldName]) {
      return 1;
    }
    return 0;
  });
}

function sortDesc<T, K extends keyof T>(list: T[], fieldName: K) {
  return [...list].sort((a, b) => {
    if (a[fieldName] > b[fieldName]) {
      return -1;
    }
    if (a[fieldName] < b[fieldName]) {
      return 1;
    }
    return 0;
  });
}

export function sortBy<T, K extends keyof T>(
  list: T[],
  fieldName: K,
  direction: "ASC" | "DESC",
) {
  const sortOrder = {
    ASC: sortAsc(list, fieldName),
    DESC: sortDesc(list, fieldName),
  };
  return sortOrder[direction];
}

import { describe, expect, test } from "vitest";
import { cronParser, convertJSONToCron } from "@/lib/utils/cron-parser";

describe("cron-parser", () => {
  describe("can parse hourly recurrences", () => {
    test("0 0/1 * * *", () => {
      const result = cronParser("0 0/1 * * *");
      assertNonNullish(result, "cronParser() returned nullish result");
      expect(result.interval).toBe("hourly");
      expect(result.frequency).toBe(1);
      expect(result.startTime).toBe("00:00");
    });

    test("1 9/2 * * *", () => {
      const result = cronParser("1 9/2 * * *");
      assertNonNullish(result, "cronParser() returned nullish result");
      expect(result.interval).toBe("hourly");
      expect(result.frequency).toBe(2);
      expect(result.startTime).toBe("09:01");
    });

    test("30 22/6 * * *", () => {
      const result = cronParser("30 22/6 * * *");
      assertNonNullish(result, "cronParser() returned nullish result");
      expect(result.interval).toBe("hourly");
      expect(result.frequency).toBe(6);
      expect(result.startTime).toBe("22:30");
    });
  });

  describe("can parse daily recurrences", () => {
    test("0 0 */1 * *", () => {
      const result = cronParser("0 0 */1 * *");
      assertNonNullish(result, "cronParser() returned nullish result");
      expect(result.interval).toBe("daily");
      expect(result.frequency).toBe(1);
      expect(result.startTime).toBe("00:00");
    });

    test("15 21 */12 * *", () => {
      const result = cronParser("15 21 */12 * *");
      assertNonNullish(result, "cronParser() returned nullish result");
      expect(result.interval).toBe("daily");
      expect(result.frequency).toBe(12);
      expect(result.startTime).toBe("21:15");
    });

    test("5 4 * * *", () => {
      // Crontab.guru says: "At 04:05"
      const result = cronParser("5 4 * * *");
      assertNonNullish(result, "cronParser() returned nullish result");
      expect(result.interval).toBe("daily");
      expect(result.frequency).toBe(1);
      expect(result.startTime).toBe("04:05");
    });
  });

  describe("can parse weekly recurrences", () => {
    test("30 23 * * 1,4", () => {
      const result = cronParser("30 23 * * 1,4");
      assertNonNullish(result, "cronParser() returned nullish result");
      expect(result.interval).toBe("weekly");
      expect(result.frequency).toBe(1);
      expect(result.startTime).toBe("23:30");
      expect(result.daysInWeek).toStrictEqual([1, 4]);
    });

    test("0 11 * * 0", () => {
      // Repeat every 1 week on Sunday at 11:00
      // Crontab.guru says: "At 11:00 on Sunday"
      const result = cronParser("0 11 * * 0");
      assertNonNullish(result, "cronParser() returned nullish result");
      expect(result.interval).toBe("weekly");
      expect(result.frequency).toBe(1);
      expect(result.startTime).toBe("11:00");
      expect(result.daysInWeek).toStrictEqual([0]);
    });
  });

  describe("can parse monthly recurrences", () => {
    test("30 9 2,23 */1 *", () => {
      const result = cronParser("30 9 2,23 */1 *");
      assertNonNullish(result, "cronParser() returned nullish result");
      expect(result.interval).toBe("monthly");
      expect(result.frequency).toBe(1);
      expect(result.startTime).toBe("09:30");
      expect(result.daysInMonth).toStrictEqual([2, 23]);
    });

    test("15 22 6 */10 *", () => {
      const result = cronParser("15 22 6 */10 *");
      assertNonNullish(result, "cronParser() returned nullish result");
      expect(result.interval).toBe("monthly");
      expect(result.frequency).toBe(10);
      expect(result.startTime).toBe("22:15");
      expect(result.daysInMonth).toStrictEqual([6]);
    });

    test("0 6 1,2,3,4,5,6 */12 *", () => {
      const result = cronParser("0 6 1,2,3,4,5,6 */12 *");
      assertNonNullish(result, "cronParser() returned nullish result");
      expect(result.interval).toBe("monthly");
      expect(result.frequency).toBe(12);
      expect(result.startTime).toBe("06:00");
      expect(result.daysInMonth).toStrictEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});

describe("cron-generator", () => {
  describe("can generate hourly recurrences", () => {
    test("0 0/1 * * *", () => {
      const result = convertJSONToCron({
        interval: "hourly",
        frequency: 1,
        startTime: "00:00",
      });
      expect(result).toBe("0 0/1 * * *");
    });

    test("1 9/2 * * *", () => {
      const result = convertJSONToCron({
        interval: "hourly",
        frequency: 2,
        startTime: "09:01",
      });
      expect(result).toBe("1 9/2 * * *");
    });

    test("30 22/6 * * *", () => {
      const result = convertJSONToCron({
        interval: "hourly",
        frequency: 6,
        startTime: "22:30",
      });
      expect(result).toBe("30 22/6 * * *");
    });
  });

  describe("can generate daily recurrences", () => {
    test("0 0 */1 * *", () => {
      const result = convertJSONToCron({
        interval: "daily",
        frequency: 1,
        startTime: "00:00",
      });
      expect(result).toBe("0 0 */1 * *");
    });

    test("15 21 */12 * *", () => {
      const result = convertJSONToCron({
        interval: "daily",
        frequency: 12,
        startTime: "21:15",
      });
      expect(result).toBe("15 21 */12 * *");
    });
  });

  describe("can generate weekly recurrences", () => {
    test("30 23 * * 1,4", () => {
      const result = convertJSONToCron({
        interval: "weekly",
        frequency: 1,
        startTime: "23:30",
        daysInWeek: [1, 4],
      });
      expect(result).toBe("30 23 * * 1,4");
    });
  });

  describe("can generate monthly recurrences", () => {
    test("30 9 2,23 */1 *", () => {
      const result = convertJSONToCron({
        interval: "monthly",
        frequency: 1,
        startTime: "09:30",
        daysInMonth: [2, 23],
      });
      expect(result).toBe("30 9 2,23 */1 *");
    });

    test("15 22 6 */10 *", () => {
      const result = convertJSONToCron({
        interval: "monthly",
        frequency: 10,
        startTime: "22:15",
        daysInMonth: [6],
      });
      expect(result).toBe("15 22 6 */10 *");
    });

    test("0 6 1,2,3,4,5,6 */12 *", () => {
      const result = convertJSONToCron({
        interval: "monthly",
        frequency: 12,
        startTime: "06:00",
        daysInMonth: [1, 2, 3, 4, 5, 6],
      });
      expect(result).toBe("0 6 1,2,3,4,5,6 */12 *");
    });
  });
});

function assertNonNullish<TValue>(
  value: TValue,
  message: string,
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw Error(message);
  }
}

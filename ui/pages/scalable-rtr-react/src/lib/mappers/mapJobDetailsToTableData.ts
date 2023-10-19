import * as TableDetails from "@/components/table-details/Table";
import { status } from "@/components/run-history/Header";

import { AuditLog, RunHistory } from "@/lib/validations/api-validation";
import { DateFormatString } from "@/lib/utils/datetime";

type MapOptions = {
  timezone: string;
  locale: string;
  dateFormat: DateFormatString;
};

type Body =
  | TableDetails.BodyColumnLink
  | TableDetails.BodyColumnStatus
  | TableDetails.BodyColumnRaw
  | TableDetails.BodyColumnZonedDateTime;

export function mapJobHistoryDetailsToTableData(
  history: RunHistory[],
  options: MapOptions,
): TableDetails.TableData {
  return {
    headColumns: [
      "Status",
      "Date",
      "Hosts",
      "Received files",
      "Output 1",
      "Output 2",
    ],
    bodyColumns: history.map<Array<Body>>((hist) => {
      return [
        {
          label:
            status.find((stat) => stat.key === hist["status"])?.label || "--",
          type: "status",
          icon: status.find((stat) => stat.key === hist["status"])?.icon,
        },
        {
          options,
          label: hist["run_date"],
          timestamp: hist["run_date"],
          type: "zoned-date-time",
        },
        {
          label: String(hist["hosts"].length) || "--",
          type: "raw",
        },
        {
          label: "--",
          type: "raw",
        },
        {
          label: hist["output_1"] ? "Download .csv" : "--",
          type: "link",
          href: hist["output_1"] ?? "--",
        },
        {
          label: hist["output_2"] ? "View In Logscale" : "--",
          type: "link",
          href: hist["output_2"] ?? "--",
        },
      ];
    }),
  };
}

export function mapAuditLogDetailsToTableData(
  auditLog: AuditLog[],
  options: MapOptions,
): TableDetails.TableData {
  return {
    headColumns: ["Date modified", "Version", "Modified by", "Action taken"],
    bodyColumns: auditLog.map<Array<Body>>((hist) => {
      return [
        {
          label: hist["modified_at"],
          type: "zoned-date-time",
          timestamp: hist["modified_at"],
          options,
        },
        {
          label: String(hist["version"]) || "--",
          type: "raw",
        },
        {
          label: hist["modified_by"] || "--",
          type: "raw",
        },
        {
          label: hist["action"] || "--",
          type: "raw",
        },
      ];
    }),
  };
}

import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  BodyColumnLink,
  BodyColumnRaw,
  BodyColumnStatus,
  BodyColumnZonedDateTime,
  BodyColumnNavigation,
} from "@/components/table-details/Table";
import { ZonedDateTime } from "@/components/ZonedDateTime";
import { FalconContext } from "@/lib/contexts/FalconContext/FalconContext";

interface StatusRowProps {
  row: BodyColumnStatus;
}

function StatusRow({ row }: StatusRowProps) {
  return (
    <div className="flex items-center gap-1.5">
      {row.icon}
      {row.label}
    </div>
  );
}

interface LinkRowProps {
  row: BodyColumnLink;
}

interface NavigationRowProps {
  row: BodyColumnNavigation;
}

function LinkRow({ row }: LinkRowProps) {
  return (
    <Link
      to={row.href}
      download={row.isDownloadable}
      className="text-csteal underline"
    >
      {row.label}
    </Link>
  );
}

function Navigation({ row }: NavigationRowProps) {
  const { falcon } = useContext(FalconContext);

  const onNavigateToOutput2 = async () => {
    await falcon.navigation.navigateTo({ path: row.href, target: "_blank" });
  };

  return (
    <button
      type="button"
      className="text-csteal underline"
      onClick={onNavigateToOutput2}
    >
      {row.label}
    </button>
  );
}

function mapRowTypeToTableRow(
  row:
    | BodyColumnLink
    | BodyColumnStatus
    | BodyColumnRaw
    | BodyColumnZonedDateTime
    | BodyColumnNavigation,
) {
  switch (row.type) {
    case "status":
      return <StatusRow row={row} />;
    case "link":
      return <LinkRow row={row} />;
    case "navigation":
      return <Navigation row={row} />;
    case "zoned-date-time":
      return <ZonedDateTime timestamp={row.timestamp} options={row.options} />;
    default:
      return row.label;
  }
}

export default mapRowTypeToTableRow;

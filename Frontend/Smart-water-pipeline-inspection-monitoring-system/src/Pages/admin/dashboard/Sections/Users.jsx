import PageHeader from "../../common/Shared UI Primitives/PageHeader";
import Toolbar from "../../common/ToolBar";
import DataTable from "../../common/Shared UI Primitives/DataTable";
import StatusBadge from "../../common/Shared UI Primitives/StatusBadge";
import RowActions from "../../common/RowActions";


const USERS_DATA = [
  { id: "U-01", name: "Admin User", email: "admin@aquasentry.gov.in", role: "System Administrator", dept: "IT Cell", status: "Active", lastLogin: "2026-09-30 09:02" },
  { id: "U-02", name: "R. Mehta", email: "r.mehta@aquasentry.gov.in", role: "Inspector", dept: "Field Operations", status: "Active", lastLogin: "2026-09-29 14:20" },
  { id: "U-03", name: "S. Kulkarni", email: "s.kulkarni@aquasentry.gov.in", role: "Engineer", dept: "Engineering", status: "Active", lastLogin: "2026-09-28 11:47" },
  { id: "U-04", name: "A. Verma", email: "a.verma@aquasentry.gov.in", role: "Maintenance Officer", dept: "Maintenance", status: "Disabled", lastLogin: "2026-09-10 08:15" },
  { id: "U-05", name: "P. Joshi", email: "p.joshi@aquasentry.gov.in", role: "Viewer", dept: "Public Relations", status: "Active", lastLogin: "2026-09-27 17:03" },
];



function UsersSection() {
  return (
    <div>
      <PageHeader title="Users" subtitle="Department staff and role access" />
      <Toolbar searchPlaceholder="Search users..." onAddClick={() => {}} addLabel="Add User" />
      <DataTable
        columns={[
          { key: "id", label: "User ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
          { key: "dept", label: "Department" },
          { key: "status", label: "Status", render: (r) => <StatusBadge value={r.status} /> },
          { key: "lastLogin", label: "Last Login" },
          { key: "actions", label: "Actions", render: () => <RowActions onView={() => {}} onEdit={() => {}} onDelete={() => {}} /> },
        ]}
        rows={USERS_DATA}
      />
    </div>
  );
}
export default UsersSection;
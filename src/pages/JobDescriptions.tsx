import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, RefreshCw, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const jobs = [
  { id: 9, title: "AVP", category: "King Courier Hiring", posted: "18/09/2025 14:09:43", status: "Inactive" },
  { id: 13, title: "Veteran Fedex Driver", category: "FedEx P&D FADV Processing", posted: "18/09/2025 14:09:56", status: "Inactive" },
  { id: 5, title: "AVP", category: "FedEx P&D FADV Processing", posted: "18/09/2025 14:09:23", status: "Inactive" },
  { id: 27, title: "Bulk Truck (L20)", category: "FedEx P&D Full Service", posted: "08/08/2025 17:55:03", status: "Active" },
  { id: 1, title: "CDL Team Run", category: "Fedex CDL Hiring", posted: "08/08/2025 17:46:51", status: "Active" },
  { id: 37, title: "Lead Driver", category: "FedEx P&D Full Service", posted: "18/09/2025 14:13:12", status: "Active" },
];

const JobDescriptions = () => {
  return (
    <div className="page-container animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0">
          <h1 className="page-title">Job Descriptions</h1>
          <p className="page-subtitle">Manage your job listings</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Job
        </Button>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <Input type="date" placeholder="Start Date" className="w-40" />
        <Input type="date" placeholder="End Date" className="w-40" />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by title, category..." className="pl-9" />
        </div>
        <Button variant="outline" size="icon">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Table */}
      <div className="data-table">
        <table className="w-full">
          <thead className="data-table-header">
            <tr>
              <th className="data-table-cell text-left">Vendor Job ID ↑↓</th>
              <th className="data-table-cell text-left">Title ↑↓</th>
              <th className="data-table-cell text-left">Category ↑↓</th>
              <th className="data-table-cell text-left">Posted ↑↓</th>
              <th className="data-table-cell text-left">Status ↑↓</th>
              <th className="data-table-cell text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="data-table-row">
                <td className="data-table-cell">{job.id}</td>
                <td className="data-table-cell font-medium">{job.title}</td>
                <td className="data-table-cell text-primary">{job.category}</td>
                <td className="data-table-cell text-muted-foreground">⏱ {job.posted}</td>
                <td className="data-table-cell">
                  <span className={`status-badge ${job.status === "Active" ? "status-active" : "status-inactive"}`}>
                    {job.status}
                  </span>
                </td>
                <td className="data-table-cell text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobDescriptions;

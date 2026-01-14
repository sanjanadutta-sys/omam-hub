import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, RefreshCw, MoreHorizontal, Phone, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const candidates = [
  { id: 1, name: "Ronak Shah", email: "ronak@intglobal.com", phone: "+18123277308", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 08:32 AM CDT" },
  { id: 2, name: "Test", email: "--", phone: "+916290512352", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 03:05 AM ADT" },
  { id: 3, name: "Santosh Singh", email: "tarak@intglobal.com", phone: "+916290512352", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 02:21 AM CDT" },
  { id: 4, name: "Paloma", email: "--", phone: "+916289715423", client: "Tsavo West Inc", jobTitle: "Weekend L20 Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 03:05 AM ADT" },
  { id: 5, name: "Mukesh Singh", email: "mukesh@yopmail.com", phone: "+916290512352", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 01:59 AM CDT" },
  { id: 6, name: "Jayden", email: "--", phone: "+918777315232", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 01:40 AM CDT" },
];

const Candidates = () => {
  return (
    <div className="page-container animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0">
          <h1 className="page-title">Candidates</h1>
          <p className="page-subtitle">Manage your candidates</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              Vapi
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Ultravox
            </span>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <Input type="date" placeholder="Start Date" className="w-40" />
        <Input type="date" placeholder="End Date" className="w-40" />
        <Select defaultValue="all">
          <SelectTrigger className="w-24">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name/email/phone..." className="pl-9" />
        </div>
        <Button variant="outline" size="icon">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Table */}
      <div className="data-table overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="data-table-header">
            <tr>
              <th className="data-table-cell text-left">Candidate Name ↑↓</th>
              <th className="data-table-cell text-left">Email ↑↓</th>
              <th className="data-table-cell text-left">Phone ↑↓</th>
              <th className="data-table-cell text-left">Client ↑↓</th>
              <th className="data-table-cell text-left">Job Title ↑↓</th>
              <th className="data-table-cell text-left">Vendor</th>
              <th className="data-table-cell text-left">Created At ↓</th>
              <th className="data-table-cell text-center">CV</th>
              <th className="data-table-cell text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="data-table-row">
                <td className="data-table-cell">
                  <div className="flex items-center gap-2">
                    <div className="avatar-circle">
                      {candidate.name.charAt(0)}
                    </div>
                    <span className="font-medium">{candidate.name}</span>
                  </div>
                </td>
                <td className="data-table-cell">
                  {candidate.email !== "--" ? (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      {candidate.email}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">--</span>
                  )}
                </td>
                <td className="data-table-cell">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="h-7 w-7 bg-success/10 text-success hover:bg-success/20">
                      <Phone className="w-3 h-3" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 bg-primary/10 text-primary hover:bg-primary/20">
                      <Phone className="w-3 h-3" />
                    </Button>
                    <span className="text-muted-foreground">{candidate.phone}</span>
                  </div>
                </td>
                <td className="data-table-cell">{candidate.client}</td>
                <td className="data-table-cell text-primary">{candidate.jobTitle}</td>
                <td className="data-table-cell text-primary">{candidate.vendor}</td>
                <td className="data-table-cell text-muted-foreground text-sm">{candidate.createdAt}</td>
                <td className="data-table-cell text-center text-muted-foreground">--</td>
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
                      <DropdownMenuItem>Schedule Call</DropdownMenuItem>
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

export default Candidates;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, RefreshCw, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const clients = [
  { id: 40, name: "Jab Express, INC (Watertown)", contact: "Ancile Services", company: "Jab Express, INC", category: "FedEx P&D Full Service", date: "08/01/2026 08:47:23", timezone: "Eastern Daylight" },
  { id: 45, name: "Aurora 64", contact: "Ancile Services", company: "Aurora 64", category: "FedEx P&D Full Service", date: "08/01/2026 08:47:23", timezone: "Central Daylight" },
  { id: 5, name: "MikNik Inc", contact: "Ancile Services", company: "MikNik Inc.", category: "FedEx P&D Full Service", date: "08/01/2026 08:47:23", timezone: "Mountain Standard" },
  { id: 31, name: "Piper Haulier, Inc.", contact: "Ancile Services", company: "Piper Haulier, Inc.", category: "FedEx P&D FADV Processing", date: "08/01/2026 08:47:23", timezone: "America/Phoenix" },
  { id: 11, name: "KSJ & DAWKINS INC", contact: "Ancile Services", company: "KSJ & DAWKINS INC", category: "FedEx P&D Full Service", date: "08/01/2026 08:47:23", timezone: "Eastern Daylight" },
];

const Clients = () => {
  return (
    <div className="page-container animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0">
          <h1 className="page-title">Clients</h1>
          <p className="page-subtitle">Manage your client companies</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <Input type="date" placeholder="Start Date" className="w-40" />
        <Input type="date" placeholder="End Date" className="w-40" />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name/company/category..." className="pl-9" />
        </div>
        <Button variant="outline" size="icon">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Table */}
      <div className="data-table overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="data-table-header">
            <tr>
              <th className="data-table-cell text-left">Vendor Client ID ↑↓</th>
              <th className="data-table-cell text-left">Name ↑↓</th>
              <th className="data-table-cell text-left">Contact Person ↑↓</th>
              <th className="data-table-cell text-left">Company ↑↓</th>
              <th className="data-table-cell text-left">Job Category ↑↓</th>
              <th className="data-table-cell text-left">Date ↓</th>
              <th className="data-table-cell text-left">Time Zone</th>
              <th className="data-table-cell text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="data-table-row">
                <td className="data-table-cell">{client.id}</td>
                <td className="data-table-cell">
                  <div className="flex items-center gap-2">
                    <div className="avatar-circle">
                      {client.name.charAt(0)}
                    </div>
                    <span className="font-medium text-primary">{client.name}</span>
                  </div>
                </td>
                <td className="data-table-cell">{client.contact}</td>
                <td className="data-table-cell text-primary">{client.company}</td>
                <td className="data-table-cell">{client.category}</td>
                <td className="data-table-cell text-muted-foreground">{client.date}</td>
                <td className="data-table-cell text-muted-foreground">{client.timezone}</td>
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

export default Clients;

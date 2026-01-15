import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, RefreshCw, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataStore } from "@/stores/dataStore";
import { toast } from "sonner";

const Clients = () => {
  const { clients } = useDataStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        client.name.toLowerCase().includes(searchLower) ||
        client.company.toLowerCase().includes(searchLower) ||
        client.category.toLowerCase().includes(searchLower) ||
        client.contact.toLowerCase().includes(searchLower) ||
        client.timezone.toLowerCase().includes(searchLower);
      
      return matchesSearch;
    });
  }, [clients, searchQuery]);

  const handleRefresh = () => {
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
    toast.success("Filters cleared");
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0">
          <h1 className="page-title">Clients</h1>
          <p className="page-subtitle">Manage your client companies ({filteredClients.length} total)</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <Input 
          type="date" 
          placeholder="Start Date" 
          className="w-40" 
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input 
          type="date" 
          placeholder="End Date" 
          className="w-40" 
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name/company/category..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh}>
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
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={8} className="data-table-cell text-center py-8 text-muted-foreground">
                  No clients found matching your search.
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;

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
import { isDateInRange } from "@/lib/dateUtils";

const JobDescriptions = () => {
  const { jobs } = useDataStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        job.title.toLowerCase().includes(searchLower) ||
        job.category.toLowerCase().includes(searchLower) ||
        job.status.toLowerCase().includes(searchLower);
      
      const matchesDate = isDateInRange(job.posted, startDate, endDate);
      
      return matchesSearch && matchesDate;
    });
  }, [jobs, searchQuery, startDate, endDate]);

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
          <h1 className="page-title">Job Descriptions</h1>
          <p className="page-subtitle">Manage your job listings ({filteredJobs.length} total)</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Job
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
            placeholder="Search by title, category..." 
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
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="data-table-cell text-center py-8 text-muted-foreground">
                  No jobs found matching your search.
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobDescriptions;

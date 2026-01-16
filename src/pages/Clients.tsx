import { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, RefreshCw, MoreHorizontal, Upload, FileSpreadsheet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDataStore, Client } from "@/stores/dataStore";
import { toast } from "sonner";
import { isDateInRange } from "@/lib/dateUtils";
import TablePagination from "@/components/TablePagination";
import * as XLSX from "xlsx";

const Clients = () => {
  const { clients, addClients, deleteClient } = useDataStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Upload state
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        client.name.toLowerCase().includes(searchLower) ||
        client.company.toLowerCase().includes(searchLower) ||
        client.category.toLowerCase().includes(searchLower) ||
        client.contact.toLowerCase().includes(searchLower) ||
        client.timezone.toLowerCase().includes(searchLower);
      
      const matchesDate = isDateInRange(client.date, startDate, endDate);
      
      return matchesSearch && matchesDate;
    });
  }, [clients, searchQuery, startDate, endDate]);

  // Paginated data
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredClients.slice(start, start + pageSize);
  }, [filteredClients, currentPage, pageSize]);

  const handleRefresh = () => {
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
    toast.success("Filters cleared");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValidType = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
      if (!isValidType) {
        toast.error("Please upload a valid Excel file (.xlsx or .xls)");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);

    try {
      const data = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length === 0) {
        toast.error("The Excel file is empty");
        setIsUploading(false);
        return;
      }

      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const newClients: Client[] = jsonData.map((row: any, index: number) => ({
        id: Date.now() + index,
        name: row.Name || row.name || row["Client Name"] || "--",
        contact: row.Contact || row.contact || row["Contact Person"] || "--",
        company: row.Company || row.company || "--",
        category: row.Category || row.category || row["Job Category"] || "--",
        date: formattedDate,
        timezone: row.Timezone || row.timezone || row["Time Zone"] || "Eastern Daylight",
      }));

      addClients(newClients);
      toast.success(`Successfully imported ${newClients.length} clients`);
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
      setCurrentPage(1);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error parsing Excel file:", error);
      toast.error("Failed to parse the Excel file. Please check the format.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setSelectedFile(file);
    } else {
      toast.error("Please upload a valid Excel file (.xlsx or .xls)");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDeleteClient = (client: Client) => {
    deleteClient(client.id);
    toast.success(`Deleted ${client.name}`);
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0">
          <h1 className="page-title">Clients</h1>
          <p className="page-subtitle">Manage your client companies ({filteredClients.length} total)</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="w-4 h-4" />
            Import Excel
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Import Clients from Excel</DialogTitle>
            <DialogDescription>
              Upload an Excel file (.xlsx or .xls) to bulk import clients.
            </DialogDescription>
          </DialogHeader>
          <div 
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".xlsx,.xls"
              className="hidden"
            />
            {selectedFile ? (
              <div className="flex flex-col items-center gap-2">
                <FileSpreadsheet className="w-12 h-12 text-success" />
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-12 h-12 text-muted-foreground" />
                <p className="font-medium">Drop your Excel file here</p>
                <p className="text-sm text-muted-foreground">
                  or click to browse
                </p>
              </div>
            )}
          </div>
          <div className="bg-muted/50 rounded-md p-3 text-sm">
            <p className="font-medium mb-1">Expected columns:</p>
            <p className="text-muted-foreground">
              Name, Contact, Company, Category, Timezone
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsUploadDialogOpen(false);
              setSelectedFile(null);
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
              {isUploading ? "Importing..." : "Import Clients"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            {paginatedClients.length === 0 ? (
              <tr>
                <td colSpan={8} className="data-table-cell text-center py-8 text-muted-foreground">
                  No clients found matching your search.
                </td>
              </tr>
            ) : (
              paginatedClients.map((client) => (
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
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDeleteClient(client)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalItems={filteredClients.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default Clients;

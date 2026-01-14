import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, RefreshCw, MoreHorizontal, Phone, Mail, Upload, FileSpreadsheet } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  client: string;
  jobTitle: string;
  vendor: string;
  createdAt: string;
}

const initialCandidates: Candidate[] = [
  { id: 1, name: "Ronak Shah", email: "ronak@intglobal.com", phone: "+18123277308", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 08:32 AM CDT" },
  { id: 2, name: "Test", email: "--", phone: "+916290512352", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 03:05 AM ADT" },
  { id: 3, name: "Santosh Singh", email: "tarak@intglobal.com", phone: "+916290512352", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 02:21 AM CDT" },
  { id: 4, name: "Paloma", email: "--", phone: "+916289715423", client: "Tsavo West Inc", jobTitle: "Weekend L20 Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 03:05 AM ADT" },
  { id: 5, name: "Mukesh Singh", email: "mukesh@yopmail.com", phone: "+916290512352", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 01:59 AM CDT" },
  { id: 6, name: "Jayden", email: "--", phone: "+918777315232", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 01:40 AM CDT" },
];

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        ".xlsx",
        ".xls"
      ];
      const isValidType = validTypes.some(type => 
        file.type === type || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
      );
      
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
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short'
      });

      const newCandidates: Candidate[] = jsonData.map((row: any, index: number) => ({
        id: candidates.length + index + 1,
        name: row.Name || row.name || row["Candidate Name"] || "--",
        email: row.Email || row.email || "--",
        phone: row.Phone || row.phone || row["Phone Number"] || "--",
        client: row.Client || row.client || "--",
        jobTitle: row["Job Title"] || row.jobTitle || row.JobTitle || "--",
        vendor: row.Vendor || row.vendor || "--",
        createdAt: formattedDate,
      }));

      setCandidates(prev => [...newCandidates, ...prev]);
      toast.success(`Successfully imported ${newCandidates.length} candidates`);
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
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
          <Button variant="outline" className="gap-2" onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="w-4 h-4" />
            Import Excel
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Import Candidates from Excel</DialogTitle>
            <DialogDescription>
              Upload an Excel file (.xlsx or .xls) to bulk import candidates.
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
              Name, Email, Phone, Client, Job Title, Vendor
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
              {isUploading ? "Importing..." : "Import Candidates"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

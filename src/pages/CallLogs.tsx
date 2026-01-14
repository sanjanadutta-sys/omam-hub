import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, MoreHorizontal, PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react";
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

const callLogs = [
  { id: 1, candidate: "Ronak Shah", phone: "+18123277308", type: "outgoing", duration: "5:32", status: "Completed", date: "13th Jan 2026 at 09:15 AM CDT", notes: "Discussed availability" },
  { id: 2, candidate: "Santosh Singh", phone: "+916290512352", type: "incoming", duration: "3:45", status: "Completed", date: "13th Jan 2026 at 08:30 AM CDT", notes: "Follow-up on application" },
  { id: 3, candidate: "Paloma", phone: "+916289715423", type: "missed", duration: "--", status: "Missed", date: "13th Jan 2026 at 08:00 AM CDT", notes: "Callback scheduled" },
  { id: 4, candidate: "Mukesh Singh", phone: "+916290512352", type: "outgoing", duration: "8:12", status: "Completed", date: "12th Jan 2026 at 04:45 PM CDT", notes: "Initial screening" },
  { id: 5, candidate: "Jayden", phone: "+918777315232", type: "outgoing", duration: "2:18", status: "Completed", date: "12th Jan 2026 at 03:20 PM CDT", notes: "Quick verification" },
  { id: 6, candidate: "Test", phone: "+916290512352", type: "missed", duration: "--", status: "Missed", date: "12th Jan 2026 at 02:00 PM CDT", notes: "No answer" },
];

const getCallIcon = (type: string) => {
  switch (type) {
    case "incoming":
      return <PhoneIncoming className="w-4 h-4 text-success" />;
    case "outgoing":
      return <PhoneOutgoing className="w-4 h-4 text-primary" />;
    case "missed":
      return <PhoneMissed className="w-4 h-4 text-destructive" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  if (status === "Completed") {
    return <span className="status-badge status-active">Completed</span>;
  }
  return <span className="status-badge status-inactive">Missed</span>;
};

const CallLogs = () => {
  return (
    <div className="page-container animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0">
          <h1 className="page-title">Call Logs</h1>
          <p className="page-subtitle">View and manage all candidate call records</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <Input type="date" placeholder="Start Date" className="w-40" />
        <Input type="date" placeholder="End Date" className="w-40" />
        <Select defaultValue="all">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="incoming">Incoming</SelectItem>
            <SelectItem value="outgoing">Outgoing</SelectItem>
            <SelectItem value="missed">Missed</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="missed">Missed</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by candidate/phone..." className="pl-9" />
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
              <th className="data-table-cell text-left">Type</th>
              <th className="data-table-cell text-left">Candidate ↑↓</th>
              <th className="data-table-cell text-left">Phone ↑↓</th>
              <th className="data-table-cell text-left">Duration</th>
              <th className="data-table-cell text-left">Status ↑↓</th>
              <th className="data-table-cell text-left">Date ↓</th>
              <th className="data-table-cell text-left">Notes</th>
              <th className="data-table-cell text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {callLogs.map((log) => (
              <tr key={log.id} className="data-table-row">
                <td className="data-table-cell">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary">
                    {getCallIcon(log.type)}
                  </div>
                </td>
                <td className="data-table-cell">
                  <div className="flex items-center gap-2">
                    <div className="avatar-circle">
                      {log.candidate.charAt(0)}
                    </div>
                    <span className="font-medium">{log.candidate}</span>
                  </div>
                </td>
                <td className="data-table-cell text-muted-foreground">{log.phone}</td>
                <td className="data-table-cell font-medium">{log.duration}</td>
                <td className="data-table-cell">{getStatusBadge(log.status)}</td>
                <td className="data-table-cell text-muted-foreground text-sm">{log.date}</td>
                <td className="data-table-cell text-muted-foreground text-sm">{log.notes}</td>
                <td className="data-table-cell text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Play Recording</DropdownMenuItem>
                      <DropdownMenuItem>Add Note</DropdownMenuItem>
                      <DropdownMenuItem>Call Back</DropdownMenuItem>
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

export default CallLogs;

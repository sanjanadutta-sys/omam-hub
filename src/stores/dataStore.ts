import { create } from 'zustand';

export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  client: string;
  jobTitle: string;
  vendor: string;
  createdAt: string;
}

export interface Client {
  id: number;
  name: string;
  contact: string;
  company: string;
  category: string;
  date: string;
  timezone: string;
}

export interface Job {
  id: number;
  title: string;
  category: string;
  posted: string;
  status: "Active" | "Inactive";
}

export interface CallLog {
  id: number;
  candidate: string;
  phone: string;
  type: "incoming" | "outgoing" | "missed";
  duration: string;
  status: "Completed" | "Missed";
  date: string;
  notes: string;
}

interface DataStore {
  candidates: Candidate[];
  clients: Client[];
  jobs: Job[];
  callLogs: CallLog[];
  addCandidates: (newCandidates: Candidate[]) => void;
  addClient: (client: Client) => void;
  addJob: (job: Job) => void;
  addCallLog: (log: CallLog) => void;
  setCandidates: (candidates: Candidate[]) => void;
  setClients: (clients: Client[]) => void;
  setJobs: (jobs: Job[]) => void;
  setCallLogs: (callLogs: CallLog[]) => void;
}

const initialCandidates: Candidate[] = [
  { id: 1, name: "Ronak Shah", email: "ronak@intglobal.com", phone: "+18123277308", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 08:32 AM CDT" },
  { id: 2, name: "Test", email: "--", phone: "+916290512352", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 03:05 AM ADT" },
  { id: 3, name: "Santosh Singh", email: "tarak@intglobal.com", phone: "+916290512352", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 02:21 AM CDT" },
  { id: 4, name: "Paloma", email: "--", phone: "+916289715423", client: "Tsavo West Inc", jobTitle: "Weekend L20 Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 03:05 AM ADT" },
  { id: 5, name: "Mukesh Singh", email: "mukesh@yopmail.com", phone: "+916290512352", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 01:59 AM CDT" },
  { id: 6, name: "Jayden", email: "--", phone: "+918777315232", client: "Aurora 64", jobTitle: "FedEx Delivery Driver", vendor: "Tapai Ghosh", createdAt: "13th Jan 2026 at 01:40 AM CDT" },
];

const initialClients: Client[] = [
  { id: 40, name: "Jab Express, INC (Watertown)", contact: "Ancile Services", company: "Jab Express, INC", category: "FedEx P&D Full Service", date: "08/01/2026 08:47:23", timezone: "Eastern Daylight" },
  { id: 45, name: "Aurora 64", contact: "Ancile Services", company: "Aurora 64", category: "FedEx P&D Full Service", date: "08/01/2026 08:47:23", timezone: "Central Daylight" },
  { id: 5, name: "MikNik Inc", contact: "Ancile Services", company: "MikNik Inc.", category: "FedEx P&D Full Service", date: "08/01/2026 08:47:23", timezone: "Mountain Standard" },
  { id: 31, name: "Piper Haulier, Inc.", contact: "Ancile Services", company: "Piper Haulier, Inc.", category: "FedEx P&D FADV Processing", date: "08/01/2026 08:47:23", timezone: "America/Phoenix" },
  { id: 11, name: "KSJ & DAWKINS INC", contact: "Ancile Services", company: "KSJ & DAWKINS INC", category: "FedEx P&D Full Service", date: "08/01/2026 08:47:23", timezone: "Eastern Daylight" },
];

const initialJobs: Job[] = [
  { id: 9, title: "AVP", category: "King Courier Hiring", posted: "18/09/2025 14:09:43", status: "Inactive" },
  { id: 13, title: "Veteran Fedex Driver", category: "FedEx P&D FADV Processing", posted: "18/09/2025 14:09:56", status: "Inactive" },
  { id: 5, title: "AVP", category: "FedEx P&D FADV Processing", posted: "18/09/2025 14:09:23", status: "Inactive" },
  { id: 27, title: "Bulk Truck (L20)", category: "FedEx P&D Full Service", posted: "08/08/2025 17:55:03", status: "Active" },
  { id: 1, title: "CDL Team Run", category: "Fedex CDL Hiring", posted: "08/08/2025 17:46:51", status: "Active" },
  { id: 37, title: "Lead Driver", category: "FedEx P&D Full Service", posted: "18/09/2025 14:13:12", status: "Active" },
];

const initialCallLogs: CallLog[] = [
  { id: 1, candidate: "Ronak Shah", phone: "+18123277308", type: "outgoing", duration: "5:32", status: "Completed", date: "13th Jan 2026 at 09:15 AM CDT", notes: "Discussed availability" },
  { id: 2, candidate: "Santosh Singh", phone: "+916290512352", type: "incoming", duration: "3:45", status: "Completed", date: "13th Jan 2026 at 08:30 AM CDT", notes: "Follow-up on application" },
  { id: 3, candidate: "Paloma", phone: "+916289715423", type: "missed", duration: "--", status: "Missed", date: "13th Jan 2026 at 08:00 AM CDT", notes: "Callback scheduled" },
  { id: 4, candidate: "Mukesh Singh", phone: "+916290512352", type: "outgoing", duration: "8:12", status: "Completed", date: "12th Jan 2026 at 04:45 PM CDT", notes: "Initial screening" },
  { id: 5, candidate: "Jayden", phone: "+918777315232", type: "outgoing", duration: "2:18", status: "Completed", date: "12th Jan 2026 at 03:20 PM CDT", notes: "Quick verification" },
  { id: 6, candidate: "Test", phone: "+916290512352", type: "missed", duration: "--", status: "Missed", date: "12th Jan 2026 at 02:00 PM CDT", notes: "No answer" },
];

export const useDataStore = create<DataStore>((set) => ({
  candidates: initialCandidates,
  clients: initialClients,
  jobs: initialJobs,
  callLogs: initialCallLogs,
  
  addCandidates: (newCandidates) => set((state) => ({
    candidates: [...newCandidates, ...state.candidates]
  })),
  
  addClient: (client) => set((state) => ({
    clients: [client, ...state.clients]
  })),
  
  addJob: (job) => set((state) => ({
    jobs: [job, ...state.jobs]
  })),
  
  addCallLog: (log) => set((state) => ({
    callLogs: [log, ...state.callLogs]
  })),
  
  setCandidates: (candidates) => set({ candidates }),
  setClients: (clients) => set({ clients }),
  setJobs: (jobs) => set({ jobs }),
  setCallLogs: (callLogs) => set({ callLogs }),
}));

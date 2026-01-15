import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Building2, Phone, TrendingUp, Clock } from "lucide-react";
import { useDataStore } from "@/stores/dataStore";
import { useMemo } from "react";

const Dashboard = () => {
  const { candidates, clients, jobs, callLogs } = useDataStore();

  const stats = useMemo(() => {
    const todaysCalls = callLogs.filter(log => log.date.includes("13th Jan 2026")).length;
    const activeJobs = jobs.filter(job => job.status === "Active").length;
    
    return [
      { title: "Total Candidates", value: candidates.length.toLocaleString(), icon: Users, change: "+12%" },
      { title: "Active Jobs", value: activeJobs.toString(), icon: FileText, change: "+4%" },
      { title: "Clients", value: clients.length.toString(), icon: Building2, change: "+8%" },
      { title: "Calls Today", value: todaysCalls.toString(), icon: Phone, change: "+15%" },
    ];
  }, [candidates, clients, jobs, callLogs]);

  const recentActivity = useMemo(() => {
    const activities: { id: number; action: string; name: string; time: string }[] = [];
    
    // Add recent candidates
    candidates.slice(0, 2).forEach((c, i) => {
      activities.push({
        id: i + 1,
        action: "New candidate added",
        name: c.name,
        time: c.createdAt.includes("08:32") ? "2 minutes ago" : 
              c.createdAt.includes("03:05") ? "15 minutes ago" : "1 hour ago"
      });
    });
    
    // Add recent jobs
    jobs.slice(0, 1).forEach((j, i) => {
      activities.push({
        id: activities.length + 1,
        action: "Job posted",
        name: j.title,
        time: "15 minutes ago"
      });
    });
    
    // Add recent clients
    clients.slice(0, 1).forEach((c, i) => {
      activities.push({
        id: activities.length + 1,
        action: "Client meeting scheduled",
        name: c.name,
        time: "1 hour ago"
      });
    });
    
    // Add recent calls
    callLogs.slice(0, 1).forEach((c, i) => {
      activities.push({
        id: activities.length + 1,
        action: "Call logged",
        name: c.candidate,
        time: "3 hours ago"
      });
    });
    
    return activities;
  }, [candidates, clients, jobs, callLogs]);

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's an overview of your recruiting activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 py-3 border-b border-border last:border-0"
              >
                <div className="avatar-circle">
                  {activity.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.action}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {activity.name}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

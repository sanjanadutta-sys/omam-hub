import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Building2, Phone, TrendingUp, Clock } from "lucide-react";

const stats = [
  { title: "Total Candidates", value: "1,234", icon: Users, change: "+12%" },
  { title: "Active Jobs", value: "56", icon: FileText, change: "+4%" },
  { title: "Clients", value: "89", icon: Building2, change: "+8%" },
  { title: "Calls Today", value: "24", icon: Phone, change: "+15%" },
];

const recentActivity = [
  { id: 1, action: "New candidate added", name: "Ronak Shah", time: "2 minutes ago" },
  { id: 2, action: "Job posted", name: "FedEx Delivery Driver", time: "15 minutes ago" },
  { id: 3, action: "Client meeting scheduled", name: "Aurora 64", time: "1 hour ago" },
  { id: 4, action: "Interview completed", name: "Santosh Singh", time: "2 hours ago" },
  { id: 5, action: "Call logged", name: "Paloma", time: "3 hours ago" },
];

const Dashboard = () => {
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

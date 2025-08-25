import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { TokenUsage } from "./TokenUsageCard";

interface DashboardStatsProps {
  tokenUsages: TokenUsage[];
}

export const DashboardStats = ({ tokenUsages }: DashboardStatsProps) => {
  const totalAccounts = tokenUsages.length;
  const totalTokensUsed = tokenUsages.reduce((sum, usage) => sum + usage.tokensUsed, 0);
  const totalTokensRemaining = tokenUsages.reduce((sum, usage) => sum + usage.tokensRemaining, 0);
  const lowTokenAccounts = tokenUsages.filter(usage => 
    (usage.tokensUsed / usage.tokensTotal) >= 0.8
  ).length;

  const stats = [
    {
      title: "Total Accounts",
      value: totalAccounts.toString(),
      icon: Users,
      description: "Connected API keys"
    },
    {
      title: "Tokens Used",
      value: totalTokensUsed.toLocaleString(),
      icon: Activity,
      description: "Across all accounts"
    },
    {
      title: "Tokens Remaining",
      value: totalTokensRemaining.toLocaleString(),
      icon: TrendingUp,
      description: "Available tokens"
    },
    {
      title: "Low Token Alerts",
      value: lowTokenAccounts.toString(),
      icon: AlertTriangle,
      description: "Accounts below 20%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
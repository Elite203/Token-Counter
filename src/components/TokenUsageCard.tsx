import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Trash2, RefreshCw } from "lucide-react";
import { useState } from "react";

export interface TokenUsage {
  id: string;
  accountName: string;
  apiKey: string;
  tokensTotal: number;
  tokensUsed: number;
  tokensRemaining: number;
  lastUpdated: string;
}

interface TokenUsageCardProps {
  usage: TokenUsage;
  onRefresh: (id: string) => void;
  onRemove: (id: string) => void;
}

export const TokenUsageCard = ({ usage, onRefresh, onRemove }: TokenUsageCardProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const usagePercentage = (usage.tokensUsed / usage.tokensTotal) * 100;
  
  const getStatusVariant = () => {
    if (usagePercentage >= 80) return "destructive";
    if (usagePercentage >= 50) return "warning";
    return "success";
  };

  const getStatusText = () => {
    if (usagePercentage >= 80) return "Low tokens";
    if (usagePercentage >= 50) return "Medium usage";
    return "Healthy";
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return "•".repeat(key.length);
    return key.slice(0, 4) + "•".repeat(key.length - 8) + key.slice(-4);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">{usage.accountName}</CardTitle>
        <Badge variant={getStatusVariant()}>{getStatusText()}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">API Key:</span>
          <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
            {showApiKey ? usage.apiKey : maskApiKey(usage.apiKey)}
          </code>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiKey(!showApiKey)}
            className="h-8 w-8 p-0"
          >
            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Used</span>
            <span className="font-medium">{usage.tokensUsed.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Remaining</span>
            <span className="font-medium">{usage.tokensRemaining.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-medium">{usage.tokensTotal.toLocaleString()}</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                getStatusVariant() === "success" 
                  ? "bg-success" 
                  : getStatusVariant() === "warning" 
                  ? "bg-warning" 
                  : "bg-destructive"
              }`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {usagePercentage.toFixed(1)}% used
          </p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-muted-foreground">
            Last updated: {new Date(usage.lastUpdated).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRefresh(usage.id)}
              className="h-8"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemove(usage.id)}
              className="h-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
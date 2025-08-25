import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { TokenUsageCard, type TokenUsage } from "@/components/TokenUsageCard";
import { AddApiKeyDialog } from "@/components/AddApiKeyDialog";
import { DashboardStats } from "@/components/DashboardStats";
import { useToast } from "@/components/ui/use-toast";
import heroImage from "@/assets/dashboard-hero.jpg";

const Index = () => {
  const { toast } = useToast();
  
  // Mock data for demonstration
  const [tokenUsages, setTokenUsages] = useState<TokenUsage[]>([
    {
      id: "1",
      accountName: "Production API",
      apiKey: "zk_live_1234567890abcdef",
      tokensTotal: 100000,
      tokensUsed: 25000,
      tokensRemaining: 75000,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "2", 
      accountName: "Development API",
      apiKey: "zk_test_abcdef1234567890",
      tokensTotal: 50000,
      tokensUsed: 35000,
      tokensRemaining: 15000,
      lastUpdated: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "3",
      accountName: "Staging API", 
      apiKey: "zk_stage_9876543210fedcba",
      tokensTotal: 75000,
      tokensUsed: 65000,
      tokensRemaining: 10000,
      lastUpdated: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
  ]);

  const handleAddApiKey = (accountName: string, apiKey: string) => {
    const newUsage: TokenUsage = {
      id: Date.now().toString(),
      accountName,
      apiKey,
      tokensTotal: Math.floor(Math.random() * 100000) + 50000,
      tokensUsed: Math.floor(Math.random() * 30000),
      tokensRemaining: 0,
      lastUpdated: new Date().toISOString(),
    };
    
    newUsage.tokensRemaining = newUsage.tokensTotal - newUsage.tokensUsed;
    
    setTokenUsages(prev => [...prev, newUsage]);
  };

  const handleRefresh = (id: string) => {
    setTokenUsages(prev => prev.map(usage => {
      if (usage.id === id) {
        const randomUsage = Math.floor(Math.random() * (usage.tokensTotal * 0.3));
        return {
          ...usage,
          tokensUsed: usage.tokensUsed + randomUsage,
          tokensRemaining: usage.tokensRemaining - randomUsage,
          lastUpdated: new Date().toISOString(),
        };
      }
      return usage;
    }));
    
    toast({
      title: "Refreshed",
      description: "Token usage data updated successfully",
    });
  };

  const handleRemove = (id: string) => {
    setTokenUsages(prev => prev.filter(usage => usage.id !== id));
    toast({
      title: "Removed",
      description: "API key removed successfully",
    });
  };

  const handleRefreshAll = () => {
    setTokenUsages(prev => prev.map(usage => {
      const randomUsage = Math.floor(Math.random() * (usage.tokensTotal * 0.1));
      return {
        ...usage,
        tokensUsed: Math.min(usage.tokensTotal, usage.tokensUsed + randomUsage),
        tokensRemaining: Math.max(0, usage.tokensRemaining - randomUsage),
        lastUpdated: new Date().toISOString(),
      };
    }));
    
    toast({
      title: "All Updated",
      description: "All token usage data refreshed",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="absolute inset-0 opacity-30">
          <img 
            src={heroImage} 
            alt="Dashboard" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Zencoder Token Dashboard
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Monitor and manage token usage across all your Agentic AI accounts in one professional dashboard.
            </p>
            <div className="flex gap-4">
              <AddApiKeyDialog onAddApiKey={handleAddApiKey} />
              <Button variant="outline" onClick={handleRefreshAll} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-8">
        <DashboardStats tokenUsages={tokenUsages} />
        
        {tokenUsages.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No API Keys Added</h3>
            <p className="text-muted-foreground mb-6">
              Add your first Zencoder API key to start monitoring token usage.
            </p>
            <AddApiKeyDialog onAddApiKey={handleAddApiKey} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {tokenUsages.map((usage) => (
              <TokenUsageCard
                key={usage.id}
                usage={usage}
                onRefresh={handleRefresh}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
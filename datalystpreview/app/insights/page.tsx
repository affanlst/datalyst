import { loadJSON } from "@/lib/load";
import { Insights } from "@/lib/types";
import InsightsComponent from "@/components/Insights";
import { Card, CardContent } from "@/components/ui/card";

export default async function InsightsPage() {
  const insights = await loadJSON<Insights>("data/insights.json");

  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">AI Insights</h1>
        <p className="text-muted-foreground">
          AI-generated insights and recommendations based on salary data analysis
        </p>
      </div>
      
      <InsightsComponent data={insights} />
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>AI Model:</strong> {insights.meta?.source || "IBM Granite"} • 
              <strong> Format:</strong> {insights.meta?.format || "text"} • 
              <strong> Currency:</strong> {insights.meta?.currency || "USD"}
            </p>
            <p>
              <strong>Note:</strong> These insights are AI-generated based on statistical analysis of salary data. 
              Use as guidance but consider your specific context and market conditions.
            </p>
            <p className="text-xs">
              Generated: {insights.meta?.generated_at ? new Date(insights.meta.generated_at).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

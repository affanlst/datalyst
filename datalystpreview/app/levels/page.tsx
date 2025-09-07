import { loadJSON } from "@/lib/load";
import { Levels } from "@/lib/types";
import BarValue from "@/components/BarValue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function LevelsPage() {
  const levels = await loadJSON<Levels>("data/levels.json");
  
  // Sort levels in specific order: EX → SE → MI → EN
  const levelOrder = ["EX", "SE", "MI", "EN"];
  const levelsData = levelOrder.map(level => {
    const levelData = levels.items.find(l => l.level === level);
    return levelData ? {
      level,
      p25: levelData.p25,
      p50: levelData.p50,
      p75: levelData.p75,
      n: levelData.n
    } : null;
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  // Calculate SE/EN ratio
  const seLevel = levels.items.find(l => l.level === "SE");
  const enLevel = levels.items.find(l => l.level === "EN");
  const seEnRatio = seLevel && enLevel ? (seLevel.p50 / enLevel.p50) : 0;

  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Experience Levels Analysis</h1>
        <p className="text-muted-foreground">
          Salary progression by experience level: Executive (EX), Senior (SE), Mid-level (MI), Entry-level (EN)
        </p>
      </div>
      
      <BarValue 
        title="Salary by Experience Level" 
        data={levelsData} 
        xKey="level" 
        vKey="p50" 
        hint="Experience levels ordered from Executive to Entry-level. SE/EN ratio shows senior premium." 
      />

      {/* Ratio Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Level Ratios & Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">SE/EN Ratio:</span>
                <Badge variant="outline" className="text-lg">
                  {seEnRatio.toFixed(2)}×
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Senior level professionals earn {seEnRatio.toFixed(2)} times more than entry-level professionals
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Progression:</span>
                <span className="text-sm">EN → MI → SE → EX</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Clear salary progression path from entry to executive level
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level Details Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Level Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium">Level</th>
                  <th className="text-left py-2 px-3 font-medium">Description</th>
                  <th className="text-right py-2 px-3 font-medium">Median</th>
                  <th className="text-right py-2 px-3 font-medium">Range (P25-P75)</th>
                  <th className="text-right py-2 px-3 font-medium">Sample</th>
                </tr>
              </thead>
              <tbody>
                {levelsData.map((item, index) => {
                  const descriptions = {
                    EX: "Executive / Leadership",
                    SE: "Senior Professional", 
                    MI: "Mid-level Professional",
                    EN: "Entry-level / Junior"
                  };
                  
                  return (
                    <tr key={item.level} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                      <td className="py-2 px-3 font-medium">{item.level}</td>
                      <td className="py-2 px-3 text-sm text-muted-foreground">
                        {descriptions[item.level as keyof typeof descriptions]}
                      </td>
                      <td className="text-right py-2 px-3 font-medium">
                        ${Math.round(item.p50).toLocaleString()}
                      </td>
                      <td className="text-right py-2 px-3 text-sm">
                        ${Math.round(item.p25).toLocaleString()} - ${Math.round(item.p75).toLocaleString()}
                      </td>
                      <td className="text-right py-2 px-3 text-sm text-muted-foreground">{item.n}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Note:</strong> Experience levels are ordered from highest to lowest median salary. 
              The SE/EN ratio of {seEnRatio.toFixed(2)}× indicates the salary premium for senior professionals.
            </p>
            <p>
              <strong>Currency:</strong> {levels.meta?.currency || "USD"} • 
              <strong> Generated:</strong> {levels.meta?.generated_at ? new Date(levels.meta.generated_at).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

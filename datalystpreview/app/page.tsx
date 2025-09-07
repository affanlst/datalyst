import { loadJSON, fmtUSD } from "@/lib/load";
import { Countries, Roles, Levels, Trends, Insights as InsightsType } from "@/lib/types";
import KpiCard from "@/components/KpiCard";
import TrendLine from "@/components/TrendLine";
import BarValue from "@/components/BarValue";
import Insights from "@/components/Insights";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function Dashboard() {
  // Load semua data dari JSON files
  const [countries, roles, levels, trends, insights] = await Promise.all([
    loadJSON<Countries>("data/countries.json"),
    loadJSON<Roles>("data/roles.json"),
    loadJSON<Levels>("data/levels.json"),
    loadJSON<Trends>("data/trends.json"),
    loadJSON<InsightsType>("data/insights.json")
  ]);

  // Prepare data untuk KPI cards
  const topCountry = countries.items[0];
  const topRole = roles.items[0];
  const latestYear = trends.series[trends.series.length - 1];

  // Prepare data untuk charts
  const countriesData = countries.items.map(d => ({
    country: d.country,
    p50: d.p50,
    n: d.n
  }));

  const rolesData = roles.items.slice(0, 12).map(d => ({
    role: d.role,
    p50: d.p50,
    n: d.n
  }));

  // Sort levels in specific order: EX → SE → MI → EN
  const levelOrder = ["EX", "SE", "MI", "EN"];
  const levelsData = levelOrder.map(level => {
    const levelData = levels.items.find(l => l.level === level);
    return {
      level,
      p50: levelData?.p50 || 0,
      n: levelData?.n || 0
    };
  }).filter(l => l.p50 > 0);

  const trendsData = trends.series.map(d => ({
    year: d.year,
    p50: d.p50,
    n: d.n
  }));

  // Calculate SE/EN ratio
  const seLevel = levels.items.find(l => l.level === "SE");
  const enLevel = levels.items.find(l => l.level === "EN");
  const seEnRatio = seLevel && enLevel ? (seLevel.p50 / enLevel.p50).toFixed(2) : "N/A";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Job Salary Dashboard
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive analysis of data professional salaries across countries, roles, and experience levels. 
            Data filtered for roles with ≥3 observations and countries with ≥5 observations.
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="outline">Currency: {countries.meta?.currency || "USD"}</Badge>
            <Badge variant="outline">Countries: {countries.items.length}</Badge>
            <Badge variant="outline">Roles: {roles.items.length}</Badge>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard
            title="Top Country"
            value={topCountry.country}
            sub={`${fmtUSD(topCountry.p50)} median (${topCountry.n} observations)`}
          />
          <KpiCard
            title="Top Role"
            value={topRole.role}
            sub={`${fmtUSD(topRole.p50)} median (${topRole.n} observations)`}
          />
          <KpiCard
            title="Latest Year Observations"
            value={`${latestYear.year}`}
            sub={`${fmtUSD(latestYear.p50)} median (${latestYear.n} observations)`}
          />
        </div>

        {/* Trend Line */}
        <TrendLine 
          data={trendsData}
          title="Salary Trends Over Time"
        />

        {/* Two column charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarValue
            title="Top Countries by Median"
            data={countriesData}
            xKey="country"
            vKey="p50"
            hint="Lihat n untuk kekuatan sampel"
          />
          <BarValue
            title="Top Roles by Median"
            data={rolesData}
            xKey="role"
            vKey="p50"
            hint="Batasi 12 teratas agar label tidak padat"
          />
        </div>

        {/* Levels Chart */}
        <div className="space-y-4">
          <BarValue
            title={`Salary by Experience Level (SE/EN Ratio: ${seEnRatio}×)`}
            data={levelsData}
            xKey="level"
            vKey="p50"
            hint="EX = Executive, SE = Senior, MI = Mid-level, EN = Entry-level"
          />
        </div>

        {/* AI Insights */}
        <Insights data={insights} />

        {/* Footer */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Data Source:</strong> Job salary survey data processed and analyzed using data science techniques.
              </p>
              <p>
                <strong>Sample Notes:</strong> Roles filtered for n≥3 observations, Countries filtered for n≥5 observations. 
                Currency normalized to {countries.meta?.currency || "USD"}. Sample may not be representative of entire market.
              </p>
              <p className="text-xs">
                Generated with Datalyst Preview • Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
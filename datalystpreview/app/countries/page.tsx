import { loadJSON } from "@/lib/load";
import { Countries } from "@/lib/types";
import BarValue from "@/components/BarValue";
import CountryTable from "@/components/CountryTable";
import { Card, CardContent } from "@/components/ui/card";

export default async function CountriesPage() {
  const countries = await loadJSON<Countries>("data/countries.json");
  
  const data = countries.items.map(d => ({ 
    country: d.country, 
    p25: d.p25,
    p50: d.p50, 
    p75: d.p75,
    n: d.n 
  }));

  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Countries Analysis</h1>
        <p className="text-muted-foreground">
          Salary distribution across countries (minimum {countries.meta?.min_sample_size || 5} observations per country)
        </p>
      </div>
      
      <BarValue 
        title="Countries by Median Salary" 
        data={data} 
        xKey="country" 
        vKey="p50" 
        hint="Tooltip menampilkan p25/p75 dan sample size untuk evaluasi kekuatan data" 
      />
      
      <CountryTable data={data} />
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Note:</strong> Countries are sorted by median salary (p50) in descending order. 
              Pay attention to sample size (n) for data reliability.
            </p>
            <p>
              <strong>Currency:</strong> {countries.meta?.currency || "USD"} • 
              <strong> Generated:</strong> {countries.meta?.generated_at ? new Date(countries.meta.generated_at).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

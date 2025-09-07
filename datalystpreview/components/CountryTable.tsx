"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fmtUSD } from "@/lib/load";

interface CountryTableProps {
  data: {
    country: string;
    p25: number;
    p50: number;
    p75: number;
    n: number;
  }[];
}

export default function CountryTable({ data }: CountryTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Countries Detail Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 font-medium">Country</th>
                <th className="text-right py-2 px-3 font-medium">P25</th>
                <th className="text-right py-2 px-3 font-medium">P50 (Median)</th>
                <th className="text-right py-2 px-3 font-medium">P75</th>
                <th className="text-right py-2 px-3 font-medium">Sample Size</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.country} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                  <td className="py-2 px-3 font-medium">{item.country}</td>
                  <td className="text-right py-2 px-3 text-sm">{fmtUSD(item.p25)}</td>
                  <td className="text-right py-2 px-3 font-medium">{fmtUSD(item.p50)}</td>
                  <td className="text-right py-2 px-3 text-sm">{fmtUSD(item.p75)}</td>
                  <td className="text-right py-2 px-3 text-sm text-muted-foreground">{item.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

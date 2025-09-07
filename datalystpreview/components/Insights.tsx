"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Insights as InsightsType } from "@/lib/types";

interface InsightsProps {
  data: InsightsType;
}

export default function Insights({ data }: InsightsProps) {
  const isJsonFormat = data.meta?.format === "json";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          AI Insights
          <Badge variant="secondary">IBM Granite (Replicate)</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isJsonFormat ? (
          <div className="space-y-4">
            {data.bullets && data.bullets.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Key Insights:</h4>
                <ul className="space-y-2">
                  {data.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">•</span>
                      <span className="text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {data.recommendation && (
              <div>
                <h4 className="font-medium mb-2">Recommendation:</h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                  {data.recommendation}
                </p>
              </div>
            )}
          </div>
        ) : (
          <pre className="text-sm whitespace-pre-wrap text-muted-foreground bg-muted p-3 rounded-md">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

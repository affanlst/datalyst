import { loadJSON } from "@/lib/load";
import { Roles } from "@/lib/types";
import RolesClient from "@/components/RolesClient";
import { Card, CardContent } from "@/components/ui/card";

export default async function RolesPage() {
  const roles = await loadJSON<Roles>("data/roles.json");

  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Roles Analysis</h1>
        <p className="text-muted-foreground">
          Salary distribution across data roles (minimum {roles.meta?.min_sample_size || 3} observations per role)
        </p>
      </div>
      
      <RolesClient roles={roles} />
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Note:</strong> Roles are filtered with minimum n≥{roles.meta?.min_sample_size || 3} observations in backend processing. 
              Use search to find specific roles and sort to prioritize by salary or sample size.
            </p>
            <p>
              <strong>Currency:</strong> {roles.meta?.currency || "USD"} • 
              <strong> Total Roles:</strong> {roles.items.length} • 
              <strong> Generated:</strong> {roles.meta?.generated_at ? new Date(roles.meta.generated_at).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

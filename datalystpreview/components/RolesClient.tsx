"use client";

import { useState } from "react";
import { Roles } from "@/lib/types";
import BarValue from "@/components/BarValue";
import RoleSearch from "@/components/RoleSearch";

interface RolesClientProps {
  roles: Roles;
}

export default function RolesClient({ roles }: RolesClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("p50");

  // Filter dan sort data
  const filteredData = roles.items
    .filter(role => 
      role.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "p50") {
        return b.p50 - a.p50; // desc
      } else if (sortBy === "n") {
        return b.n - a.n; // desc
      }
      return 0;
    })
    .slice(0, 20) // max 20 items
    .map(d => ({ 
      role: d.role, 
      p50: d.p50, 
      n: d.n 
    }));

  return (
    <>
      <RoleSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      <BarValue 
        title={`Roles by Median Salary (${filteredData.length} results)`}
        data={filteredData} 
        xKey="role" 
        vKey="p50" 
        hint="Roles filtered by search term and sorted by selected criteria. Maximum 20 results shown." 
      />
    </>
  );
}

// Data types untuk semua JSON files
export type MetaData = {
  generated_at: string;
  currency?: string;
  k?: number;
  sort_by?: string;
  min_sample_size?: number;
  latest_year?: number;
};

export type Countries = { 
  meta: MetaData; 
  items: { 
    country: string; 
    p25: number; 
    p50: number; 
    p75: number; 
    n: number 
  }[] 
};

export type Roles = { 
  meta: MetaData; 
  items: { 
    role: string; 
    p25: number; 
    p50: number; 
    p75: number; 
    n: number 
  }[] 
};

export type Levels = { 
  meta: MetaData; 
  items: { 
    level: string; 
    p25: number; 
    p50: number; 
    p75: number; 
    n: number 
  }[] 
};

export type Trends = { 
  meta: MetaData; 
  series: { 
    year: number; 
    p50: number; 
    n: number 
  }[] 
};

export type InsightsMeta = {
  generated_at: string;
  model: string;
  format?: "json" | "text"; 
  currency?: string;
  source?: string;
  min_roles_sample?: number;
  min_countries_sample?: number;
};

export type Insights = { 
  meta: InsightsMeta; 
  bullets: string[]; 
  recommendation: string; 
};

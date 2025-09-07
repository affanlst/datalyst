import { z } from "zod";

// Basic validation schemas untuk data integrity
export const CountryItem = z.object({ 
  country: z.string(), 
  p25: z.number(), 
  p50: z.number(), 
  p75: z.number(), 
  n: z.number() 
});

export const RoleItem = z.object({ 
  role: z.string(), 
  p25: z.number(), 
  p50: z.number(), 
  p75: z.number(), 
  n: z.number() 
});

export const LevelItem = z.object({ 
  level: z.string(), 
  p25: z.number(), 
  p50: z.number(), 
  p75: z.number(), 
  n: z.number() 
});

export const TrendItem = z.object({ 
  year: z.number(), 
  p50: z.number(), 
  n: z.number() 
});

export const CountriesZ = z.object({ 
  meta: z.any(), 
  items: z.array(CountryItem) 
});

export const RolesZ = z.object({ 
  meta: z.any(), 
  items: z.array(RoleItem) 
});

export const LevelsZ = z.object({ 
  meta: z.any(), 
  items: z.array(LevelItem) 
});

export const TrendsZ = z.object({ 
  meta: z.any(), 
  series: z.array(TrendItem) 
});

export const InsightsZ = z.object({ 
  meta: z.object({ 
    format: z.enum(["json", "text"]).optional(), 
    currency: z.string().optional() 
  }).optional(), 
  bullets: z.array(z.string()).optional(), 
  recommendation: z.string().optional(), 
  insight: z.any().optional() 
});

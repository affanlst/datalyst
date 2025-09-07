// JSON loading helper dan formatter utilities
export async function loadJSON<T>(path: string): Promise<T> {
  // Untuk server-side rendering, gunakan absolute URL atau file system
  const isServer = typeof window === 'undefined';
  
  if (isServer) {
    // Di server-side, gunakan file system
    const fs = await import('fs');
    const pathModule = await import('path');
    const fullPath = pathModule.join(process.cwd(), 'public', path);
    
    try {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(fileContents);
    } catch (error) {
      throw new Error(`Failed to load ${path}: ${error}`);
    }
  } else {
    // Di client-side, gunakan fetch seperti biasa
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return res.json();
  }
}

export function fmtUSD(n?: number | null): string { 
  return n == null ? "-" : `$${Math.round(n).toLocaleString()}`; 
}

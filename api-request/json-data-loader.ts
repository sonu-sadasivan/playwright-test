import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function loadTestData<T = any>(
  path: string,
  replacements: Record<string, string | number> = {}
): T {
  // 1️⃣ Read JSON file
  const fullPath = resolve(path);
  const raw = readFileSync(fullPath, 'utf8');
  const data = JSON.parse(raw);

  // 2️⃣ Define defaults
  const today = new Date().toISOString().split('T')[0];
  const defaults: Record<string, string | number> = {
    ENV: process.env.TEST_ENV || 'qa',
    TODAY: today,
  };

  // 3️⃣ Merge defaults and user-provided replacements
  const tokens = { ...defaults, ...replacements };

  // 4️⃣ Convert JSON to string for replacement
  let jsonString = JSON.stringify(data);

  // 5️⃣ Find all placeholders in the JSON (e.g. {{KEY}})
  const placeholders = Array.from(jsonString.matchAll(/{{(.*?)}}/g)).map(m => m[1]);

  // 6️⃣ Check for missing keys
  const missing = placeholders.filter(p => !(p in tokens));
  if (missing.length > 0) {
    throw new Error(
      `Missing replacement values for keys: ${missing.join(', ')} in file ${path}`
    );
  }

  // 7️⃣ Replace each placeholder with its value
  for (const [key, value] of Object.entries(tokens)) {
    const pattern = new RegExp(`{{${key}}}`, 'g');
    jsonString = jsonString.replace(pattern, String(value));
  }

  // 8️⃣ Return transformed JSON
  return JSON.parse(jsonString) as T;
}

import { useSearchParams, type NavigateOptions } from 'react-router-dom';
import { useMemo, useRef, useCallback } from 'react';

// --------------------
// Helpers: flatten / unflatten
// --------------------
function flatten(obj: Record<string, any>, prefix = '', res: Record<string, any> = {}) {
  for (const key in obj) {
    const val = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;

    if (val && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
      flatten(val, path, res);
    } else {
      res[path] = val;
    }
  }
  return res;
}

function unflatten(flat: Record<string, any>) {
  const result: Record<string, any> = {};
  for (const path in flat) {
    const keys = path.split('.');
    let cur = result;
    keys.slice(0, -1).forEach((k) => {
      if (!cur[k]) cur[k] = {};
      cur = cur[k];
    });
    cur[keys[keys.length - 1]] = flat[path];
  }
  return result;
}

// --------------------
// Helpers: parse / serialize
// --------------------
function parseValue(raw: string | null, def: any) {
  if (raw == null) return def;

  if (Array.isArray(def)) {
    if (!raw) return def;
    const parts = decodeURIComponent(raw).split(',');
    const elemDef = def[0] ?? '';
    return parts.map((v) => parseValue(v, elemDef));
  }

  if (def instanceof Date) {
    const d = new Date(raw);
    return isNaN(d.getTime()) ? def : d;
  }
  if (typeof def === 'number') {
    const n = Number(raw);
    return isNaN(n) ? def : n;
  }
  if (typeof def === 'boolean') return raw === 'true';
  return raw;
}

function serializeValue(value: any) {
  if (Array.isArray(value)) return encodeURIComponent(value.map(String).join(','));
  if (value instanceof Date) return encodeURIComponent(value.toISOString());
  return encodeURIComponent(String(value));
}

function isEqual(a: any, b: any) {
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((v, i) => isEqual(v, b[i]));
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  return String(a) === String(b);
}

// --------------------
// Hook: useQueryParams
// --------------------
export function useQueryParams<T extends Record<string, any>>(defaults: T) {
  const [params, setParams] = useSearchParams();
  const defaultsRef = useRef(flatten(defaults));

  // Get current flat values
  const flatValues = useMemo(() => {
    const out: Record<string, any> = {};
    for (const key in defaultsRef.current) {
      out[key] = parseValue(params.get(key), defaultsRef.current[key]);
    }
    return out;
  }, [params]);

  const values = useMemo(() => unflatten(flatValues) as T, [flatValues]);

  // Update multiple keys
  const set = useCallback(
    (updates: Partial<T>, nav?: NavigateOptions) => {
      const flat = flatten(updates);
      setParams((prev) => {
        const next = new URLSearchParams(prev.toString());
        for (const key in flat) {
          const val = flat[key];
          const def = defaultsRef.current[key];
          if (val == null || isEqual(val, def)) next.delete(key);
          else next.set(key, serializeValue(val));
        }
        return next;
      }, nav);
    },
    [setParams]
  );

  // Per-key setter
  const key = useCallback(
    (path: string) => ({
      value: flatValues[path] ?? defaultsRef.current[path],
      set: (v: any, nav?: NavigateOptions) => {
        setParams((prev) => {
          const next = new URLSearchParams(prev.toString());
          const def = defaultsRef.current[path];
          if (v == null || isEqual(v, def)) next.delete(path);
          else next.set(path, serializeValue(v));
          return next;
        }, nav);
      },
    }),
    [flatValues, setParams]
  );

  // Reset to defaults
  const reset = useCallback(
    (nav?: NavigateOptions) => {
      setParams(() => {
        const next = new URLSearchParams();
        for (const key in defaultsRef.current) {
          const def = defaultsRef.current[key];
          if (def != null && !(Array.isArray(def) && def.length === 0)) {
            next.set(key, serializeValue(def));
          }
        }
        return next;
      }, nav);
    },
    [setParams]
  );

  return { values, set, key, reset } as const;
}

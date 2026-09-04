import { CONNECTIONS } from "./schema";

export function fieldKey(table: string, field: string): string {
  return `${table}|${field}`;
}

function buildAdjacency(): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>();
  const addEdge = (a: string, b: string) => {
    if (!adj.has(a)) adj.set(a, new Set());
    if (!adj.has(b)) adj.set(b, new Set());
    adj.get(a)!.add(b);
    adj.get(b)!.add(a);
  };
  CONNECTIONS.forEach((c) => {
    addEdge(fieldKey(c.t1, c.f1), fieldKey(c.t2, c.f2));
  });
  return adj;
}

export const ADJACENCY = buildAdjacency();

export function isClickable(key: string): boolean {
  return ADJACENCY.has(key);
}

/** クリックした項目からたどれる連動チェーン全体（テーブルをまたいだ集合）を返す */
export function connectedComponent(startKey: string): Set<string> {
  const seen = new Set<string>([startKey]);
  const queue = [startKey];
  while (queue.length) {
    const cur = queue.shift()!;
    const neighbors = ADJACENCY.get(cur);
    if (!neighbors) continue;
    neighbors.forEach((n) => {
      if (!seen.has(n)) {
        seen.add(n);
        queue.push(n);
      }
    });
  }
  return seen;
}

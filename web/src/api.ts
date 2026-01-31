export const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000/api';

export type Box = {
  id: number;
  barcode: string;
  label?: string | null;
  location: string;
  importDate: string;
  notes?: string | null;
};

export type Item = {
  id: number;
  boxId: number;
  name: string;
  sku?: string | null;
  quantity: number;
  unit?: string | null;
};

export type Activity = {
  id: number;
  type: string;
  createdAt: string;
  details: Record<string, unknown>;
};

export async function fetchBoxes(query: string) {
  const res = await fetch(`${API_BASE}/boxes${query}`);
  if (!res.ok) {
    throw new Error('Failed to fetch boxes');
  }
  return (await res.json()) as Box[];
}

export async function fetchBox(id: string) {
  const res = await fetch(`${API_BASE}/boxes/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch box');
  }
  return (await res.json()) as Box & { items: Item[] };
}

export async function fetchItems(boxId: string) {
  const res = await fetch(`${API_BASE}/boxes/${boxId}/items`);
  if (!res.ok) {
    throw new Error('Failed to fetch items');
  }
  return (await res.json()) as Item[];
}

export async function createBox(payload: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/boxes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error('Failed to create box');
  }
  return res.json();
}

export async function createItem(boxId: string, payload: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/boxes/${boxId}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error('Failed to create item');
  }
  return res.json();
}

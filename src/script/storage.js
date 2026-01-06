const KEY = "caughtSpeciesIds";

export function loadCaughtSet() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.map(String));
  } catch {
    return new Set();
  }
}

export function saveCaughtSet(caughtSet) {
  const arr = Array.from(caughtSet);
  localStorage.setItem(KEY, JSON.stringify(arr));
}

export function toggleCaught(caughtSet, id) {
  const key = String(id);
  if (caughtSet.has(key)) caughtSet.delete(key);
  else caughtSet.add(key);
}
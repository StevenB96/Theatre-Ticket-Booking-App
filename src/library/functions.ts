export function formatDateToDDMMYYYY(date: Date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function parseDDMMYYYYToISO(dateStr: string) {
  // e.g. "22/06/2025" => "2025-06-22"
  const [d, m, y] = dateStr.split('/');
  if (!d || !m || !y) return null;
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

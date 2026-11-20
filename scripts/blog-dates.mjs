// Historical context is not a publication timestamp.
export function retrospectiveDate(value) {
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('retrospectiveDate must be YYYY-MM-DD');
  const date = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0,10) !== value) throw new Error('Invalid retrospectiveDate');
  return date;
}
export function archiveDateLabel(date) {
  return date.toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric',timeZone:'UTC'});
}
export function postOrder(a,b) {
  return ((b.retrospective || b.date)?.getTime() || 0) - ((a.retrospective || a.date)?.getTime() || 0);
}

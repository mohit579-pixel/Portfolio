// Prices are in lakhs. 100 lakh = 1 crore.
export const fmtPrice = (v) => (v >= 100 ? Number((v / 100).toFixed(2)) + ' Cr' : v + ' L');

export function filterListings(list, { q, kind, max, sort }) {
  const cmp =
    sort === 'lo'
      ? (a, b) => a.price - b.price
      : sort === 'hi'
        ? (a, b) => b.price - a.price
        : (a, b) => b.id - a.id;
  return list
    .filter(
      (l) =>
        (kind === 'All' || l.kind === kind) &&
        l.price <= max &&
        (l.title + ' ' + l.loc).toLowerCase().includes(q.toLowerCase()),
    )
    .sort(cmp);
}

// Build a listing from the form, or return null if it is not valid.
export function makeListing(form, id, rand = Math.random) {
  const price = +form.price;
  if (!form.title.trim() || !(price > 0)) return null;
  return {
    id,
    title: form.title.trim(),
    kind: form.kind,
    loc: form.loc.trim() || 'Your locality',
    price,
    beds: +form.beds || 0,
    area: +form.area || 0,
    x: 15 + rand() * 70,
    y: 15 + rand() * 65,
  };
}

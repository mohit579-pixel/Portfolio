export const avgRating = (h) =>
  h.reviews.length ? h.reviews.reduce((a, r) => a + r.stars, 0) / h.reviews.length : 0;

export function filterStays(list, { q, maxPrice, minRating, sort }) {
  const cmp =
    sort === 'lo'
      ? (a, b) => a.price - b.price
      : sort === 'hi'
        ? (a, b) => b.price - a.price
        : (a, b) => avgRating(b) - avgRating(a);
  return list
    .filter(
      (h) =>
        h.price <= maxPrice &&
        avgRating(h) >= +minRating &&
        (h.name + ' ' + h.loc).toLowerCase().includes(q.toLowerCase()),
    )
    .sort(cmp);
}

// Returns an error message, or null if the review can be posted.
export function reviewError(stars, text) {
  if (!stars) return 'pick a star rating first';
  if (text.trim().length < 5) return 'write at least a few words';
  return null;
}

export const addReview = (stays, id, review) =>
  stays.map((h) => (h.id === id ? { ...h, reviews: [review, ...h.reviews] } : h));

export const deleteReview = (stays, id, index) =>
  stays.map((h) => (h.id === id ? { ...h, reviews: h.reviews.filter((_, j) => j !== index) } : h));

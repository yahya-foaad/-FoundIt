export function formatDate(d) {
  const date = new Date(d);
  if (isNaN(date)) return d || "";
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

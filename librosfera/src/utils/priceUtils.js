export function getConsistentPriceFromTitle(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const normalized = Math.abs(hash % 10000) / 10000;
  const min = 5000;
  const max = 30000;
  let price = Math.floor(normalized * (max - min) + min);
  return Math.round(price / 10) * 10;
}
    
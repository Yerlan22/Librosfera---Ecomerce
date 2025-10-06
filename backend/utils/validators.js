import fs from "fs";
const binsCR = JSON.parse(
  fs.readFileSync(new URL("./binsCR.json", import.meta.url))
);

export function isValidBin(bin) {
  return binsCR.some((card) => card.bin === bin);
}

export function isValidExpiryDate(expiry) {
  const [monthStr, yearStr] = expiry.split("/");
  const month = parseInt(monthStr, 10);
  const year = parseInt("20" + yearStr, 10);

  if (isNaN(month) || isNaN(year)) return false;
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (year < currentYear) return false;
  
  return (
    !isNaN(month) &&
    !isNaN(year) &&
    month >= 1 &&
    month <= 12 &&
    (year > currentYear || (year === currentYear && month > currentMonth))
  );
}

export function isValidCVC(cvc, cardNumber) {
  if (!/^\d+$/.test(cvc)) return false;

  const startsWith = cardNumber.slice(0, 2);
  const isAmex = startsWith === "34" || startsWith === "37";

  return isAmex ? cvc.length === 4 : cvc.length === 3;
}

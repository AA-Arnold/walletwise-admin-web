import { formatInputTextNumberWithCommas } from "./formatInputTextNumberWithCommas";
import { removeCommas } from "./removeCommas";

export const formatCurrencyInput = (value: string | number) =>
  value === "" || Number(value) === 0
    ? ""
    : formatInputTextNumberWithCommas(String(value));

export const parseCurrencyInput = (value: string) =>
  Number(removeCommas(value)) || 0;

export const formatNaira = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

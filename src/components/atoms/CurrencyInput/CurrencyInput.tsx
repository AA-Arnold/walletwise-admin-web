"use client";

import Input from "@/components/atoms/Input/Input";
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/helpers/currency";

interface CurrencyInputProps {
  name: string;
  value: number;
  onValueChange: (value: number) => void;
  placeholder?: string;
}

const CurrencyInput = ({
  name,
  value,
  onValueChange,
  placeholder = "0",
}: CurrencyInputProps) => (
  <Input
    type="text"
    inputMode="decimal"
    name={name}
    value={formatCurrencyInput(value)}
    onChange={(event) => onValueChange(parseCurrencyInput(event.target.value))}
    placeholder={placeholder}
  />
);

export default CurrencyInput;

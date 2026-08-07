"use client";

import Label from "@/components/atoms/Label/Label";
import Select from "@/components/atoms/Select/Select";
import { Skeleton } from "@/components/ui/skeleton";
import { usePartnerOptions } from "@/features/partners/hooks/usePartnerOptions";

interface PartnerSelectFieldProps {
  value: string;
  onChange: (partnerId: string) => void;
}

const PartnerSelectField = ({ value, onChange }: PartnerSelectFieldProps) => {
  const { options, isLoading, isError } = usePartnerOptions();

  return (
    <section className="space-y-2">
      <Label title="Partner" />
      {isLoading ? (
        <Skeleton className="h-11 w-full rounded-lg" />
      ) : (
        <Select
          name="partner_id"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          options={options}
          placeholder="Select a partner"
          disabled={isError}
        />
      )}
      {isError && (
        <p className="text-sm text-red-600">Partners could not be loaded.</p>
      )}
    </section>
  );
};

export default PartnerSelectField;

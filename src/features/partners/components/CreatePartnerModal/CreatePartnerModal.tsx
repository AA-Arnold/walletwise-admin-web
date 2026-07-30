import { ChangeEvent, FormEvent } from "react";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { CreatePartnerPayload } from "../../types";

interface CreatePartnerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  partnerDetails: CreatePartnerPayload;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent) => void;
  isPending: boolean;
  isFormFilled: boolean;
  showPassword: "text" | "password";
  togglePasswordVisibility: () => void;
}

const CreatePartnerModal = ({
  open,
  setOpen,
  partnerDetails,
  handleChange,
  handleSubmit,
  isPending,
  isFormFilled,
  showPassword,
  togglePasswordVisibility,
}: CreatePartnerModalProps) => (
  <ModalWrapper
    open={open}
    onClose={setOpen}
    title="Create Partner"
    description="Add a partner that can manage partner events."
  >
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label title="Company Name" />
        <Input
          value={partnerDetails.company_name}
          onChange={handleChange}
          type="text"
          name="company_name"
          placeholder="Elegance Productions"
        />
      </div>
      <div className="space-y-2">
        <Label title="Email" />
        <Input
          value={partnerDetails.email}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="info@elegance.ng"
        />
      </div>
      <div className="space-y-2">
        <Label title="Phone Number" />
        <Input
          value={partnerDetails.phone_number}
          onChange={handleChange}
          type="tel"
          name="phone_number"
          placeholder="+2348098765432"
        />
      </div>
      <div className="space-y-2">
        <Label title="Password" />
        <Input
          value={partnerDetails.password}
          onChange={handleChange}
          type={showPassword}
          name="password"
          placeholder="Minimum 8 characters"
          showPassword={showPassword}
          onTogglePassword={togglePasswordVisibility}
        />
      </div>
      <Button type="submit" loading={isPending} disabled={!isFormFilled}>
        Create partner
      </Button>
    </form>
  </ModalWrapper>
);

export default CreatePartnerModal;

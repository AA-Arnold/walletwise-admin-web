"use client";

import Button from "@/components/atoms/Button/Button";
import { useCreatePartner } from "../../hooks/useCreatePartner";
import CreatePartnerModal from "../CreatePartnerModal/CreatePartnerModal";

const CreatePartnerAction = () => {
  const partner = useCreatePartner();

  return (
    <div className="flex flex-wrap justify-end gap-3">
      <Button href="/services/events/create" width="w-fit">
        Create Partner Event
      </Button>
      <Button width="w-fit" onClick={() => partner.setOpenModal(true)}>
        Create New Partner
      </Button>
      <CreatePartnerModal
        open={partner.openModal}
        setOpen={partner.setOpenModal}
        partnerDetails={partner.partnerDetails}
        handleChange={partner.handleChange}
        handleSubmit={partner.handleSubmit}
        isPending={partner.isPending}
        isFormFilled={partner.isFormFilled}
        showPassword={partner.showPassword}
        togglePasswordVisibility={partner.togglePasswordVisibility}
      />
    </div>
  );
};

export default CreatePartnerAction;

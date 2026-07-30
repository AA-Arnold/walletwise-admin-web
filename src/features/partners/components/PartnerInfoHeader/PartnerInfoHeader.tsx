import { Building2, Calendar, Mail, Phone } from "lucide-react";

import StatusBubble from "@/components/atoms/StatusBubble/StatusBubble";
import { Partner } from "../../types";

const PartnerInfoHeader = ({ partner }: { partner: Partner }) => {
  const initial = partner.company_name?.trim().charAt(0).toUpperCase() || "P";

  return (
    <div className="rounded-2xl border p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
      <div className="flex flex-col items-start gap-6 sm:flex-row">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 text-3xl font-bold text-white shadow-lg">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {partner.company_name}
              </h2>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Partner account
              </p>
            </div>
            <StatusBubble status={partner.status || "unknown"} />
          </div>
          <div className="grid gap-4 text-gray-700 dark:text-gray-300 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <span className="break-all">{partner.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <span>{partner.phone_number}</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-gray-500" />
              <span className="break-all">ID: {partner.id}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>
                Created:{" "}
                {partner.created_at
                  ? new Date(partner.created_at).toLocaleDateString()
                  : "Not available"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerInfoHeader;

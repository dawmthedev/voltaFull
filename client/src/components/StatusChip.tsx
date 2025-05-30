import React from "react";

interface StatusChipProps {
  stage?: string;
  paid?: boolean;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  stage,
  paid: paidProp,
}) => {
  const isPaid = stage === "Completed" && paidProp;

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-medium ${
        isPaid ? "bg-emerald-600 text-white" : "bg-amber-100 text-amber-700"
      }`}
    >
      {isPaid ? "Paid" : "Upcoming"}
    </span>
  );
};

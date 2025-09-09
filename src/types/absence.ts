export type AbsenceRequest = {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: AbsenceRequestStatus;
  createdAt: string;
};

export type AbsenceRequestStatus = "pending" | "approved" | "rejected";

export type AbsenceFormValues = Omit<
  AbsenceRequest,
  "id" | "status" | "createdAt"
>;

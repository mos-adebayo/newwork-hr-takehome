import type { AbsenceRequest } from "../../types/absence.ts";

type Props = {
  data: AbsenceRequest[];
};
export const AbsenceRequests = ({ data }: Props) => {
  return (
    <ul className="grid gap-3">
      {data.map((a) => (
        <li key={a.id} className="rounded-lg border p-3 text-sm">
          <div className="mb-1 flex justify-between text-gray-600">
            <span>
              {a.startDate} → {a.endDate}
            </span>
            <span className="capitalize">{a.status}</span>
          </div>
          <p className="text-gray-800">{a.reason}</p>
        </li>
      ))}
    </ul>
  );
};

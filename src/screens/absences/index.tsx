import { AbsenceRequests } from "../../components/absence-requests";
import { useState, useEffect } from "react";
import type { AbsenceRequest } from "../../types/absence.ts";
import { listAbsences } from "../../utils/api.ts";
import { AbsenceRequestForm } from "../../components/absence-requests/AbsenceRequestForm.tsx";
import { RoleGate } from "../../components/role-gate/RoleGate.tsx";
import { EMPLOYEE } from "../../utils/constant.ts";

const Absences = () => {
  const [list, setList] = useState<AbsenceRequest[]>([]);

  const handleOnSaved = (data: AbsenceRequest) => {
    setList([data, ...list]);
  };

  useEffect(() => {
    listAbsences().then(setList);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <RoleGate allow={[EMPLOYEE]}>
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Request Absence</h2>

          <RoleGate allow={[EMPLOYEE]}>
            <AbsenceRequestForm onCompleted={handleOnSaved} />
          </RoleGate>
        </section>
      </RoleGate>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">My requests</h2>

        {list.length === 0 && (
          <p className="text-md text-gray-700 text-center">
            There are no request yet!
          </p>
        )}

        <AbsenceRequests data={list} />
      </section>
    </div>
  );
};

export default Absences;

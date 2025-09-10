import { RoleGate } from "../../components/role-gate/RoleGate.tsx";
import { useEffect, useState } from "react";
import { CO_WORKER, EMPLOYEE, MANAGER } from "../../utils/constant.ts";
import { ProfileForm } from "../../components/profile-form";
import type { Employee } from "../../types/employee.ts";
import { fetchEmployee, listFeedback } from "../../utils/api.ts";
import type { Feedback } from "../../types/feedback.ts";
import { canViewSensitiveData } from "../../utils/auth.ts";
import { Feedbacks } from "../../components/feedbacks";
import { CreateFeedback } from "../../components/feedbacks/CreateFeedback.tsx";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const handleProfileSaved = (data: Employee) => {
    setEmployee(data);
    setEditing(false);
  };

  const handleFeedbackSaved = (data: Feedback) => {
    setFeedbacks([data, ...feedbacks]);
  };

  useEffect(() => {
    fetchEmployee().then(setEmployee);
    listFeedback().then(setFeedbacks);
  }, []);

  if (!employee) return <div className="text-sm text-gray-600">Loading...</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Employee Profile</h2>
          <RoleGate allow={[MANAGER, EMPLOYEE]}>
            <button
              className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
              onClick={() => setEditing((v) => !v)}
            >
              {editing ? "Cancel" : "Edit"}
            </button>
          </RoleGate>
        </div>

        {editing ? (
          <ProfileForm
            profile={employee}
            onCompleted={handleProfileSaved}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <div className="grid gap-2 text-sm">
            <ProfileDataRow label="Name" value={employee.name} />
            <ProfileDataRow label="Email" value={employee.email} />
            <ProfileDataRow label="Phone" value={employee.phone} />
            <ProfileDataRow label="Address" value={employee.address} />
            <ProfileDataRow label="Department" value={employee.department} />
            <ProfileDataRow label="Title" value={employee.title} />
            {canViewSensitiveData() && (
              <>
                <ProfileDataRow
                  label="Salary"
                  value={employee.salary?.toLocaleString()}
                />
                <ProfileDataRow label="SSN" value={employee.ssn} />
              </>
            )}
          </div>
        )}
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Peer Feedback</h2>

        <RoleGate allow={[CO_WORKER]}>
          <CreateFeedback onCompleted={handleFeedbackSaved} />
        </RoleGate>

        <Feedbacks data={feedbacks} />
      </section>
    </div>
  );
};

function ProfileDataRow({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="text-gray-600">{label}</div>
      <div className="col-span-2">{value || "—"}</div>
    </div>
  );
}

export default Profile;

import type { Feedback } from "../../types/feedback.ts";

type Props = {
  data: Feedback[];
};
export const Feedbacks = ({ data }: Props) => {
  return (
    <ul className="grid gap-3">
      {data.map((f) => (
        <li key={f.id} className="rounded-lg border p-3 text-sm">
          <div className="mb-1 flex justify-between text-gray-600">
            <span>{f.author}</span>
            <time>{new Date(f.createdAt).toLocaleString()}</time>
          </div>
          <p>{f.message}</p>
          {f.polished && (
            <span className="mt-1 inline-block text-xs text-green-700">
              Polished
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

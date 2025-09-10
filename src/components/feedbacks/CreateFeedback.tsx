import { useState } from "react";
import { addFeedback, polishFeedback } from "../../utils/api.ts";
import type { Feedback } from "../../types/feedback.ts";

type Props = {
  onCompleted: (feedback: Feedback) => void;
};
export const CreateFeedback = ({ onCompleted }: Props) => {
  const [message, setMessage] = useState("");
  const [polishing, setPolishing] = useState(false);

  async function addFb(polish: boolean) {
    if (!message.trim()) return;
    let finalMsg = message;
    if (polish) {
      setPolishing(true);
      finalMsg = await polishFeedback(message);
      setPolishing(false);
    }
    const fb = await addFeedback("Coworker", finalMsg, polish);
    onCompleted(fb);
    setMessage("");
  }

  return (
    <div className="grid gap-2 text-sm mb-3">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring"
        placeholder="Share constructive feedback"
      />

      <div className="flex gap-2">
        <button
          className="rounded-lg border px-5 py-2 text-sm bg-black text-white hover:bg-gray-800"
          onClick={() => addFb(false)}
        >
          Post
        </button>
        <button
          className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          onClick={() => addFb(true)}
          disabled={polishing}
          title="Uses AI polish"
        >
          {polishing ? "Polishing..." : "Polish and post"}
        </button>
      </div>
    </div>
  );
};

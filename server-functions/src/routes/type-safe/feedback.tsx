import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { submitFeedbackFn } from "#/server/feedback";

export const Route = createFileRoute("/type-safe/feedback")({
  component: RouteComponent,
});

type FeedbackStatus = {
  message: string;
  tone: "pending" | "success" | "error";
};

function RouteComponent() {
  const [status, setStatus] = useState<FeedbackStatus | null>(null);

  // Extract the generated server function proxy
  const submitFeedback = useServerFn(submitFeedbackFn);

  // Initialize TanStack Form
  const form = useForm({
    defaultValues: {
      email: "",
      message: "",
      rating: 5,
    },
    onSubmit: async ({ value }) => {
      setStatus({ message: "Submitting your feedback...", tone: "pending" });
      try {
        // We pass the form values directly to the server function.
        // TypeScript enforces that `value` matches the Zod schema perfectly.
        const result = await submitFeedback({ data: value });
        setStatus({ message: result.message, tone: "success" });
        form.reset();
      } catch (_error) {
        setStatus({
          message: "Submission failed. Please check your inputs.",
          tone: "error",
        });
      }
    },
  });

  return (
    <main className="page-wrap feedback-page">
      <section className="feedback-panel island-shell rise-in">
        <div className="feedback-copy">
          <p className="island-kicker">Type-Safe Feedback</p>
          <h1 className="display-title feedback-title">Send Feedback</h1>
          <p className="feedback-description">
            Share what is working, what feels rough, and how the experience can
            improve.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="feedback-form"
        >
          <form.Field name="email">
            {(field) => (
              <div className="feedback-field">
                <label className="feedback-label" htmlFor="feedback-email">
                  Email
                </label>
                <input
                  id="feedback-email"
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="feedback-input"
                  placeholder="you@example.com"
                  required
                />
              </div>
            )}
          </form.Field>

          <form.Field name="rating">
            {(field) => (
              <fieldset className="feedback-field">
                <legend className="feedback-label">Overall rating</legend>
                <div className="feedback-rating-grid">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={value}
                      className="feedback-rating-option mt-3"
                      aria-label={`Rate ${value} out of 5`}
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={field.state.value === value}
                        onChange={() => field.handleChange(value)}
                      />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
                <p className="feedback-help">1 is rough, 5 is excellent.</p>
              </fieldset>
            )}
          </form.Field>

          <form.Field name="message">
            {(field) => (
              <div className="feedback-field">
                <label className="feedback-label" htmlFor="feedback-message">
                  Message
                </label>
                <textarea
                  id="feedback-message"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="feedback-input feedback-textarea"
                  rows={5}
                  placeholder="Tell us what stood out and what should improve next."
                  required
                />
              </div>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <button
                type="submit"
                disabled={isSubmitting}
                className="feedback-submit"
              >
                {isSubmitting ? "Sending..." : "Submit feedback"}
              </button>
            )}
          </form.Subscribe>
        </form>

        {status ? (
          <p className={`feedback-status is-${status.tone}`}>
            {status.message}
          </p>
        ) : null}
      </section>
    </main>
  );
}

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const FeedbackSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
  rating: z.number().min(1).max(5),
});

export const submitFeedbackFn = createServerFn({ method: "POST" })
  .inputValidator((data) => FeedbackSchema.parse(data))
  .handler(async ({ data }) => {
    console.log(`Saving feedback from ${data.email} to the database...`);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Thank you for your feedback!",
    };
  });

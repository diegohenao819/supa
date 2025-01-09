// /app/reading/schema.ts
import { z } from "zod";

export const quizSchema = z.object({
  title: z.string(),
  paragraphs: z.array(z.string()).length(5),
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()).length(4),
      correctAnswer: z.string()
    })
  ).length(10)
});

export type Quiz = z.infer<typeof quizSchema>;

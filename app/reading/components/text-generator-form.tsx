// /app/reading/components/text-generator-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateQuizText } from "@/app/actions";
import * as z from "zod";
import { quizSchema } from "@/app/reading/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  topic: z.string().min(2, { message: "Topic must be at least 2 characters." }),
  level: z.enum(["A1", "A2", "B1", "B2", "C1"]),
});

export function TextGeneratorForm({ onQuizGenerated }: { onQuizGenerated: (quiz: z.infer<typeof quizSchema>) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "", level: "B1" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const quiz = await generateQuizText(values.topic, values.level);
      onQuizGenerated(quiz);
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-yellow-300  p-4">
        <FormField control={form.control} name="topic" render={({ field }) => (
          <FormItem>
            <FormLabel>Topic</FormLabel>
            <FormControl>
              <Input placeholder="Enter a topic..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="level" render={({ field }) => (
          <FormItem>
            <FormLabel>Level</FormLabel>
            <select {...field}>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
            </select>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit">Generate Quiz</Button>
      </form>
    </Form>
  );
}

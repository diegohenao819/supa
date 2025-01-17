// /app/reading/page.tsx
"use client";

import { useState } from "react";
import { Sidebar } from "./components/sidebar";
import { TextGeneratorForm } from "./components/text-generator-form";
import { Quiz } from "./schema";

export default function ReadingPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  return (
    <div className="block md:flex w-full">
      <div className=" p-6 bg-red-300 w-full md:w-[80%] ">
        <TextGeneratorForm onQuizGenerated={setQuiz} />

        {quiz && (
          <div>
            <h1 className="text-2xl font-bold mt-6">{quiz.title}</h1>
            {quiz.paragraphs.map((para, index) => (
              <p key={index} className="mt-2">
                {para}
              </p>
            ))}

            <h2 className="text-xl font-semibold mt-6">Quiz Questions</h2>
            {quiz.questions.map((q, index) => (
              <div key={index} className="mt-4">
                <p className="font-medium">{q.question}</p>
                {q.options.map((option, idx) => (
                  <p key={idx}>{option}</p>
                ))}
                <p className="font-bold mt-2">
                  Correct Answer: {q.correctAnswer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-auto  p-4 space-y-4 bg-green-300">
        <Sidebar />
      </div>
    </div>
  );
}

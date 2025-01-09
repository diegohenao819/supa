// /app/reading/page.tsx
"use client";

import { useState } from "react";
import { TextGeneratorForm } from "./components/text-generator-form";
import { Quiz } from "./schema";

export default function ReadingPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  return (
    <div className="min-h-screen p-6">
      <TextGeneratorForm onQuizGenerated={setQuiz} />
      
      {quiz && (
        <div>
          <h1 className="text-2xl font-bold mt-6">{quiz.title}</h1>
          {quiz.paragraphs.map((para, index) => (
            <p key={index} className="mt-2">{para}</p>
          ))}
          
          <h2 className="text-xl font-semibold mt-6">Quiz Questions</h2>
          {quiz.questions.map((q, index) => (
            <div key={index} className="mt-4">
              <p className="font-medium">{q.question}</p>
              {q.options.map((option, idx) => (
                <p key={idx}>{option}</p>
              ))}
              <p className="font-bold mt-2">Correct Answer: {q.correctAnswer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

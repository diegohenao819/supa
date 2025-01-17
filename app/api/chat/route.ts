"use server";

import { quizSchema } from "@/app/reading/schema";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  try {
    // Leer los datos enviados en el cuerpo de la solicitud
    const body = await request.json();

    // Solicitar un JSON estructurado desde OpenAI (fixed additionalProperties)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: body.allMessages,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "quizSchema",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              paragraphs: {
                type: "array",
                items: { type: "string" },
                additionalProperties: false, // ✅ Required
              },
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: { type: "string" },
                    options: {
                      type: "array",
                      items: { type: "string" },
                      additionalProperties: false, // ✅ Required
                    },
                    correctAnswer: { type: "string" },
                  },
                  additionalProperties: false, // ✅ Required
                  required: ["question", "options", "correctAnswer"],
                },
                additionalProperties: false, // ✅ Required
              },
            },
            required: ["title", "paragraphs", "questions"],
            additionalProperties: false, // ✅ Required at root level
          },
        },
      },
    });

    // ✅ FIX: Ensure content is a string before parsing
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Response content is null or undefined");
    }

    // Now it's safe to parse since we checked for null
    const jsonResponse = JSON.parse(content);
    const validatedQuiz = quizSchema.parse(jsonResponse);
    // Devolver el JSON validado
    return NextResponse.json(validatedQuiz, { status: 200 });
  } catch (error) {
    console.error("Error generating quiz:", error);
    return NextResponse.json(
      { error: "Failed to generate structured quiz" },
      { status: 500 }
    );
  }
}

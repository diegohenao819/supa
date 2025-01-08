"use client";


import { Header } from "./components/header"
import { useState } from "react";
import { Navigation } from "./components/nav"
import { Sidebar } from "./components/sidebar"
import { TextGeneratorForm } from "./components/text-generator-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"

export default function Dashboard() {
  const [generatedText, setGeneratedText] = useState<string>("");

  
  
  // 


  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="py-4">
        <Navigation />
      </div>
      <div className="flex-1 flex gap-6 p-6">
        <div className="flex-1">
        <Card>
        <CardHeader className="space-y-6">
          <CardTitle>Text Generator</CardTitle>
          <TextGeneratorForm onTextGenerated={setGeneratedText} />
        </CardHeader>
        <CardContent className="prose prose-sm">
          {generatedText ? (
            <p>{generatedText}</p>
          ) : (
            <p>Generated text will appear here...</p>
          )}
        </CardContent>
      </Card>
        </div>
        <Sidebar />
      </div>
    </div>
  )
}
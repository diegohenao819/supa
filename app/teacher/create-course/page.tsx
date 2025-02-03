// app/teacher/create-course/page.tsx
import { createCourseAction } from "@/app/actions";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { getUserRole } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server";

// This page is a Server Component.
export default async function CreateCoursePage() {
  // Check that the user is logged in and is a teacher.
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userRole = await getUserRole();
  if (!userRole || userRole.role.name !== "teacher") {
    return <div>Only teachers can create courses.</div>;
  }

  // Render the form (you can use client components for the form if desired).
  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-4">Create a New Course</h1>
      {/* The form action points to our server action */}
      <form action={createCourseAction} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="name">Course Name</Label>
          <Input id="name" name="name" placeholder="Enter course name" required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="Enter course description"
          />
        </div>
        <SubmitButton pendingText="Creating course...">
          Create Course
        </SubmitButton>
      </form>
    </div>
  );
}

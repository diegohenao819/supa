"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { quizSchema } from "@/app/reading/schema";
import { getUserRole } from "@/utils/auth";

export const signUpAction = async (formData: FormData): Promise<void> => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const role = formData.get("role")?.toString();
  const username = formData.get("username")?.toString();  // NEW

  const supabase = await createClient();

  if (!email || !password || !role || !username) {
    redirect(`/sign-up?error=${encodeURIComponent("All fields are required.")}`);
    return;
  }

  // Step 1: Create a new user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    redirect(`/sign-up?error=${encodeURIComponent(authError.message)}`);
    return;
  }

  const userId = authData.user?.id;
  const roleId = role === "student" ? 1 : 2;

  // Step 2: Sign in the user immediately after signup
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    redirect(`/sign-up?error=${encodeURIComponent(signInError.message)}`);
    return;
  }

  // Step 3: Insert user profile with active session
  // NEW: Include the username field in the inserted profile record
  const { error: profileError } = await supabase
    .from('user_profiles')
    .insert([{ id: userId, role_id: roleId, username }]);

  if (profileError) {
    console.error("Profile creation error:", profileError.message);
    redirect(`/sign-up?error=${encodeURIComponent("Profile creation failed.")}`);
    return;
  }

  // Redirect to protected page on success
  redirect("/protected");
};


export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};


export async function generateQuizText(topic: string, level: string) {
  const response = await fetch(`http://localhost:3000/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      allMessages: [
        {
          role: "user",
          content: `Generate a structured JSON quiz about "${topic}" at ${level} level with 5 paragraphs, 10 questions, 4 options each, and the correct answer.`
        }
      ]
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate quiz data");
  }

  const quizData = await response.json();
  return quizSchema.parse(quizData);  // Validate response with Zod
}



// CREATE A COURSE


export const createCourseAction = async (formData: FormData) => {
  // Get form values
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString() || "";

  if (!name) {
    // You can handle error feedback here
    throw new Error("Course name is required");
  }

  // Create a Supabase client on the server (this uses your cookies for session)
  const supabase = await createClient();

  // Get the current authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    // If no user is logged in, redirect or throw error
    redirect("/sign-in");
    return;
  }

  // Check the user's role using your helper function
  const userRole = await getUserRole();
  if (!userRole || userRole.role.name !== "teacher") {
    // If the user is not a teacher, do not allow course creation.
    throw new Error("Only teachers can create courses");
  }

  // Insert the new course, using the authenticated user's id as teacher_id.
  const { error } = await supabase
    .from("courses")
    .insert([{ teacher_id: user.id, name, description }]);

  if (error) {
    throw new Error(error.message);
  }

  // Optionally, you can redirect or return success status
  redirect("/teacher/dashboard");
};
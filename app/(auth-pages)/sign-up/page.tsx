import { signUpAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Signup({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  const message = params.error
    ? { error: params.error }
    : params.success
      ? { success: params.success }
      : null;

  return (
    <>
      <form
        className="flex flex-col min-w-64 max-w-64 mx-auto"
        action={signUpAction}
      >
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <div className="mt-4">
            <Label htmlFor="role">Role</Label>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  defaultChecked
                  className="sr-only peer"
                />
                <span
                  className="w-6 h-6 rounded-full border-2 border-gray-400 peer-checked:border-primary peer-checked:bg-primary"
                  aria-hidden="true"
                />
                <span className="ml-2">Student</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  className="sr-only peer"
                />
                <span
                  className="w-6 h-6 rounded-full border-2 border-gray-400 peer-checked:border-primary peer-checked:bg-primary"
                  aria-hidden="true"
                />
                <span className="ml-2">Teacher</span>
              </label>
            </div>
          </div>
          <SubmitButton pendingText="Signing up...">Sign up</SubmitButton>
        </div>
      </form>
      {message && <FormMessage message={message} />}
    </>
  );
}

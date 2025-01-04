import { getUserRole } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { UserRole } from "@/types/database.types";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/sign-in");
  }

  const userRole = await getUserRole();
  console.log('Protected page userRole:', userRole);

  if (!userRole?.role?.name) {
    return <div>Error loading role</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      {userRole.role.name === 'student' ? (
        <p>Student Dashboard: {userRole.role.name}</p>
      ) : (
        <p>Teacher Dashboard: {userRole.role.name}</p>
      )}
    </div>
  );
}

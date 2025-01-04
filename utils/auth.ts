import { UserRole } from "@/types/database.types";
import { createClient } from "./supabase/server";

export async function getUserRole(): Promise<UserRole | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        role_id,
        role:roles (
          name
        )
      `)
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching role:', error);
      return null;
    }

    return {
      role_id: data.role_id,
      role: Array.isArray(data.role) ? data.role[0] : data.role
    } as UserRole;
  } catch (error) {
    console.error('getUserRole error:', error);
    return null;
  }
}
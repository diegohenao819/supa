// middleware.ts
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // Primero, ejecutamos la función updateSession
  const response = await updateSession(request);

  // Si updateSession ya redirigió (por ejemplo, por falta de usuario), finalizamos
  if (response.status === 302) return response;

  // Si la ruta es de crear cursos, verificamos el rol
  if (request.nextUrl.pathname.startsWith("/teacher/create-course")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const { data: profile, error } = await supabase
      .from("user_profiles")
      .select("role_id")
      .eq("id", user.id)
      .single();

    const teacherRoleId = 2; // Ajusta según tu definición de rol profesor
    if (error || !profile || profile.role_id !== teacherRoleId) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Aplica el middleware a todas las rutas (excluyendo los archivos estáticos) y a la ruta protegida
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/teacher/create-course/:path*",
  ],
};

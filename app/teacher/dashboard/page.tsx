// app/teacher/dashboard/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function TeacherDashboardPage() {
  // Crea el cliente de Supabase usando cookies para mantener la sesión
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si no hay usuario autenticado, redirige a la página de login
  if (!user) {
    redirect("/sign-in");
  }

  // Obtén los cursos creados por este profesor
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("teacher_id", user.id);

  if (error) {
    console.error("Error cargando cursos:", error);
    return <div>Error cargando los cursos.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard del Profesor</h1>
      <div className="mb-6">
        <Link
          href="/teacher/create-course"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Crear Nuevo Curso
        </Link>
      </div>
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course: any) => (
            <div key={course.id} className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p className="text-gray-600">{course.description}</p>
              <p className="text-xs text-gray-500">
                Creado el: {new Date(course.created_at).toLocaleDateString()}
              </p>
              {/* Puedes agregar enlaces para editar o ver detalles del curso */}
            </div>
          ))}
        </div>
      ) : (
        <p>No hay cursos creados. ¡Empieza creando uno!</p>
      )}
    </div>
  );
}

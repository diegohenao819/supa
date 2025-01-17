import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {Navigation} from "./components/nav";
import {Header} from "./components/header";
import {Sidebar} from "./components/sidebar";

export const metadata = {
  title: 'Reading Practice',
  description: 'Practice your reading skills',
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Mover la lógica de autenticación dentro de la función
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>  
      <Header />
    <Navigation />
    
        {children}
                   

      </body>
    </html>
  );
}





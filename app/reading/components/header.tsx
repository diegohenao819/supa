import { UserButton } from "./user-button";

export function Header() {
  return (
    <header className=" w-full flex items-center justify-around md:justify-between px-4   py-4 border-b">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">LEARN ENGLISH TODAY</h1>
      </div>
      <UserButton email="diego@gmail.com" />
    </header>
  );
}

import { UserButton } from "./user-button"

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">LEARN ENGLISH TODAY</h1>
      </div>
      <UserButton email="diego@gmail.com" />
    </header>
  )
}

import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <div className="w-[240px] p-4 space-y-4">
      <Button variant="outline" className="w-full justify-start" size="lg">
        TRANSLATE
      </Button>
      <Button variant="outline" className="w-full justify-start" size="lg">
        VOCABULARY
      </Button>
      <Button variant="outline" className="w-full justify-start" size="lg">
        PRONUNCIATION
      </Button>
    </div>
  )
}


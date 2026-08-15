import { Menu } from "lucide-react";

export function MenuButton() {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-9 items-center justify-center text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      aria-label="Mở menu"
    >
      <Menu aria-hidden="true" size={30} strokeWidth={1.7} />
    </button>
  );
}

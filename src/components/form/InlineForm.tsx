import { Button } from "@/components/button/Button";
import { Panel } from "@/components/panel/Panel";

interface InlineFormProps {
  title: string;
  description?: string;
  placeholder?: string;
  actionLabel?: string;
  inputType?: "email" | "text";
}

export function InlineForm({
  title,
  description,
  placeholder = "Nhập thông tin...",
  actionLabel = "Gửi",
  inputType = "text",
}: InlineFormProps) {
  return (
    <Panel className="p-4">
      <div className="text-sm font-bold uppercase text-blue-600">{title}</div>
      {description ? <div className="mt-1 text-xs leading-relaxed text-gray-500">{description}</div> : null}

      <form className="mt-3 flex overflow-hidden rounded-md border border-gray-200" action="#">
        <input
          type={inputType}
          name={inputType === "email" ? "email" : "value"}
          placeholder={placeholder}
          aria-label={placeholder}
          className="min-w-0 flex-1 bg-white px-3 py-2 text-xs text-gray-900 outline-none placeholder:text-gray-400"
        />
        <Button className="bg-blue-600 px-3 text-xs font-bold uppercase text-white hover:bg-blue-700">
          {actionLabel}
        </Button>
      </form>
    </Panel>
  );
}

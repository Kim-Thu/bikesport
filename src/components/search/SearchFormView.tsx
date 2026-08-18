import type { FormHTMLAttributes, InputHTMLAttributes } from "react";
import { Icon } from "@/components/icon/Icon";
import { cn } from "@/lib/classname.utils";

interface SearchFormViewProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "children"> {
  inputId: string;
  submitLabel: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export function SearchFormView({
  inputId,
  submitLabel,
  inputProps,
  className,
  ...formProps
}: SearchFormViewProps) {
  return (
    <form
      {...formProps}
      className={cn(
        "flex h-11 w-full min-w-0 overflow-hidden rounded-md border border-gray-300 bg-white",
        className,
      )}
      role="search"
    >
      <label htmlFor={inputId} className="sr-only">
        {submitLabel}
      </label>
      <input
        {...inputProps}
        id={inputId}
        name="q"
        type="search"
        className={cn(
          "min-w-0 flex-1 border-0 px-4 outline-none placeholder:text-gray-400",
          inputProps?.className,
        )}
      />
      <button
        type="submit"
        className="inline-flex w-12 items-center justify-center bg-blue-700 text-white"
        aria-label={submitLabel}
      >
        <Icon name="search" size={24} />
      </button>
    </form>
  );
}

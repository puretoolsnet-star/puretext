"use client";

import { useId } from "react";

import { useI18n } from "@/i18n/context";
import { TextAreaToolbar } from "@/components/workspace/TextAreaToolbar";
import { cn } from "@/lib/cn";

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  minRows?: number;
  className?: string;
  showToolbar?: boolean;
  readOnly?: boolean;
};

export function TextEditor({
  value,
  onChange,
  label,
  minRows = 10,
  className,
  showToolbar = true,
  readOnly = false,
}: TextEditorProps) {
  const { t } = useI18n();
  const id = useId();

  return (
    <div className={cn("space-y-3", className)}>
      {label ? (
        <label htmlFor={id} className="text-sm font-medium text-slate-200">
          {label}
        </label>
      ) : null}
      {showToolbar ? <TextAreaToolbar onClear={() => onChange("")} /> : null}
      <textarea
        id={id}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        rows={minRows}
        placeholder={t.workspace.placeholder}
        className="studio-input w-full min-w-0 resize-y rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-3 text-sm leading-relaxed text-slate-100 shadow-inner outline-none ring-teal-500/0 transition placeholder:text-slate-500 focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/25"
        spellCheck
      />
    </div>
  );
}
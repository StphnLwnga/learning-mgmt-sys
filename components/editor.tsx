"use client"

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import "react-quill/dist/quill.snow.css";
import { useTheme } from "next-themes";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
};

/**
 * Renders an editor component.
 *
 * @param {EditorProps} props - The props object containing the onChange and value properties.
 * @returns {JSX.Element} The rendered editor component.
 */
export const Editor = ({ onChange, value }: EditorProps): JSX.Element => {
  const { resolvedTheme } = useTheme();

  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (
    <div className={cn(
      "bg-white h-15 rounded",
      resolvedTheme === 'dark' && "bg-[#020817] text-slate-300",
    )}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
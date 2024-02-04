"use client"

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { File } from "lucide-react";

import { cn } from "@/lib/utils";

interface AttachmentLinkProps {
  attachment: {
    id: string;
    name: string;
    url: string;
  };
}

const AttachmentLink = ({ attachment: { id, name, url } }: AttachmentLinkProps) => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  return (
    <a key={id}
      href={url}
      target="_blank"
      className={cn(
        "flex items-center p-3 w-full border rounded-md hover:underline text-sky-700",
        isDarkTheme && "text-sky-300/20",
        !isDarkTheme ? "bg-sky-200" : "",
      )}
    >
      <File />
      <p className="line-clamp-1">
        {name}
      </p>
    </a>
  );
};

export default AttachmentLink;
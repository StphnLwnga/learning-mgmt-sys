"use client"

import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

/**
 * Renders a file upload component.
 *
 * @param {FileUploadProps} onChange - a function to handle the change event
 * @param {string} endpoint - the API endpoint for uploading files
 * @return {JSX.Element} the rendered file upload component
 */
const FileUpload = ({ onChange, endpoint }: FileUploadProps): JSX.Element => {
  const router = useRouter();

  const { toast } = useToast();

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        // console.log({res})
        onChange(res?.[0].url)
      }}
      onUploadError={err => (toast({
        title: 'Error',
        description: err?.message,
        variant: 'destructive',
      }))}
      appearance={{
        label: {
          color: isDarkTheme ? '#cbd5e1' : 'rgb(71 85 105)',
        },
      }}
    />
  );
}

export default FileUpload;
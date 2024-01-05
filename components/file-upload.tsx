"use client"

import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const refresh = () => router.refresh();

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={res => onChange(res[0].url)}
      onUploadError={err => (toast({
        title: 'Error',
        description: err?.message,
        variant: 'destructive',
        action: <ToastAction onClick={refresh} altText="Try again">Try again</ToastAction>,
      }))}
    />
  );
}

export default FileUpload;
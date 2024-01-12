"use client"

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
};

/**
 * Renders a preview of the given value using ReactQuill component.
 *
 * @param {PreviewProps} value - The value to be displayed in the preview.
 * @return {JSX.Element} The rendered preview component.
 */
export const Preview = ({ value }: PreviewProps): JSX.Element => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (<ReactQuill theme="bubble" value={value} readOnly />);
}
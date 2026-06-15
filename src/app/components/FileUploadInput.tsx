import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";

interface FileUploadInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accept?: string;
  className?: string;
}

export function FileUploadInput({
  label,
  value,
  onChange,
  placeholder = "Enter URL or upload file",
  accept = "image/*,video/*",
  className = "",
}: FileUploadInputProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            base64Data,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to upload file");
        }

        const data = await res.json();
        onChange(data.url);
      } catch (err: any) {
        console.error(err);
        setError("Upload failed. Try again.");
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const id = React.useId();

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-xs font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="pt-1">
          <label
            htmlFor={id}
            className={`flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer ${
              uploading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {uploading ? (
              <>
                <Loader2 size={16} className="animate-spin text-gray-500" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={16} className="text-gray-500" />
                <span>Upload</span>
              </>
            )}
          </label>
          <input
            id={id}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </div>
      </div>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}

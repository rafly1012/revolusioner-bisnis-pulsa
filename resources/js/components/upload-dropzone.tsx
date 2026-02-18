import { Loader2, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type UploadDropzoneProps = {
    accept?: string;
    description?:
        | {
              fileTypes?: string;
              maxFileSize?: string;
          }
        | string;
    disabled?: boolean;
    onChange?: (file: File | null) => void;
};

export function UploadDropzone({
    accept,
    description,
    disabled,
    onChange,
}: UploadDropzoneProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: false,
        accept: accept ? { [accept]: [] } : undefined,
        disabled,
        onDrop: (files) => {
            const selected = files[0];
            if (!selected) return;

            setFile(selected);
            const url = URL.createObjectURL(selected);
            setPreview(url);
            onChange?.(selected);
        },
    });

    const handleRemove = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setFile(null);
        setPreview(null);
        onChange?.(null);
    };

    return (
        <div
            className={cn(
                'relative rounded-lg border border-dashed border-input text-foreground transition-colors',
                { 'border-primary/80': isDragActive },
            )}
        >
            {/* UPLOAD AREA - hanya tampil jika belum ada file */}
            {!preview && (
                <>
                    <div
                        {...getRootProps()}
                        className={cn(
                            'flex w-full min-w-72 cursor-pointer flex-col items-center justify-center rounded-lg px-2 py-6 transition-colors',
                            {
                                'cursor-not-allowed text-muted-foreground':
                                    disabled,
                                'hover:bg-accent': !disabled,
                                'opacity-0': isDragActive,
                            },
                        )}
                    >
                        <div className="my-2">
                            {disabled ? (
                                <Loader2 className="size-6 animate-spin" />
                            ) : (
                                <Upload className="size-6" />
                            )}
                        </div>

                        <div className="mt-3 space-y-1 text-center">
                            <p className="text-sm font-semibold">
                                Seret dan lepas file di sini
                            </p>

                            <p className="max-w-64 text-xs text-muted-foreground">
                                {typeof description === 'string' ? (
                                    description
                                ) : (
                                    <>
                                        {description?.maxFileSize &&
                                            `Hingga ${description.maxFileSize}. `}
                                        {description?.fileTypes &&
                                            `Diterima ${description.fileTypes}.`}
                                    </>
                                )}
                            </p>
                        </div>

                        <input {...getInputProps()} />
                    </div>

                    {isDragActive && (
                        <div className="pointer-events-none absolute inset-0 rounded-lg">
                            <div className="flex size-full flex-col items-center justify-center rounded-lg bg-accent dark:bg-accent/40">
                                <Upload className="size-6" />
                                <p className="mt-3 text-sm font-semibold">
                                    Drop file here
                                </p>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* PREVIEW - hanya tampil jika ada file */}
            {preview && (
                <div className="p-3">
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-48 w-full rounded-xl border object-contain"
                        />
                        <Button
                            onClick={handleRemove}
                            variant="outline"
                            size="icon-sm"
                            className="absolute top-2 right-2 rounded-full"
                            disabled={disabled}
                        >
                            <X />
                        </Button>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                        {file?.name}
                    </p>
                </div>
            )}
        </div>
    );
}

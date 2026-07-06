"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoadingOverlay from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const MAX_PDF_SIZE = 50 * 1024 * 1024;

const voices = {
  male: [
    {
      id: "dave",
      name: "Dave",
      description: "Young male, British-Essex, casual & conversational",
    },
    {
      id: "daniel",
      name: "Daniel",
      description: "Middle-aged male, British, authoritative but warm",
    },
    {
      id: "chris",
      name: "Chris",
      description: "Male, casual & easy-going",
    },
  ],
  female: [
    {
      id: "rachel",
      name: "Rachel",
      description: "Young female, American, calm & clear",
    },
    {
      id: "sarah",
      name: "Sarah",
      description: "Young female, American, soft & approachable",
    },
  ],
} as const;

const isFile = (value: unknown): value is File =>
  typeof File !== "undefined" && value instanceof File;

const uploadSchema = z.object({
  pdfFile: z
    .custom<File | null>((value) => value === null || isFile(value), {
      message: "Please upload a PDF file.",
    })
    .refine((file) => isFile(file), "Please upload a PDF file.")
    .refine(
      (file) =>
        !isFile(file) ||
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf"),
      "Only PDF files are supported.",
    )
    .refine(
      (file) => !isFile(file) || file.size <= MAX_PDF_SIZE,
      "PDF file must be 50MB or smaller.",
    ),
  coverImage: z
    .custom<File | null | undefined>(
      (value) => value === null || value === undefined || isFile(value),
      {
        message: "Please upload a valid image file.",
      },
    )
    .refine(
      (file) => !isFile(file) || file.type.startsWith("image/"),
      "Only image files are supported.",
    )
    .nullable()
    .optional(),
  title: z.string().trim().min(1, "Title is required."),
  author: z.string().trim().min(1, "Author name is required."),
  voice: z.enum(["dave", "daniel", "chris", "rachel", "sarah"]),
});

type UploadFormInput = z.input<typeof uploadSchema>;
type UploadFormOutput = z.output<typeof uploadSchema>;

type DropzoneProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  accept: string;
  file: File | null | undefined;
  hint: string;
  name: string;
  onChange: (file: File | null) => void;
  text: string;
  type: "pdf" | "image";
};

function UploadDropzone({
  accept,
  className,
  file,
  hint,
  name,
  onChange,
  text,
  type,
  ...props
}: DropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const Icon = type === "pdf" ? Upload : ImageIcon;

  const setFile = (selectedFile?: File) => {
    if (selectedFile) {
      onChange(selectedFile);
    }
  };

  const clearFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className={cn(
        "upload-dropzone border-2 border-dashed border-[#d9c6a5]",
        file && "upload-dropzone-uploaded",
        className,
      )}
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        setFile(event.dataTransfer.files[0]);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      role="button"
      tabIndex={0}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        className="sr-only"
        onChange={(event) => setFile(event.target.files?.[0])}
      />

      {file ? (
        <div className="flex items-center gap-3 px-6 text-center">
          <Icon className="upload-dropzone-icon mb-0 shrink-0" />
          <div className="min-w-0">
            <p className="upload-dropzone-text truncate">{file.name}</p>
            <p className="upload-dropzone-hint">Ready to upload</p>
          </div>
          <button
            type="button"
            className="upload-dropzone-remove"
            aria-label={`Remove ${file.name}`}
            onClick={clearFile}
          >
            <X className="size-5" />
          </button>
        </div>
      ) : (
        <>
          <Icon className="upload-dropzone-icon" />
          <p className="upload-dropzone-text">{text}</p>
          <p className="upload-dropzone-hint">{hint}</p>
        </>
      )}
    </div>
  );
}

function UploadForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  //future-use
  const form = useForm<UploadFormInput, unknown, UploadFormOutput>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      pdfFile: null,
      coverImage: null,
      title: "",
      author: "",
      voice: "rachel",
    },
  });

  async function onSubmit(values: UploadFormOutput) {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      if (values.pdfFile) {
        formData.append("pdfFile", values.pdfFile);
      }

      if (values.coverImage) {
        formData.append("coverImage", values.coverImage);
      }

      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("voice", values.voice);

      await new Promise((resolve) => setTimeout(resolve, 900));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="new-book-wrapper">
      {isSubmitting && <LoadingOverlay />}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pdfFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Book PDF File</FormLabel>
                <FormControl>
                  <UploadDropzone
                    name={field.name}
                    accept="application/pdf,.pdf"
                    file={field.value}
                    type="pdf"
                    text="Click to upload PDF"
                    hint="PDF file (max 50MB)"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Cover Image (Optional)
                </FormLabel>
                <FormControl>
                  <UploadDropzone
                    name={field.name}
                    accept="image/*"
                    file={field.value}
                    type="image"
                    text="Click to upload cover image"
                    hint="Leave empty to auto-generate from PDF"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <input
                    className="form-input"
                    placeholder="ex: Rich Dad Poor Dad"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <input
                    className="form-input"
                    placeholder="ex: Robert Kiyosaki"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Choose Assistant Voice
                </FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[#5f564a]">
                        Male Voices
                      </p>
                      <div className="voice-selector-options flex-col md:flex-row">
                        {voices.male.map((voice) => (
                          <label
                            key={voice.id}
                            className={cn(
                              "voice-selector-option",
                              field.value === voice.id
                                ? "voice-selector-option-selected"
                                : "voice-selector-option-default",
                            )}
                          >
                            <input
                              type="radio"
                              className="size-4 accent-[#663820]"
                              value={voice.id}
                              checked={field.value === voice.id}
                              onChange={() => field.onChange(voice.id)}
                            />
                            <span className="min-w-0">
                              <span className="block font-semibold text-[#2f2b28]">
                                {voice.name}
                              </span>
                              <span className="mt-1 block text-sm leading-snug text-[#5f564a]">
                                {voice.description}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[#5f564a]">
                        Female Voices
                      </p>
                      <div className="voice-selector-options flex-col md:flex-row">
                        {voices.female.map((voice) => (
                          <label
                            key={voice.id}
                            className={cn(
                              "voice-selector-option",
                              field.value === voice.id
                                ? "voice-selector-option-selected"
                                : "voice-selector-option-default",
                            )}
                          >
                            <input
                              type="radio"
                              className="size-4 accent-[#663820]"
                              value={voice.id}
                              checked={field.value === voice.id}
                              onChange={() => field.onChange(voice.id)}
                            />
                            <span className="min-w-0">
                              <span className="block font-semibold text-[#2f2b28]">
                                {voice.name}
                              </span>
                              <span className="mt-1 block text-sm leading-snug text-[#5f564a]">
                                {voice.description}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="form-btn" disabled={isSubmitting}>
            Begin Synthesis
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UploadForm;

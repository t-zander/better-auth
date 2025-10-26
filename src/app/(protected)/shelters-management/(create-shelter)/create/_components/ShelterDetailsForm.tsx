"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloudUploadOutline, IoLocationOutline } from "react-icons/io5";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Shelter name must be at least 2 characters.",
  }),
  description: z.string(),
  location: z.string(),
});

interface ShelterDetailsFormProps {
  onSubmit: (
    values: z.infer<typeof formSchema> & { avatar?: string | null }
  ) => void;
  isSubmitting: boolean;
}

export function ShelterDetailsForm({
  onSubmit: onSubmitProp,
  isSubmitting,
}: ShelterDetailsFormProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Clean up the URL object when the component unmounts
    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the image
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSubmitProp({
      ...values,
      avatar: avatarUrl,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-[150px] h-[150px] rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
              onClick={triggerFileInput}
            >
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Shelter Avatar"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-gray-500">
                  <IoCloudUploadOutline size={40} />
                  <span className="text-sm text-center mt-2">
                    Upload Shelter Logo
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              className="mt-2"
              type="button"
            >
              {avatarUrl ? "Change Image" : "Upload Image"}
            </Button>
          </div>

          {/* Information Form */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shelter Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Happy Paws Shelter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A safe haven for abandoned animals looking for their forever homes..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <IoLocationOutline /> Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main Street, City, State, 12345"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the shelter&apos;s physical address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Details"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { z } from "zod";

import { useZodForm } from "@/lib/zod-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import ImageUpload from "./image-upload";

const photoSchema = z.object({
  name: z.string().nonempty(),
  url: z.string(),
  tags: z.string(),
  isDraft: z.boolean().default(false).optional(),
});

export type PhotoFormValues = z.infer<typeof photoSchema>;

export default function PhotoForm() {
  const [url, setUrl] = useState(`https://picsum.photos/id/76/1000`);

  const form = useZodForm({
    schema: photoSchema,
    defaultValues: { url },
  });

  const { formState, handleSubmit, setValue, reset, control, register } = form;
  const { isSubmitting } = formState;

  const onSubmit = handleSubmit(async (data) => {
    await fetch("/api/photo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success("Photo created successfully");
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error creating photo");
      });
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="flex gap-5 mx-auto sm:flex-row flex-col"
      >
        <ImageUpload url={url} setUrl={setUrl} setValue={setValue} />
        <div className="w-full flex flex-col gap-5">
          <FormField
            control={control}
            name="name"
            render={() => (
              <FormItem>
                <FormLabel>Photo Name</FormLabel>
                <FormControl>
                  <Input placeholder="Photo's name" {...register("name")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="tags"
            render={() => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Photo's tags" {...register("tags")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="isDraft"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="draft"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label htmlFor="draft" className="text-sm leading-none">
                      Is Draft
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="flex gap-2">
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

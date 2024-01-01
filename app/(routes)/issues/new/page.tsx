"use client";

import { createIssueAction } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { createIssueSchema, createIssueSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
export default function NewIssuePage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof createIssueSchema>>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function createIssue(data: FormData) {
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    await createIssueAction(title, description);
    toast({
      title: "New issue created!",
    });
    router.push("/issues");
  }

  async function onSubmit(values: createIssueSchemaType) {
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      await createIssue(formData);

      console.log(values);
      toast({
        title: "New issue created!",
      });
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="maincol pt-20 min-h-screen"
      >
        <h1 className="w-full text-center text-3xl text-slate-700">
          Create new issue
        </h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
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
                <Textarea placeholder="Description" {...field} />
              </FormControl>{" "}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <SubmitButton />
      </form>
    </Form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-5" type="submit" disabled={pending}>
      Submit New Issue
    </Button>
  );
}

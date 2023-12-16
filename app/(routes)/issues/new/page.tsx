"use client";

import { createIssueAction } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
interface IssueForm {
  title: string;
  description: string;
}

export default function NewIssuePage() {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState("");
  async function createIssue(data: FormData) {
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    await createIssueAction(title, description);
    router.push("/issues");
  }
  return (
    <form action={createIssue} className="maincol pt-20">
      <h1 className="w-full text-center text-3xl text-slate-700">
        Create new issue
      </h1>
      <div className="md:w-2/3 mx-auto space-y-5 mt-10">
        <Input placeholder="Title" name="title" />
        {/* 
        <Controller
          name="description"
          control={control}
          defaultValue="description"
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              {...field}
              onChange={(value) => setDescription(value)}
            />
          )}
        /> */}
        <Textarea
          name="description"
          id=""
          className="w-full h-72 border"
          placeholder="Description"
        ></Textarea>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      Submit New Issue
    </Button>
  );
}

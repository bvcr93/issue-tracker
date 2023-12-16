"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
export default function NewIssuePage() {
  return (
    <div className="maincol mt-20">
      <h1 className="w-full text-center text-3xl text-slate-700">
        Create new issue
      </h1>
      <div className="md:w-1/2 mx-auto space-y-5 mt-10">
        <Input placeholder="Title" />
        <SimpleMDE />
        <Button type="submit">Submit New Issue</Button>
      </div>
    </div>
  );
}

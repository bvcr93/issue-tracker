import Spinner from "@/components/ui/spinner";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner />
    </div>
  );
}

import UploadForm from "@/components/UploadForm";
import React from "react";

function page() {
  return (
    <main className="wrapper container">
      <div className="mx-auto max-w-180 space-y-10">
        <section className="flex flex-col gap-2">
          <h1 className="page-title-xl">Add a New Book</h1>
          <p className="subtitle text-gray-600">
            Upload a PDF to generate your interactive interview.
          </p>
        </section>
        <UploadForm />
      </div>
    </main>
  );
}

export default page;

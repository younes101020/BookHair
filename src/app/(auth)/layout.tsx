import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <Toaster />
    </>
  );
}

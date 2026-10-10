"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedAdmin({ children }) {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user || (user.role !== "ADMIN" && user.role !== "EMPLOYEE")) {
        router.push("/login");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || (user.role !== "ADMIN" && user.role !== "EMPLOYEE")) {
    return <div className="p-8 text-center text-stone-500">Yetki kontrol ediliyor...</div>;
  }

  return <>{children}</>;
}

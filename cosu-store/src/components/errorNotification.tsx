"use client";
import { error } from "console";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { Suspense } from "react";

export default function Notif() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotifContent />
    </Suspense>
  );
}

function NotifContent() {
  const params = useSearchParams();
  const search = params.get("error");
  return search && <h2 className="text-red-700 text-sm text-center">{search}</h2>;
}

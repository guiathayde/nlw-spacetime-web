"use client";

import { Share } from "lucide-react";
import toast from "react-hot-toast";

interface ShareButtonProps {
  memoryId: string;
}

export function ShareButton({ memoryId }: ShareButtonProps) {
  function handleShareMemory(memoryId: string) {
    const url = `${window.location.origin}/memories/${memoryId}`;

    navigator.clipboard.writeText(url);

    toast("Link copiado para a área de transferência", {
      icon: "📋",
    });
  }

  return (
    <button
      className="flex items-center gap-2 text-gray-200 hover:text-gray-100"
      onClick={() => handleShareMemory(memoryId)}
    >
      Compartilhar
      <Share className="h-4 w-4" />
    </button>
  );
}

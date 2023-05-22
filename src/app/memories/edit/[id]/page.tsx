import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

import { api } from "@/lib/api";

import { NewMemoryForm } from "@/components/NewMemoryForm";

interface MemoryComponentProps {
  params: {
    id: string;
  };
}

interface Memory {
  id: string;
  coverUrl: string;
  coverType: string;
  content: string;
  isPublic: boolean;
  createdAt: string;
}

export default async function EditMemory({ params }: MemoryComponentProps) {
  const token = cookies().get("token")?.value;

  const { id } = params;

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memory = response.data as Memory;

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar a timeline
      </Link>

      <NewMemoryForm memory={memory} />
    </div>
  );
}

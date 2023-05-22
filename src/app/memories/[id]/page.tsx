import { api } from "@/lib/api";
import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import Image from "next/image";

import { isImage, isVideo } from "@/utils/mediaTypes";

dayjs.locale(ptBr);

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

export default async function MemoryComponent({
  params,
}: MemoryComponentProps) {
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

      <div className="space-y-4">
        <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format("DD [de] MMMM, YYYY")}
        </time>
        {isImage.includes(memory.coverType) && (
          <Image
            src={memory.coverUrl}
            width={592}
            height={280}
            alt=""
            className="aspect-video w-full rounded-lg object-cover"
          />
        )}
        {isVideo.includes(memory.coverType) && (
          <video
            src={memory.coverUrl}
            className="aspect-video w-full rounded-lg object-cover"
            controls={false}
          />
        )}
        <p className="text-lg leading-relaxed text-gray-100">
          {memory.content}
        </p>
      </div>

      <Link
        href={`/memories/edit/${memory.id}`}
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Editar
      </Link>
    </div>
  );
}

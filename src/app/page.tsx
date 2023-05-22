import { cookies } from "next/headers";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { api } from "@/lib/api";

import { isImage, isVideo } from "@/utils/mediaTypes";

import { EmptyMemories } from "@/components/EmptyMemories";
import { ShareButton } from "@/components/ShareButton";

interface Memory {
  id: string;
  coverUrl: string;
  coverType: string;
  excerpt: string;
  isPublic: boolean;
  createdAt: string;
}

dayjs.locale(ptBr);

export default async function Home() {
  const isAuthenticated = cookies().has("token");

  if (!isAuthenticated) return <EmptyMemories />;

  const token = cookies().get("token")?.value;
  const response = await api.get("/memories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memories = response.data as Memory[];

  if (memories.length === 0) return <EmptyMemories />;

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
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
            {memory.excerpt}
          </p>
          <ShareButton memoryId={memory.id} />
          <Link
            href={`/memories/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Ler mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

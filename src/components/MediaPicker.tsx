"use client";

import { useState, ChangeEvent } from "react";

import { isImage, isVideo } from "@/utils/mediaTypes";

interface Preview {
  url: string;
  fileName?: string;
  extension: string;
}

interface Memory {
  id: string;
  coverUrl: string;
  coverType: string;
}

interface MediaPickerProps {
  memory?: Memory;
}

export function MediaPicker({ memory }: MediaPickerProps) {
  const [preview, setPreview] = useState<Preview | null>(() => {
    if (memory) {
      return {
        url: memory.coverUrl,
        fileName: memory.id,
        extension: memory.coverType,
      };
    }

    return null;
  });

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    const previewURL = URL.createObjectURL(files[0]);

    const fileName = files[0].name;
    const extension = fileName.slice(
      ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
    );

    setPreview({
      url: previewURL,
      fileName,
      extension,
    });
  }

  return (
    <>
      <input
        name="coverUrl"
        type="file"
        id="media"
        className="invisible h-0 w-0"
        accept="image/*,video/*"
        onChange={onFileSelected}
      />

      {preview && isImage.includes(preview.extension) && (
        // eslint-disable-next-line
        <img
          src={preview.url}
          alt={preview.fileName}
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}

      {preview && isVideo.includes(preview.extension) && (
        <video
          src={preview.url}
          className="aspect-video w-full rounded-lg object-cover"
          controls={false}
        />
      )}
    </>
  );
}

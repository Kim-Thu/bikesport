"use client";

import { useState } from "react";
import { cn } from "@/lib/classname.utils";

interface ShareActionsProps {
  title?: string;
  className?: string;
}

export function ShareActions({ title, className }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const getCurrentUrl = () => window.location.href;

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=720,height=640");
  };

  const shareFacebook = () => {
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getCurrentUrl())}`);
  };

  const shareZalo = () => {
    const params = new URLSearchParams({ url: getCurrentUrl() });
    if (title) params.set("title", title);
    openShareWindow(`https://zalo.me/share?${params.toString()}`);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(getCurrentUrl());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const buttonClass =
    "rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-blue-700 hover:text-blue-700";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Chia sẻ">
      <span className="text-xs font-medium text-gray-500">Chia sẻ:</span>
      <button type="button" onClick={shareZalo} className={buttonClass}>
        Zalo
      </button>
      <button type="button" onClick={shareFacebook} className={buttonClass}>
        Facebook
      </button>
      <button type="button" onClick={copyLink} className={buttonClass}>
        {copied ? "Đã sao chép" : "Copy link"}
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export function SocialShare({
    text = "I just completed a lesson on Drum School!",
    url = "https://drumschool.demo"
}: { text?: string, url?: string }) {

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    };

    return (
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open(shareLinks.twitter, '_blank')}>
                Share on X
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open(shareLinks.facebook, '_blank')}>
                Facebook
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open(shareLinks.telegram, '_blank')}>
                Telegram
            </Button>
        </div>
    );
}

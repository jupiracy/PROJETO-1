"use client";

import { createElement } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
    const router = useRouter();

    return (
        <div className="fixed top-4 right-4 z-50">
            <Button
                variant="outline"
                size="icon"
                onClick={() => router.back()}
                className="bg-background/80 backdrop-blur-sm border shadow-sm hover:bg-accent"
                title="Go Back"
            >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Go Back</span>
            </Button>
        </div>
    );
}

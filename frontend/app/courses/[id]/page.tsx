"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";
import Link from "next/link";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";

export default function CourseDetailPage() {
    const { id } = useParams();
    const [course, setCourse] = useState<any>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await api.get(`/courses/courses/${id}/`);
                setCourse(data);
            } catch (e) {
                console.error(e);
            }
        };
        if (id) fetchCourse();
    }, [id]);

    if (!course) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
                <p className="text-xl text-muted-foreground">{course.level_name}</p>
                <p className="mt-4">{course.description}</p>
            </div>

            <div className="space-y-6">
                {course.modules?.map((module: any) => (
                    <Card key={module.id}>
                        <CardHeader>
                            <CardTitle>{module.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {module.lessons?.map((lesson: any) => (
                                <div key={lesson.id} className="flex items-center justify-between p-2 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-900">
                                    <div className="flex items-center gap-3">
                                        {lesson.is_completed ? (
                                            <CheckCircle className="text-green-500 w-5 h-5" />
                                        ) : (
                                            <PlayCircle className="text-blue-500 w-5 h-5" />
                                        )}
                                        <span>{lesson.title}</span>
                                    </div>
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={`/courses/${id}/lesson/${lesson.id}`}>Start</Link>
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

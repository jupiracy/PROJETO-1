"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";
import { CheckCircle } from "lucide-react";

export default function LessonPage() {
    const { id, lessonId } = useParams();
    const router = useRouter();
    const [lesson, setLesson] = useState<any>(null);
    const [tasks, setTasks] = useState<any[]>([]);

    const fetchLesson = async () => {
        try {
            const { data } = await api.get(`/courses/lessons/${lessonId}/`);
            setLesson(data);
            setTasks(data.tasks || []);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (lessonId) fetchLesson();
    }, [lessonId]);

    const handleCompleteTask = async (taskId: number) => {
        try {
            const { data } = await api.post(`/courses/tasks/${taskId}/complete/`);
            alert(`Task completed! You earned ${data.points_awarded} points.`);
            fetchLesson(); // Refresh fetching tasks
        } catch (e: any) {
            alert(e.response?.data?.detail || "Error completing task");
        }
    };

    const handleFinishLesson = async () => {
        try {
            await api.post(`/courses/lessons/${lessonId}/complete/`);
            router.push(`/courses/${id}`);
        } catch (e) {
            console.error(e);
        }
    };

    if (!lesson) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">← Back to Course</Button>

            <div className="aspect-video bg-black rounded-lg mb-8 flex items-center justify-center text-white">
                {lesson.video_url ? (
                    <iframe
                        src={lesson.video_url}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                    />
                ) : (
                    <span>No Video Content</span>
                )}
            </div>

            <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
            <div className="prose dark:prose-invert mb-8">
                {lesson.content}
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Tasks</h2>
                {tasks.map(task => (
                    <Card key={task.id} className={task.is_completed ? "border-green-500" : ""}>
                        <CardContent className="flex justify-between items-center p-4">
                            <div>
                                <p className="font-medium">{task.description}</p>
                                <span className="text-sm text-muted-foreground">{task.points_reward} Points</span>
                            </div>
                            {task.is_completed ? (
                                <div className="flex items-center text-green-500 gap-2">
                                    <CheckCircle size={20} />
                                    <span>Done</span>
                                </div>
                            ) : (
                                <Button onClick={() => handleCompleteTask(task.id)}>Complete</Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <Button size="lg" onClick={handleFinishLesson}>Finish Lesson</Button>
            </div>
        </div>
    );
}

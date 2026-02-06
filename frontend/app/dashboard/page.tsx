"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";
import Link from "next/link";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [wallet, setWallet] = useState<any>(null);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await api.get("/auth/me/");
                setUser(userRes.data);

                const walletRes = await api.get("/gamification/wallet/");
                setWallet(walletRes.data);

                // Assuming we have an endpoint for my courses or we fetch all and filter?
                // Let's use /courses/ for now (assuming it lists all available)
                // Ideally we need /courses/my_courses/
                const coursesRes = await api.get("/courses/courses/");
                setEnrolledCourses(coursesRes.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    if (!user) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Welcome, {user.username}</h1>
                <div className="flex items-center gap-4">
                    <Card className="bg-primary text-primary-foreground">
                        <CardContent className="p-4">
                            <span className="font-bold text-xl">{wallet?.current_balance || 0} PTS</span>
                        </CardContent>
                    </Card>

                    <Button asChild variant="outline">
                        <Link href="/store">Visit Store</Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="col-span-full">
                    <CardHeader>
                        <CardTitle>My Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Level: {user.student_profile?.current_level_name || 'Beginner'}</p>
                        {/* Progress Bar Here */}
                    </CardContent>
                </Card>

                <h2 className="text-2xl font-bold col-span-full mt-6">Courses</h2>
                {enrolledCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">{course.description}</p>
                            <Button asChild className="w-full">
                                <Link href={`/courses/${course.id}`}>Continue Learning</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

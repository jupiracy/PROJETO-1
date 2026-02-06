"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";
import Link from "next/link";

import { useLanguage } from "@/context/LanguageContext";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [wallet, setWallet] = useState<any>(null);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await api.get("/auth/me/");
                setUser(userRes.data);

                const walletRes = await api.get("/gamification/wallet/");
                setWallet(walletRes.data);

                // Assuming we have an endpoint for my courses or we fetch all and filter?
                const coursesRes = await api.get("/courses/courses/");
                setEnrolledCourses(coursesRes.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    if (!user) return <div className="p-8">{t("common.loading")}</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t("dashboard.welcome")}, {user.username}</h1>
                <div className="flex items-center gap-4">
                    <Card className="bg-primary text-primary-foreground">
                        <CardContent className="p-4">
                            <span className="font-bold text-xl">{wallet?.current_balance || 0} PTS</span>
                        </CardContent>
                    </Card>

                    <Button asChild variant="outline">
                        <Link href="/store">{t("dashboard.visit_store")}</Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="col-span-full">
                    <CardHeader>
                        <CardTitle>{t("dashboard.my_progress")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t("dashboard.level")}: {user.student_profile?.current_level_name || 'Beginner'}</p>
                        {/* Progress Bar Here */}
                    </CardContent>
                </Card>

                <h2 className="text-2xl font-bold col-span-full mt-6">{t("dashboard.courses")}</h2>
                {enrolledCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">{course.description}</p>
                            <Button asChild className="w-full">
                                <Link href={`/courses/${course.id}`}>{t("dashboard.continue_learning")}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

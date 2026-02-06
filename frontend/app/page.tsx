import Link from "next/link";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-black to-zinc-900 text-white relative">
            <div className="absolute top-8 right-8 z-50">
                <LanguageSelector />
            </div>
            <div className="z-10 max-w-5xl w-full flex flex-col items-center text-center space-y-8">
                <h1 className="text-6xl font-extrabold tracking-tight">
                    Master the <span className="text-primary">Drums</span>
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl">
                    Join the ultimate drumming school. Learn from beginners to advanced levels,
                    complete tasks, earn points, and redeem exclusive gear.
                </p>

                <div className="flex gap-4">
                    <Button asChild size="lg" className="text-lg px-8">
                        <Link href="/register">Start Now</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="text-lg px-8">
                        <Link href="/login">Login</Link>
                    </Button>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-zinc-800 rounded-xl">
                        <h3 className="text-2xl font-bold mb-2">Structured Learning</h3>
                        <p className="text-zinc-400">Step-by-step courses from beginner to pro.</p>
                    </div>
                    <div className="p-6 bg-zinc-800 rounded-xl">
                        <h3 className="text-2xl font-bold mb-2">Gamified Progress</h3>
                        <p className="text-zinc-400">Earn points for every task and lesson.</p>
                    </div>
                    <div className="p-6 bg-zinc-800 rounded-xl">
                        <h3 className="text-2xl font-bold mb-2">Rewards Store</h3>
                        <p className="text-zinc-400">Redeem your hard-earned points for gear.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

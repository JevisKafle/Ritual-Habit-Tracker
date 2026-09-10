import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-page flex flex-col items-center justify-center gap-4 px-4">
            <h1 className="text-2xl font-bold text-foreground">Habit not found</h1>
            <p className="text-muted-foreground text-center">
                This habit doesn't exist or you don't have access to it.
            </p>
            <Link href="/home" className="text-primary font-semibold hover:underline">
                Back to your habits
            </Link>
        </div>
    );
}
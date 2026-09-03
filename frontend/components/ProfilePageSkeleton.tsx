
import { Skeleton } from "@/components/ProfileSkeleton";

export default function ProfilePageSkeleton() {
    return (
        <div className="min-h-screen bg-page">
            <main className="mx-auto max-w-2xl space-y-5 px-4 py-8">
                {/* Profile */}
                <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-2xl" />

                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5.5 w-35" />
                            <Skeleton className="h-4 w-45" />
                            <Skeleton className="h-3.5 w-30" />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div>
                    <Skeleton className="mb-3 h-3 w-20" />

                    <div className="grid grid-cols-2 gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="space-y-2 rounded-2xl border border-border bg-card p-4"
                            >
                                <Skeleton className="h-5 w-5" />
                                <Skeleton className="h-6 w-12" />
                                <Skeleton className="h-3 w-18" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logout */}
                <Skeleton className="h-12 w-full rounded-2xl" />
            </main>
        </div>
    );
}


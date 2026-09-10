import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const HabitDetailSkeleton = () => {
    return (
        <main className="w-full max-w-3xl mx-auto p-4 space-y-6 my-6">
            {/* Header Card Skeleton */}
            <Card className="ring-0 shadow-md">
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                        <div className="w-full space-y-3">
                            {/* Title  */}
                            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                                <Skeleton className="h-8 w-48" />
                            </CardTitle>
                            {/* Description */}
                            <CardDescription className="text-muted-foreground py-2">
                                <Skeleton className="h-4 w-full max-w-md" />
                            </CardDescription>
                            {/* Frequency badge and date */}
                            <CardContent className="py-1 px-0 flex items-center gap-4">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </CardContent>
                        </div>
                        {/* Delete button placeholder */}
                        <Skeleton className="w-9 h-9 rounded-lg" />
                    </div>
                </CardHeader>
            </Card>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="rounded-2xl">
                        <CardContent className="flex flex-col items-center justify-center py-6 space-y-2">
                            <Skeleton className="w-6 h-6 rounded-full" />
                            <Skeleton className="h-8 w-12" />
                            <Skeleton className="h-4 w-20" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Heatmap Card Skeleton */}
            <Card className="ring-0 shadow-md">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">
                        <Skeleton className="h-6 w-32" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Heatmap grid placeholder */}
                    <div className="flex gap-1.5 flex-wrap">
                        {Array.from({ length: 35 }).map((_, i) => (
                            <Skeleton 
                                key={i} 
                                className="w-3 h-3 rounded-sm" 
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Check-in Button Skeleton */}
            <Skeleton className="w-full h-12 rounded-2xl" />
        </main>
    );
};

export default HabitDetailSkeleton;
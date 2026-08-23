import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function HabitCardSkeleton() {
    return (
        <Card className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl ring-0 shadow-md">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-56" />
                    </div>
                    <Skeleton className="h-4 w-10" />
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex items-center gap-1.5">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton key={i} className="flex-1 h-2 rounded-full" />
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-7 w-24 rounded-2xl" />
            </CardFooter>
        </Card>
    );
}
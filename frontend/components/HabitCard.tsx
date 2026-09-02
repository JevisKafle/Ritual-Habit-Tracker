"use client";

import { Check } from 'lucide-react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link"

import { HabitCardProps } from "@/type";


const todayISO = () => {
    return new Date().toISOString().split("T")[0];
};

const dateRange = (days: number) => {
    const dates: string[] = [];

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
};

const HabitCard = ({
    id,
    title,
    desc,
    isDoneToday,
    checkIns,
    color,
    onCheckIn
}: HabitCardProps) => {
    const today = todayISO();
    const last7 = dateRange(7);

    return (
        <Link href={`/habits/${id}`}>
            <Card className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl ring-0 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded-full shrink-0"
                                    style={{ background: color }}
                                />
                                {title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                {desc}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pb-2">
                    {/* Last 7 days */}
                    <div className="flex items-center gap-1.5">
                        {last7.map((date) => {
                            const done = checkIns.includes(date);
                            const isToday = date === today;

                            return (
                                <div
                                    key={date}
                                    className={`flex-1 h-2 rounded-full transition-all ${done
                                        ? `bg-[${color}]`
                                        : 'bg-gray-200 dark:bg-gray-400'
                                        }`}
                                    style={{
                                        opacity: done ? 1 : 0.5,
                                        boxShadow:
                                            isToday && done
                                                ? `0 0 0 2px ${color}30`
                                                : "none",
                                        background: done ? color : undefined,
                                    }}
                                />
                            );
                        })}
                    </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between pt-2 text-xs">
                    <p className="text-muted-foreground">Last 7 days</p>

                    {isDoneToday ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-3 text-xs cursor-pointer hover:"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onCheckIn();
                            }}
                        >
                            <Check /> Done today
                        </Button>
                    ) : (
                        <Button
                            variant="default"
                            size="sm"
                            className="h-7 p-4 text-sm text-white cursor-pointer rounded-2xl"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onCheckIn();
                            }}
                        >
                            Check in
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </Link>
    );
};

export default HabitCard;
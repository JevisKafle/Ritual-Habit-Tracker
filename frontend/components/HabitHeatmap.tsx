"use client";

type HabitHeatmapProps = {
    checkIns: string[]; 
    color: string;
    weeksToShow?: number;
};

export default function HabitHeatmap({
    checkIns,
    color,
    weeksToShow = 16,
}: HabitHeatmapProps) {
    const checkInSet = new Set(checkIns);

    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())); 

    const totalDays = weeksToShow * 7;
    const startDate = new Date(endOfWeek);
    startDate.setDate(endOfWeek.getDate() - totalDays + 1);

    const days: Date[] = [];
    for (let i = 0; i < totalDays; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        days.push(d);
    }

    const weeks: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    const toISO = (d: Date) => d.toISOString().split("T")[0];

    const monthLabels = weeks.map((week) => {
        const first = week[0];
        return first.getDate() <= 7
            ? first.toLocaleString("default", { month: "short" })
            : "";
    });

    return (
        <div className="w-full">
            <div className="flex gap-2 mb-2 text-sm font-medium text-muted-foreground pl-12">
                {monthLabels.map((label, i) => (
                    <div key={i} className="w-6 text-left">
                        {label}
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <div className="flex flex-col gap-2 text-sm font-medium text-muted-foreground pr-2 justify-between py-1 w-10">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                </div>

                <div className="flex gap-2">
                    {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-2">
                            {week.map((day, di) => {
                                const iso = toISO(day);
                                const isChecked = checkInSet.has(iso);
                                const isFuture = day > today;

                                return (
                                    <div
                                        key={di}
                                        title={iso}
                                        className="w-6 h-6 rounded-md transition-colors"
                                        style={{
                                            background: isFuture
                                                ? "transparent"
                                                : isChecked
                                                    ? color
                                                    : "var(--color-muted)",
                                            opacity: isChecked ? 1 : isFuture ? 0 : 0.6,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4 text-sm text-muted-foreground">
                <span>Less</span>
                <div className="w-6 h-6 rounded-md" style={{ background: "var(--color-muted)", opacity: 0.6 }} />
                <div className="w-6 h-6 rounded-md" style={{ background: color, opacity: 1 }} />
                <span>More</span>
            </div>
        </div>
    );
}
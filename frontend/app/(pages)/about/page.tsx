import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <main className="mx-auto max-w-2xl px-6 py-16">
            <h1 className="text-3xl font-semibold tracking-tight">
                About Habit Tracker
            </h1>

            <p className="mt-4 text-muted-foreground leading-relaxed">
                Habit Tracker is a simple tool for building consistency. Create a
                habit, check in daily or weekly, and watch your streak grow. No
                noise, no gamified point systems — just a clear record of whether
                you showed up.
            </p>

            <Card className="mt-8">
                <CardContent className="pt-2 space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                        Every habit tracks its own streak - how many days or weeks
                        in a row you've kept it up, and your longest run ever. Miss a
                        day and the streak resets, but the history stays so you can
                        see the full pattern over time, not just the current run.
                    </p>
                    <p>
                        The dashboard shows all your active habits at a glance, with
                        a quick check-in button and a 7-day view so you can spot gaps
                        before they turn into a broken streak.
                    </p>
                </CardContent>
            </Card>

            <p className="mt-8 text-sm text-muted-foreground">
                Built as a personal project to get better at shipping full,
                end-to-end features from the data model to the button you tap
                every morning.
            </p>
        </main>
    );
}

import HabitList from "@/components/HabitsList";
import RequireAuth from "@/components/RequireAuth";

export default function HomePage() {
    return (
        <RequireAuth>
            <main className="w-full max-w-3xl mx-auto p-4 space-y-6">
                <HabitList />
            </main>
        </RequireAuth>
    );
}


const HabitDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div>
            Habit no. {id}
        </div>
    )
}

export default HabitDetailPage

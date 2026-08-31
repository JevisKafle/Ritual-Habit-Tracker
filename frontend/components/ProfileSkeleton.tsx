export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div
            className={`rounded-lg animate-pulse bg-muted ${className ?? ""}`}
            style={style}
        />
    );
}
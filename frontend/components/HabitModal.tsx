"use client";

import { useState } from "react";
import { IconX } from "@/components/icon";
import { Frequency } from "@/type";
import { HABIT_COLORS } from "@/utils/utils";
import { HabitModalProps } from "@/type";

export default function HabitModal({ habit, onSave, onCancel }: HabitModalProps) {
    const [title, setTitle] = useState(habit?.title ?? "");
    const [description, setDescription] = useState(habit?.desc ?? "");
    const [frequency, setFrequency] = useState<Frequency>("daily");
    const [color, setColor] = useState(habit?.color ?? HABIT_COLORS[0]);

    const canSave = title.trim().length > 0;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(4px)",
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onCancel();
                }
            }}
        >
            <div
                className="w-full max-w-md rounded-3xl p-6 shadow-2xl border"
                style={{
                    background: "var(--color-card)",
                    borderColor: "var(--color-border)",
                }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2
                        className="text-lg font-bold"
                        style={{ color: "var(--color-foreground)" }}
                    >
                        {habit ? "Edit habit" : "New habit"}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                        style={{
                            background: "var(--color-secondary)",
                            color: "var(--color-muted-foreground)",
                        }}
                    >
                        <IconX />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Title */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-1.5"
                            style={{ color: "var(--color-foreground)" }}
                        >
                            Habit name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Morning meditation"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all border"
                            style={{
                                background: "var(--color-secondary)",
                                borderColor: "var(--color-border)",
                                color: "var(--color-foreground)",
                            }}
                            onFocus={(e) =>
                            (e.currentTarget.style.borderColor =
                                "var(--color-primary)")
                            }
                            onBlur={(e) =>
                            (e.currentTarget.style.borderColor =
                                "var(--color-border)")
                            }
                            autoFocus
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-1.5"
                            style={{ color: "var(--color-foreground)" }}
                        >
                            Description
                        </label>
                        <textarea
                            placeholder="What does this habit involve?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                            className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all border resize-none"
                            style={{
                                background: "var(--color-secondary)",
                                borderColor: "var(--color-border)",
                                color: "var(--color-foreground)",
                            }}
                            onFocus={(e) =>
                            (e.currentTarget.style.borderColor =
                                "var(--color-primary)")
                            }
                            onBlur={(e) =>
                            (e.currentTarget.style.borderColor =
                                "var(--color-border)")
                            }
                        />
                    </div>

                    {/* Frequency */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-1.5"
                            style={{ color: "var(--color-foreground)" }}
                        >
                            Frequency
                        </label>
                        <div
                            className="flex rounded-xl p-1"
                            style={{ background: "var(--color-muted)" }}
                        >
                            {(["daily", "weekly"] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFrequency(f)}
                                    className="flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-150"
                                    style={{
                                        background:
                                            frequency === f
                                                ? "var(--color-card)"
                                                : "transparent",
                                        color:
                                            frequency === f
                                                ? "var(--color-foreground)"
                                                : "var(--color-muted-foreground)",
                                        boxShadow:
                                            frequency === f
                                                ? "0 1px 4px rgba(0,0,0,0.08)"
                                                : "none",
                                    }}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: "var(--color-foreground)" }}
                        >
                            Color
                        </label>
                        <div className="flex gap-5 flex-wrap">
                            {HABIT_COLORS.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    className="w-7 h-7 rounded-full transition-all duration-150 cursor-pointer "
                                    style={{
                                        background: c,
                                        boxShadow:
                                            color === c
                                                ? `0 0 0 3px var(--color-card), 0 0 0 5px ${c}`
                                                : "none",
                                        transform:
                                            color === c
                                                ? "scale(1.15)"
                                                : "scale(1)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                        style={{
                            background: "var(--color-secondary)",
                            color: "var(--color-secondary-foreground)",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() =>
                            canSave &&
                            onSave({
                                title: title.trim(),
                                desc: description.trim(),
                                frequency,
                                color,
                            })
                        }
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
                        style={{
                            background: canSave
                                ? "var(--color-primary)"
                                : "var(--color-muted)",
                            color: canSave
                                ? "var(--color-primary-text)"
                                : "var(--color-muted-foreground)",
                            cursor: canSave ? "pointer" : "not-allowed",
                        }}
                    >
                        {habit ? "Save changes" : "Create habit"}
                    </button>
                </div>
            </div>
        </div>
    );
}
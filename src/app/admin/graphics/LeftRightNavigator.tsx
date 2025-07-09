'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LeftRightNavigatorProps<T extends { id: string | number }> {
    name: string;
    values: T[];
    selectedId: T['id'] | null;
    onChange: (item: T) => void;
    renderLabel: (item: T) => string;
}

export default function LeftRightNavigator<T extends { id: string | number }>({
    name,
    values,
    selectedId,
    onChange,
    renderLabel,
}: LeftRightNavigatorProps<T>) {
    // Derive current index from selectedId
    const index = values.findIndex((v) => v.id === selectedId);
    const currentItem = index >= 0 ? values[index] : null;

    const handleLeft = () => {
        if (index > 0) {
            onChange(values[index - 1]);
        }
    };

    const handleRight = () => {
        if (index < values.length - 1) {
            onChange(values[index + 1]);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-medium">{name}</h2>
            <div className="flex items-center justify-center gap-6 p-4 bg-white rounded-2xl shadow-sm">
                <button
                    onClick={handleLeft}
                    disabled={index <= 0}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    aria-label="Previous"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="text-lg font-semibold">
                    {currentItem ? renderLabel(currentItem) : '—'}
                </span>

                <button
                    onClick={handleRight}
                    disabled={index === -1 || index >= values.length - 1}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    aria-label="Next"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                <p>{values.length}</p>
            </div>
        </div>
    );
}

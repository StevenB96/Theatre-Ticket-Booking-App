// app/admin/graphics/LeftRightNavigator.tsx

'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function LeftRightNavigator({
    name,
    values,
}: any) {
    const [index, setIndex] = useState(0);

    const handleLeft = () => {
        if (index > 0) setIndex(index - 1);
    };

    const handleRight = () => {
        if (index < values.length - 1) setIndex(index + 1);
    };

    const text = name === 'Theatre' ?
        values[index].name : name === 'Performance' ?
            `${values[index].show.name} - ${values[index].theatre.name}` :
            'Unknown'

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex flex-row">
                <h1 className="text-xl">{name}</h1>
            </div>
            <div className="flex values-center justify-center gap-6 p-6 bg-white rounded-xl">
                <button
                    onClick={handleLeft}
                    disabled={index === 0}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    aria-label="Previous"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <p className="">{text}</p>

                <button
                    onClick={handleRight}
                    disabled={index === values.length - 1}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    aria-label="Next"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

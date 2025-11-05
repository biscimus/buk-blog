"use client";

import React from "react";
import { TransitionTable, Transitions, directions, alphabet } from "../what-is-a-turing-machine/TuringMachine";
import { useState } from "react";

// Tooltip component for Gödel number segments
function GoedelTooltip({
    children,
    content,
    isVisible,
    position
}: {
    children: React.ReactNode;
    content: React.ReactNode;
    isVisible: boolean;
    position: { x: number; y: number };
}) {
    return (
        <div className="relative inline">
            {children}
            {isVisible && (
                <div
                    className="fixed z-50 bg-slate-800 border border-slate-600 rounded-lg p-4 shadow-xl pointer-events-none"
                    style={{
                        left: position.x + 10,
                        top: position.y - 10,
                        transform: 'translateY(-100%)'
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    );
}

export default function GoedelNumber() {

    const [states, setStates] = useState([1, 2]);
    const [transitions, setTransitions] = useState<Transitions>({
        1: {
            "0": { state: 1, alphabet: "0", direction: "L" },
            "1": { state: 1, alphabet: "0", direction: "L" },
            "B": { state: 1, alphabet: "0", direction: "L" }
        }
    });

    const [tooltip, setTooltip] = useState<{
        isVisible: boolean;
        content: React.ReactNode;
        position: { x: number; y: number };
    }>({
        isVisible: false,
        content: null,
        position: { x: 0, y: 0 }
    });

    const [highlightedTransition, setHighlightedTransition] = useState<{
        state: string;
        symbol: string;
    } | null>(null);

    // Generate Gödel number with metadata for tooltips
    const goedelNumberWithMetadata = Object.entries(transitions).flatMap(([stateKey, transition]) =>
        Object.entries(transition).map(([letter, val], letterIndex) => {
            const encoding = [
                parseInt(stateKey),
                alphabet.indexOf(letter as any),
                val.state,
                alphabet.indexOf(val.alphabet),
                directions.indexOf(val.direction)
            ];
            const encodedString = encoding.map(x => "0".repeat(x + 1)).join("1");

            return {
                encodedString,
                metadata: {
                    fromState: `q${stateKey}`,
                    onSymbol: letter,
                    toState: `q${val.state}`,
                    writeSymbol: val.alphabet,
                    direction: val.direction === "L" ? "Left" : val.direction === "R" ? "Right" : "Stay",
                    encoding: encoding
                }
            };
        })
    );

    const handleMouseEnter = (metadata: any, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setHighlightedTransition({
            state: metadata.fromState.replace('q', ''),
            symbol: metadata.onSymbol
        });
        setTooltip({
            isVisible: true,
            position: { x: event.clientX, y: event.clientY },
            content: (
                <div className="text-sm text-slate-200 space-y-2 min-w-64">
                    <div className="font-semibold text-slate-100 border-b border-slate-600 pb-1">
                        Transition Rule
                    </div>
                    <div className="space-y-1">
                        <div><span className="text-slate-400">From state:</span> {metadata.fromState}</div>
                        <div><span className="text-slate-400">Reading:</span> {metadata.onSymbol}</div>
                        <div><span className="text-slate-400">To state:</span> {metadata.toState}</div>
                        <div><span className="text-slate-400">Write:</span> {metadata.writeSymbol}</div>
                        <div><span className="text-slate-400">Move:</span> {metadata.direction}</div>
                    </div>
                </div>
            )
        });
    };

    const handleMouseLeave = () => {
        setTooltip(prev => ({ ...prev, isVisible: false }));
        setHighlightedTransition(null);
    };

    return (
        <div className="flex flex-col lg:flex-row overflow-auto justify-center items-center lg:items-stretch px-6 sm:px-8 lg:px-12 xl:px-16 py-10 bg-slate-900 border border-slate-700 rounded-lg shadow-lg gap-8 min-h-[600px]">
            {/* Transition Table Section */}
            <div className="w-full lg:flex-1 bg-slate-800 border border-slate-600 rounded-lg p-6">
                <h3 className="text-slate-300 text-center mb-4 font-medium">Transition Table</h3>
                <div className="flex justify-center">
                    <TransitionTable
                        states={states}
                        transitions={transitions}
                        setStates={setStates}
                        setTransitions={setTransitions}
                        highlightedTransition={highlightedTransition}
                    />
                </div>
            </div>

            {/* Gödel Number Display */}
            <div className="w-full lg:flex-1 bg-slate-800 border border-slate-600 rounded-lg p-6">
                <h3 className="text-slate-300 text-center mb-6 font-medium">Generated Gödel Number</h3>
                <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 overflow-y-auto max-h-96">
                    <div className="text-slate-200 leading-relaxed text-lg font-mono [&>span]:text-slate-400 [&>span]:font-normal break-all">
                        <span>111</span>
                        {goedelNumberWithMetadata.map((item, index) => (
                            <React.Fragment key={index}>
                                <GoedelTooltip
                                    content={tooltip.content}
                                    isVisible={tooltip.isVisible}
                                    position={tooltip.position}
                                >
                                    <span
                                        className="text-slate-300 hover:text-white hover:bg-slate-600 transition-all duration-200 cursor-help px-1 rounded-sm"
                                        onMouseEnter={(e) => handleMouseEnter(item.metadata, e)}
                                        onMouseLeave={handleMouseLeave}
                                        onMouseMove={(e) => {
                                            if (tooltip.isVisible) {
                                                setTooltip(prev => ({
                                                    ...prev,
                                                    position: { x: e.clientX, y: e.clientY }
                                                }));
                                            }
                                        }}
                                    >
                                        {item.encodedString}
                                    </span>
                                </GoedelTooltip>
                                {index < goedelNumberWithMetadata.length - 1 && <span>11</span>}
                            </React.Fragment>
                        ))}
                        <span>111</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
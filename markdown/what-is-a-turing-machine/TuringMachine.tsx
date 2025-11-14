"use client";

import React, { Dispatch, SetStateAction, useEffect, useState, useCallback } from "react";
import { mono } from "@/app/fonts";
import PreviousMap_ from "postcss/lib/previous-map";

export const directions = ["L", "N", "R"] as const;
export const alphabet = ["0", "1", "B"] as const;
type Direction = typeof directions[number];
type Alphabet = typeof alphabet[number];

type Transition = Record<Alphabet, {
    state: number;
    alphabet: Alphabet;
    direction: Direction;
}>
export type Transitions = Record<string, Transition>

const initialBandLength = 20;
const expansionSize = 10;

// q0 is starting state, q0 is ending state
export default function TuringMachine() {

    const [states, setStates] = useState([1, 2]);
    const [currentState, setCurrentState] = useState(1);
    const [transitions, setTransitions] = useState<Transitions>({
        1: {
            "0": { state: 1, alphabet: "0", direction: "R" },
            "1": { state: 1, alphabet: "0", direction: "N" },
            "B": { state: 1, alphabet: "0", direction: "R" }
        }
    });

    const [band, setBand] = useState(Array<Alphabet>(initialBandLength).fill("B"))
    const [head, setHead] = useState(Math.floor(initialBandLength / 2));
    const [input, setInput] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const bandRef = React.useRef<HTMLDivElement>(null);

    const expandBandIfNeeded = useCallback((currentHead: number, currentBand: Alphabet[], direction: Direction) => {
        let newBand = [...currentBand];
        let newHead = currentHead;
        
        // Expand left if head is too close to left edge
        if (direction === "L" && currentHead <= 2) {
            const leftExpansion = Array<Alphabet>(expansionSize).fill("B");
            newBand = [...leftExpansion, ...newBand];
            newHead = currentHead + expansionSize;
        }
        
        // Expand right if head is too close to right edge
        if (direction === "R" && currentHead >= currentBand.length - 3) {
            const rightExpansion = Array<Alphabet>(expansionSize).fill("B");
            newBand = [...newBand, ...rightExpansion];
        }
        
        return { newBand, newHead };
    }, []);

    const onPlayOneStep = useCallback(() => {
        const { state, alphabet, direction } = transitions[currentState][band[head]];
        if (state === 2) {
            setIsPlaying(false);
            alert("Computation terminated. Output: " + band.slice(head).reduce((prev, curr) => prev += curr, "").replaceAll('B', ''));
            return;
        }

        // Update the band with the new symbol and expand if needed
        setBand(prevBand => {
            const updatedBand = prevBand.map((element, index) => (index !== head) ? element : alphabet);
            const { newBand } = expandBandIfNeeded(head, updatedBand, direction);
            return newBand;
        });

        setCurrentState(state);

        // Calculate new head position considering potential band expansion
        const { newHead } = expandBandIfNeeded(head, band, direction);
        
        if (direction === "L") {
            setHead(Math.max(0, newHead - 1));
        } else if (direction === "R") {
            setHead(newHead + 1);
        } else {
            setHead(newHead);
        }
    }, [band, head, currentState, transitions, setIsPlaying, expandBandIfNeeded]);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(onPlayOneStep, 500);
            return () => clearInterval(interval);
        }
    }, [isPlaying, onPlayOneStep]);

    // Center the head in view whenever head position changes
    useEffect(() => {
        if (bandRef.current) {
            const headElement = bandRef.current.children[head] as HTMLElement;
            if (headElement) {
                headElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }, [head]);

    const onReset = () => {
        setHead(Math.floor(initialBandLength / 2));
        setBand(Array<Alphabet>(initialBandLength).fill("B"));
        setCurrentState(1);
    }

    const onInput = (newInput: string) => {
        if (!/^[01]*$/.test(newInput)) {
            alert("Invalid input: Only 0 and 1 are allowed.");
            return;
        }

        setInput(newInput);
        setBand(() => {
            // Create a band large enough for the input plus some padding
            const requiredLength = Math.max(initialBandLength, newInput.length + 20);
            const newBand = Array<Alphabet>(requiredLength).fill("B");
            const startIndex = Math.floor(requiredLength / 2) - Math.floor(newInput.length / 2);
            newInput.split("").forEach((char, index) => {
                newBand[startIndex + index] = char as Alphabet;
            });
            return newBand;
        });
        // Update head position to start of input
        const requiredLength = Math.max(initialBandLength, newInput.length + 20);
        const startIndex = Math.floor(requiredLength / 2) - Math.floor(newInput.length / 2);
        setHead(startIndex);
    }

    return (
        <div className={`${mono.className} flex flex-col md:flex-row gap-4 justify-stretch`} >
            <div className="flex flex-col p-6 justify-center items-center bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-300 dark:border-slate-600 md:w-[50%]">
                <div className="text-gray-800 dark:text-slate-200 font-medium mb-4 text-lg">Current state: <span className="text-green-600 dark:text-green-400 font-bold">q{currentState}</span></div>
                <div ref={bandRef} className="flex mb-8 mt-2 w-full overflow-auto bg-gray-200 dark:bg-slate-700 rounded-lg p-4 border border-gray-300 dark:border-slate-600">
                    {band.map((element, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="text-xs text-gray-500 dark:text-slate-400 text-center pb-1">{index}</div>
                            <div
                                className={`w-12 h-12 p-2 text-center font-medium transition-all duration-200 ${
                                    index === head 
                                        ? 'bg-green-600 border-2 border-green-400 text-white shadow-lg shadow-green-500/20' 
                                        : 'bg-gray-300 dark:bg-slate-600 border-2 border-gray-400 dark:border-slate-500 text-gray-800 dark:text-slate-200 hover:bg-gray-400 dark:hover:bg-slate-500'
                                }`}
                            >
                                {element !== "B" ? element : ""}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center mb-6 gap-3 w-full max-w-xs">
                    <label className="text-gray-800 dark:text-slate-200 font-medium">Input:</label>
                    <input
                        className="flex-1 bg-gray-200 dark:bg-slate-600 border border-gray-400 dark:border-slate-500 rounded text-center text-gray-800 dark:text-slate-200 py-2 px-3 hover:bg-gray-300 dark:hover:bg-slate-500 focus:ring-1 focus:ring-orange-400 dark:focus:ring-slate-400 focus:border-orange-400 dark:focus:border-slate-400 transition-colors duration-200"
                        placeholder="01-string"
                        value={input}
                        onInput={(e) => onInput((e.target as HTMLInputElement).value)}
                    />
                </div>
                <div className="flex gap-3 flex-wrap justify-center">
                    <button 
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded border border-green-500 transition-colors duration-200 font-medium shadow-lg"
                        onClick={onPlayOneStep}
                    >
                        Play one step
                    </button>
                    <button
                        onClick={() => setIsPlaying((prev) => !prev)}
                        className={`px-4 py-2 rounded font-medium transition-colors duration-200 shadow-lg ${
                            isPlaying 
                                ? 'bg-red-600 hover:bg-red-500 text-white border border-red-500' 
                                : 'bg-green-600 hover:bg-green-500 text-white border border-green-500'
                        }`}
                    >
                        {isPlaying ? 'Stop' : 'Start'}
                    </button>
                    <button 
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded border border-red-500 transition-colors duration-200 font-medium shadow-lg"
                        onClick={onReset}
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center p-6 bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-300 dark:border-slate-600 gap-4 overflow-auto">
                <div className="text-center text-gray-800 dark:text-slate-200 font-medium text-lg">Transition Table</div>
                <TransitionTable states={states} setStates={setStates} transitions={transitions} setTransitions={setTransitions} />
            </div>
        </div >
    )
}

export function TransitionTable({
    states,
    transitions,
    setStates,
    setTransitions,
    highlightedTransition
}: {
    states: number[];
    transitions: Transitions;
    setStates: Dispatch<SetStateAction<number[]>>
    setTransitions: Dispatch<SetStateAction<Transitions>>
    highlightedTransition?: { state: string; symbol: string } | null;
}) {

    const onAddState = () => {
        const newState = states[states.length - 1] + 1;
        setStates(prevStates => [...prevStates, newState]);
        setTransitions(prev => ({
            ...prev,
            [newState]: {
                "0": { state: 1, alphabet: "0", direction: "R" },
                "1": { state: 1, alphabet: "0", direction: "N" },
                "B": { state: 1, alphabet: "0", direction: "R" }
            }
        }));
    }

    const onRemoveState = (state: number) => {
        setTransitions(prev => {
            const newTransitions = { ...prev }; // Create a shallow copy
            delete newTransitions[state]; // Remove the key
            return newTransitions;
        })
        setStates(prev => prev.filter(prevState => prevState !== state));
    }

    return (
        <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4 border border-gray-300 dark:border-slate-600">
            {/* Table header */}
            <div className="grid grid-cols-[60px_1fr_1fr_1fr] gap-2 mb-4 text-sm font-medium">
                <div className="text-gray-600 dark:text-slate-400 text-center my-auto">State</div>
                <div className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 text-center py-2 px-3 rounded border border-gray-300 dark:border-slate-600">0</div>
                <div className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 text-center py-2 px-3 rounded border border-gray-300 dark:border-slate-600">1</div>
                <div className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 text-center py-2 px-3 rounded border border-gray-300 dark:border-slate-600">B</div>
            </div>

            {/* Transition Rows */}
            <div className="grid grid-cols-[60px_1fr_1fr_1fr] gap-2 max-h-[348px] overflow-auto">
                {Object.entries(transitions).map(([state, transition]) => (
                    <React.Fragment key={state}>
                        {/* State Button */}
                        <button
                            className={`relative group bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 border border-gray-300 dark:border-slate-600 rounded py-2 px-3 text-sm transition-colors duration-200 ${Number(state) === 1 ? 'cursor-not-allowed' : ''}`}
                            disabled={Number(state) === 1}
                            onClick={() => onRemoveState(Number(state))}
                        >
                            <span className={`${Number(state) !== 1 ? "group-hover:hidden" : ""} text-gray-800 dark:text-slate-200`}>q{state}</span>
                            <span className={`${Number(state) !== 1 ? "group-hover:inline-block" : ""} hidden text-gray-500 dark:text-slate-400`}>✖</span>
                        </button>

                        {/* Transition Cells */}
                        {alphabet.map(letter => {
                            const isHighlighted = highlightedTransition &&
                                highlightedTransition.state === state &&
                                highlightedTransition.symbol === letter;

                            return (
                                <div
                                    key={letter}
                                    className={`rounded border p-1 space-y-1 transition-all duration-200 ${isHighlighted
                                            ? 'bg-green-700 border-green-500 shadow-lg shadow-green-500/20'
                                            : 'bg-gray-200 dark:bg-slate-700 border-gray-300 dark:border-slate-600'
                                        }`}
                                >
                                    {/* State Select */}
                                    <select
                                        className="w-full bg-gray-300 dark:bg-slate-600 border border-gray-400 dark:border-slate-500 rounded text-center text-gray-800 dark:text-slate-200 text-xs py-1 hover:bg-gray-400 dark:hover:bg-slate-500 focus:ring-1 focus:ring-orange-400 dark:focus:ring-slate-400 focus:border-orange-400 dark:focus:border-slate-400 transition-colors duration-200"
                                        value={transition[letter].state}
                                        onChange={(e) => {
                                            setTransitions(prev => ({
                                                ...prev,
                                                [state]: {
                                                    ...prev[state],
                                                    [letter]: {
                                                        ...prev[state][letter],
                                                        state: parseInt(e.target.value),
                                                    }
                                                }
                                            }));
                                        }}
                                    >
                                        {states.map(stateOption => <option key={stateOption} value={stateOption} className="bg-gray-300 dark:bg-slate-600 rounded-none">q{stateOption}</option>)}
                                    </select>

                                    {/* Alphabet Select */}
                                    <select
                                        className="w-full bg-gray-300 dark:bg-slate-600 border border-gray-400 dark:border-slate-500 rounded text-center text-gray-800 dark:text-slate-200 text-xs py-1 hover:bg-gray-400 dark:hover:bg-slate-500 focus:ring-1 focus:ring-orange-400 dark:focus:ring-slate-400 focus:border-orange-400 dark:focus:border-slate-400 transition-colors duration-200"
                                        value={transition[letter].alphabet}
                                        onChange={(e) => {
                                            setTransitions(prev => ({
                                                ...prev,
                                                [state]: {
                                                    ...prev[state],
                                                    [letter]: {
                                                        ...prev[state][letter],
                                                        alphabet: e.target.value,
                                                    }
                                                }
                                            }));
                                        }}
                                    >
                                        <option value="0" className="bg-gray-300 dark:bg-slate-600 rounded-none">0</option>
                                        <option value="1" className="bg-gray-300 dark:bg-slate-600 rounded-none">1</option>
                                        <option value="B" className="bg-gray-300 dark:bg-slate-600 rounded-none">B</option>
                                    </select>

                                    {/* Direction Select */}
                                    <select
                                        className="w-full bg-gray-300 dark:bg-slate-600 border border-gray-400 dark:border-slate-500 rounded text-center text-gray-800 dark:text-slate-200 text-xs py-1 hover:bg-gray-400 dark:hover:bg-slate-500 focus:ring-1 focus:ring-orange-400 dark:focus:ring-slate-400 focus:border-orange-400 dark:focus:border-slate-400 transition-colors duration-200"
                                        value={transition[letter].direction}
                                        onChange={(e) => {
                                            setTransitions(prev => ({
                                                ...prev,
                                                [state]: {
                                                    ...prev[state],
                                                    [letter]: {
                                                        ...prev[state][letter],
                                                        direction: e.target.value,
                                                    }
                                                }
                                            }));
                                        }}
                                    >
                                        <option value="L" className="bg-gray-300 dark:bg-slate-600 rounded-none">L</option>
                                        <option value="N" className="bg-gray-300 dark:bg-slate-600 rounded-none">N</option>
                                        <option value="R" className="bg-gray-300 dark:bg-slate-600 rounded-none">R</option>
                                    </select>
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>

            {/* Add State Button */}
            <div className="mt-4 flex justify-center">
                <button
                    onClick={onAddState}
                    className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-slate-200 border border-gray-300 dark:border-slate-600 py-2 px-4 rounded transition-colors duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    <span className="text-sm">Add State</span>
                </button>
            </div>
        </div>
    );
}
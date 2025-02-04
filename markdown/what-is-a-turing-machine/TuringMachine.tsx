"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const directions = ["L", "N", "R"] as const;
const alphabet = ["0", "1", "B"] as const;
type Direction = typeof directions[number];
type Alphabet = typeof alphabet[number];

type Transition = Record<Alphabet, {
    state: number;
    alphabet: Alphabet;
    direction: Direction;
}>
type Transitions = Record<number, Transition>

const bandLength = 100;

const foo = "a"
const acceptingWords = Array(6).map((value, index) => foo + index);

// q0 is starting state, q0 is ending state
export default function TuringMachine() {

    const [states, setStates] = useState([0, 1]);
    const [currentState, setCurrentState] = useState(0);
    const [transitions, setTransitions] = useState<Transitions>({
        0: {
            "0": { state: 1, alphabet: "0", direction: "R" },
            "1": { state: 1, alphabet: "0", direction: "N" },
            "B": { state: 1, alphabet: "0", direction: "R" }
        }
    });

    const [band, setBand] = useState(Array<Alphabet>(bandLength).fill("B"))
    const [head, setHead] = useState(50);
    const [input, setInput] = useState("");

    const onPlayOneStep = () => {
        if (head === 0 || head === states.length - 1) return;
        const { state, alphabet, direction } = transitions[currentState][band[head]];
        if (state === 1) {
            setIsPlaying(false);
            alert("Computation terminated. Output: " + band.slice(head).reduce((prev, curr) => prev += curr, "").replaceAll('B', ''));
            return;
        }

        setBand(prevBand => prevBand.map((element, index) => (index !== head) ? element : alphabet));
        setCurrentState(state);

        if (direction === "L") {
            setHead(Math.max(0, head - 1));
        } else if (direction === "R") {
            setHead(Math.min(head + 1, band.length - 1));
        }
    }

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(onPlayOneStep, 500);
            return () => clearInterval(interval);
        }
    }, [isPlaying, onPlayOneStep]);

    const onReset = () => {
        setHead(50);
        setBand(Array<Alphabet>(bandLength).fill("B"));
        setCurrentState(0);
    }

    const onInput = (newInput: string) => {
        if (/^[01]*$/.test(newInput)) {
            setInput(newInput);
            setBand(() => {
                const newBand = Array<Alphabet>(bandLength).fill("B");
                newInput.split("").forEach((char, index) => {
                    newBand[50 + index] = char as Alphabet; // Start inserting characters at the 50th index
                });
                return newBand;
            });
        } else {
            alert("Invalid input: Only 0 and 1 are allowed.");
        }
    }

    return (
        <div className="flex flex-col gap-4 justify-stretch sm:flex-row">
            <div className="flex flex-col p-4 justify-center items-center border-2 rounded-md border-slate-300 w-[50%]">
                <div>Current state: q{currentState}</div>
                <div className="flex mb-8 mt-2 w-full overflow-auto">
                    {band.map((element, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="text-xs text-center pb-1">{index}</div>
                            <div
                                className={`w-12 h-12 bg-slate-300 p-2 text-center text-black ${index === head ? 'border-4 border-green-500' : 'border-4 border-black'}`}
                            >
                                {element !== "B" ? element : ""}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center mb-4 gap-2 w-[50%]">
                    <label>Input: </label>
                    <input
                        className="rounded-sm bg-black text-center border-[1px] border-slate-200"
                        placeholder="01-string"
                        value={input}
                        onInput={(e) => onInput((e.target as HTMLInputElement).value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="text-black bg-green-600 px-2 py-1 rounded-sm" onClick={onPlayOneStep}>
                        Play one step
                    </button>
                    <button
                        onClick={() => setIsPlaying((prev) => !prev)}
                        className={`px-2 py-1 rounded-sm text-black ${isPlaying ? 'bg-red-500' : 'bg-green-600'}`}
                    >
                        {isPlaying ? 'Stop' : 'Start'}
                    </button>
                    <button className="text-black bg-red-500 px-2 py-1 rounded-sm" onClick={onReset}>
                        Reset
                    </button>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center p-4 border-2 rounded-md border-slate-300 gap-4 overflow-auto">
                <div className="text-center">Transition Table</div>
                <TransitionTable states={states} setStates={setStates} transitions={transitions} setTransitions={setTransitions} />
            </div>
        </div >
    )
}

function TransitionTable({
    states,
    transitions,
    setStates,
    setTransitions
}: {
    states: number[];
    transitions: Transitions;
    setStates: Dispatch<SetStateAction<number[]>>
    setTransitions: Dispatch<SetStateAction<Transitions>>
}) {

    const onAddState = () => {
        const newState = states[states.length - 1] + 1;
        setStates((prevStates) => [...prevStates, newState]);
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
        if (state < 2) return;
        setTransitions(prev => {
            const newTransitions = { ...prev }; // Create a shallow copy
            delete newTransitions[state]; // Remove the key
            return newTransitions;
        })
        setStates(prev => prev.filter(prevState => prevState !== state));
    }

    return (
        <div className="text-xs grid grid-cols-[25px_1fr_1fr_1fr] justify-items-center max-h-72 gap-1 overflow-auto">

            <div />
            <div>0</div>
            <div>1</div>
            <div>B</div>

            {Object.entries(transitions).map(([state, transition]) => (
                <React.Fragment key={state}>
                    <button className="relative group inline-block m-auto" disabled={Number(state) === 0} onClick={() => onRemoveState(Number(state))}>
                        <span className={`${Number(state) !== 0 ? "group-hover:hidden" : ""} inline-block`}>q{state}</span>
                        <span className={`${Number(state) !== 0 ? "group-hover:inline-block" : ""} hidden`}>✖</span>
                    </button>
                    {alphabet.map(letter => <div className="flex">
                        <select className="flex-1 bg-slate-600 p-1 text-center [&>option]:text-center" defaultValue={transition[letter].state} onChange={(e) => {
                            setTransitions((prev) =>
                                Object.entries(prev).map(([prevState, transition], index) =>
                                    prevState === state
                                        ? {
                                            ...transition,
                                            [letter]: {
                                                ...transition[letter],
                                                state: parseInt(e.target.value),
                                            },
                                        }
                                        : transition
                                )
                            );
                        }}>
                            {states.map((value, index) => (
                                <option key={value} value={value}>
                                    {index !== 1 ? "q" + value : `q\u0305`}
                                </option>
                            ))}
                        </select>
                        <select className="flex-1 bg-slate-600 p-1 text-center" defaultValue={transition[letter].alphabet} onChange={(e) => {
                            setTransitions((prev) =>
                                Object.entries(prev).map(([prevState, transition], index) =>
                                    prevState === state
                                        ? {
                                            ...transition,
                                            [letter]: {
                                                ...transition[letter],
                                                alphabet: e.target.value as Alphabet,
                                            },
                                        }
                                        : transition
                                )
                            );
                        }}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="B">B</option>
                        </select>
                        <select className="flex-1 bg-slate-600 p-1 text-center" defaultValue={transition[letter].direction} onChange={(e) => {
                            setTransitions((prev) =>
                                Object.entries(prev).map(([prevState, transition], index) =>
                                    prevState === state
                                        ? {
                                            ...transition,
                                            [letter]: {
                                                ...transition[letter],
                                                direction: e.target.value as Direction,
                                            },
                                        }
                                        : transition
                                )
                            );
                        }}>
                            <option value="L">L</option>
                            <option value="N">N</option>
                            <option value="R">R</option>
                        </select>
                    </div>
                    )}
                </React.Fragment>
            ))}
            <button onClick={onAddState}>+</button>
        </div>
    );
}
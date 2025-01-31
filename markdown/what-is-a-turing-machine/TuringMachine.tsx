"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const directions = ["L", "N", "R"] as const;
const alphabet = ["0", "1", "B"] as const;

type Direction = typeof directions[number];
type Alphabet = typeof alphabet[number];
type Transition = {
    [alphabet: string]: {
        state: number;
        alphabet: Alphabet;
        direction: Direction;
    };
};

export default function TuringMachine() {

    const [states, setStates] = useState([0, 1]);
    const [transitions, setTransitions] = useState<Transition[]>([
        {
            "0": { state: 1, alphabet: "0", direction: "R" },
            "1": { state: 1, alphabet: "0", direction: "N" },
            "B": { state: 1, alphabet: "0", direction: "R" }
        }
    ]);

    const [band, setBand] = useState(Array<string>(100).fill("B"))
    const [head, setHead] = useState(50);

    const [input, setInput] = useState("");

    const [currentState, setCurrentState] = useState(0);

    const bandHalfWidth = 3;
    const leftLimit = Math.max(0, head - bandHalfWidth);
    const rightLimit = Math.min(band.length, head + bandHalfWidth + 1);

    const visibleBand = band.slice(leftLimit, rightLimit);

    const onAddState = () => {
        setStates((prevStates) => [...prevStates, prevStates.length]);
        setTransitions(prev => ([
            ...prev,
            {
                "0": { state: 1, alphabet: "0", direction: "R" },
                "1": { state: 1, alphabet: "0", direction: "N" },
                "B": { state: 1, alphabet: "0", direction: "R" }
            }
        ]))
    }

    const onRemoveState = () => {
        if (states.length <= 2) return;
        setTransitions(prev => prev.filter((_, index) => index !== states.length - 1))
        setStates(states.slice(0, -1));
    }

    const onPlayOneStep = () => {

        if (head === 0 || head === states.length - 1) return;
        const input = band[head];
        const { state, alphabet, direction } = transitions[currentState][input];
        if (state === states.length - 1) {
            alert("Computation terminated. Output: " + band.reduce((prev, curr) => prev += curr, "").replaceAll('B', ''));
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
            const interval = setInterval(() => {
                onPlayOneStep();
            }, 700);
            return () => clearInterval(interval);
        }
    }, [isPlaying, onPlayOneStep]);

    const onSetInput = () => {


        setBand(() => {
            const newBand = Array<string>(100).fill("B");
            input.split("").forEach((char, index) => {
                newBand[50 + index] = char; // Start inserting characters at the 50th index
            });
            return newBand;
        });
    }

    return (
        <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <div className="flex flex-col border-2 rounded-md border-slate-300 overflow-hidden">
                <div className="flex flex-col px-4 pt-8 pb-4 justify-center items-center gap-4">
                    <div>Current state: q{currentState}</div>
                    <div className="flex ">
                        {visibleBand.map((element, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="text-xs text-center pb-1">{index + leftLimit}</div>
                                <div
                                    className={`w-12 h-12 bg-slate-300 p-2 text-center text-black ${index + leftLimit === head ? 'border-4 border-green-500' : 'border-4 border-black'}`}
                                    key={index}
                                >
                                    {element === "B" ? "" : element}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center px-4 py-6 gap-4">
                    <div className="flex gap-2 items-center border-[1px] border-slate-200 rounded-sm">
                        <input className="rounded-sm bg-black text-center" placeholder="Input 0-1-string" value={input} onChange={e => {
                            const newInput = e.target.value;
                            if (/^[01]*$/.test(newInput)) {
                                setInput(newInput);
                            } else {
                                alert("Invalid input: Only 0 and 1 are allowed.");
                            }
                        }}></input>
                        <button className="border-l-[1px] border-l-slate-200 px-2" onClick={onSetInput}>Set</button>
                    </div>

                    <div className="flex gap-2 ">
                        <button className="text-black bg-green-600 px-2 py-1 rounded-sm" onClick={onPlayOneStep}>Play one step</button>
                        <button
                            onClick={() => setIsPlaying(prev => !prev)}
                            className={`px-2 py-1 rounded-sm text-black ${isPlaying ? 'bg-red-500' : 'bg-green-600'}`}
                        >
                            {isPlaying ? 'Stop' : 'Start'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center p-4 border-2 rounded-md border-slate-300 gap-4 overflow-auto">
                <div className="flex flex-col gap-2">
                    <div className="text-center">States</div>
                    <div className="flex flex-wrap justify-center gap-1">
                        <button className="text-black h-8 w-8 flex items-center justify-center rounded-sm bg-green-500 hover:bg-green-700" onClick={onRemoveState}>
                            -
                        </button>
                        <div className="text-black min-h-8 min-w-8 px-2 flex items-center justify-center rounded-sm bg-green-500">{states.length}</div>
                        {/* {states.map(state => <State key={state} state={state} setStates={setStates} setTransitions={setTransitions} />)} */}
                        <button className="text-black h-8 w-8 flex items-center justify-center rounded-sm bg-green-500 hover:bg-green-700" onClick={onAddState}>
                            +
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-center">Transitions</div>
                    <TransitionTable states={states} transitions={transitions} setTransitions={setTransitions} />
                </div>
            </div>
        </div >
    )
}

function TransitionTable({
    states,
    transitions,
    setTransitions
}: {
    states: number[];
    transitions: Transition[];
    setTransitions: Dispatch<SetStateAction<Transition[]>>
}) {

    return (
        <div className="text-xs">
            <div className="flex pb-1">
                <div className="w-[5%]" />
                <div className="flex-1 text-center">0</div>
                <div className="flex-1 text-center">1</div>
                <div className="flex-1 text-center">B</div>
            </div>
            <hr />
            <div className="flex flex-col max-h-48 gap-1 mt-1 overflow-auto">
                {transitions.map((transition, state) => (
                    <div key={state} className="flex gap-1 items-center">
                        <div className="flex-1 text-center">q{state}</div>
                        {alphabet.map(letter => <div className="flex">
                            <select className="flex-1 bg-slate-600 p-1 text-center [&>option]:text-center" defaultValue={transitions[state][letter].state} onChange={(e) => {
                                setTransitions((prev) =>
                                    prev.map((transition, index) =>
                                        index === state
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
                                        {index < states.length - 1 ? "q" + value : `q\u0305`}
                                    </option>
                                ))}
                            </select>
                            <select className="flex-1 bg-slate-600 p-1 text-center" defaultValue={transitions[state][letter].alphabet} onChange={(e) => {
                                setTransitions((prev) =>
                                    prev.map((transition, index) =>
                                        index === state
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
                            <select className="flex-1 bg-slate-600 p-1 text-center" defaultValue={transitions[state][letter].direction} onChange={(e) => {
                                setTransitions((prev) =>
                                    prev.map((transition, index) =>
                                        index === state
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
                    </div>
                ))}
            </div>
        </div>
    );
}
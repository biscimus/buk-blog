"use client";

import { Bad_Script } from "next/font/google";
import { setPriority } from "os";
import { Dispatch, MouseEventHandler, ReactEventHandler, SetStateAction, useEffect, useRef, useState } from "react";


// TODO: Configure q1 as final state

const directions = ["L", "N", "R"] as const;
const alphabet = ["0", "1", "B"] as const;

type Direction = typeof directions[number];
type Alphabet = typeof alphabet[number];
type Transition = { state: number, alphabet: Alphabet, direction: Direction };

export default function TuringMachine() {

    const [states, setStates] = useState([0, 1]);
    const [transitions, setTransitions] = useState<Transition[]>([{ state: 1, alphabet: "0", direction: "R" }, { state: 1, alphabet: "0", direction: "N" }]);

    const [band, setBand] = useState(Array<string>(100).fill("B"))
    const [head, setHead] = useState(50);

    const [currentState, setCurrentState] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const bandHalfWidth = 4;

    const leftLimit = Math.max(0, head - bandHalfWidth);
    const rightLimit = Math.min(band.length - 1, head + bandHalfWidth + 1);

    const visibleBand = band.slice(leftLimit, rightLimit);

    console.log("Visilbe band: ", visibleBand);

    const onAddState = () => {
        setStates((prevStates) => [...prevStates, prevStates.length]);
        setTransitions(prev => [...prev, { state: 1, alphabet: "B", direction: "N" }])
    }

    const onRemoveState = () => {
        if (states.length <= 2) return;
        setTransitions(prev => prev.filter((_, index) => index !== states.length - 1))
        setStates(states.slice(0, -1));
    }

    const onPlayOneStep = () => {
        const input = band[head];
        const { state, alphabet, direction } = transitions[currentState];

        console.log("New soll state: ", state);

        setBand(prevBand => prevBand.map((element, index) => (index !== head) ? element : alphabet));

        setCurrentState(prev => state);

        if (direction === "L") {
            setHead(Math.max(0, head - 1));
        } else if (direction === "R") {
            setHead(Math.min(head + 1, band.length - 1));
        }
    }

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                onPlayOneStep();
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isPlaying, onPlayOneStep]);

    console.log("current head: ", head);
    console.log("Current state: ", currentState);
    console.log("States: ", states)
    console.log("Transitions: ", transitions)

    return (
        <div className="flex gap-4">
            <div className="flex flex-col justify-center items-center grow-[3] border-2 rounded-md border-slate-300">
                <div className="flex p-8">
                    {visibleBand.map((element, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="text-xs text-center pb-1">{index + head - bandHalfWidth}</div>
                            <div
                                className={`w-12 h-12 bg-slate-300 p-2 text-center text-black ${index === Math.floor(visibleBand.length / 2) ? 'border-4 border-green-500' : 'border-4 border-black'}`}
                                key={index}
                            >
                                {element}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button className="text-black bg-green-600 px-2 py-1 rounded-sm" onClick={onPlayOneStep}>Play one step</button>
                    <button
                        onClick={() => setIsPlaying(prev => !prev)}
                        className={`px-2 py-1 rounded-sm text-black ${isPlaying ? 'bg-red-500' : 'bg-green-600'}`}
                    >
                        {isPlaying ? 'Stop' : 'Start'}
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center p-4 border-2 rounded-md border-slate-300 grow-[1] gap-4">
                <div className="flex flex-col gap-2">
                    <div className="text-center">States</div>
                    <div className="flex flex-wrap justify-center gap-1">
                        <button className="text-black h-8 w-8 flex items-center justify-center rounded-md bg-green-500 hover:bg-green-700" onClick={onRemoveState}>
                            -
                        </button>
                        <div className="text-black min-h-8 min-w-8 px-2 flex items-center justify-center rounded-md bg-green-500">{states.length}</div>
                        {/* {states.map(state => <State key={state} state={state} setStates={setStates} setTransitions={setTransitions} />)} */}
                        <button className="text-black h-8 w-8 flex items-center justify-center rounded-md bg-green-500 hover:bg-green-700" onClick={onAddState}>
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
        <>
            <div className="flex gap-1">
                <div className="flex-1"></div>
                <div className="flex-1 text-center">0</div>
                <div className="flex-1 text-center">1</div>
                <div className="flex-1 text-center">B</div>
            </div>
            <div className="flex flex-col max-h-48 gap-1 overflow-y-scroll">
                {states.map((state) => (
                    <div key={state} className="flex gap-1 items-center [&>select]:rounded-sm">
                        <div className="flex-1 text-center">q{state}</div>
                        <select className="flex-1 bg-slate-600 p-1 text-center [&>option]:text-center" defaultValue={transitions[state].state} onChange={(e) => {
                            setTransitions((prev) =>
                                prev.map((transition, index) => index !== state ? transition : { ...transition, state: parseInt(e.target.value) })
                            )
                        }}>
                            {states.map((value) => (
                                <option key={value} value={value}>
                                    q{value}
                                </option>
                            ))}
                        </select>
                        <select className="flex-1 bg-slate-600 p-1 text-center" defaultValue={transitions[state].alphabet} onChange={(e) => {
                            setTransitions((prev) =>
                                prev.map((transition, index) => index !== state ? transition : { ...transition, alphabet: e.target.value as Alphabet })
                            )
                        }}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="B">B</option>
                        </select>
                        <select className="flex-1 bg-slate-600 p-1 text-center" defaultValue={transitions[state].direction} onChange={(e) => {
                            setTransitions((prev) =>
                                prev.map((transition, index) => index !== state ? transition : { ...transition, direction: e.target.value as Direction })
                            )
                        }}>
                            <option value="L">L</option>
                            <option value="N">N</option>
                            <option value="R">R</option>
                        </select>
                    </div>
                ))}
            </div>
        </>
    );
}
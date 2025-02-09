"use client";

import React from "react";
import { TransitionTable, Transitions, directions, alphabet } from "../what-is-a-turing-machine/TuringMachine";
import { useState } from "react";

export default function GoedelNumber() {

    const [states, setStates] = useState([0, 1]);
    const [transitions, setTransitions] = useState<Transitions>({
        0: {
            "0": { state: 1, alphabet: "0", direction: "L" },
            "1": { state: 1, alphabet: "0", direction: "L" },
            "B": { state: 1, alphabet: "0", direction: "L" }
        }
    });
    const [goedelNumber, setGoedelNumber] = useState(["0101001010", "01001001010", "010001001010"]);

    const computeGoedelNumber = () => {
        const result = Object.values(transitions).flatMap((transition, iState) =>
            Object.values(transition).map((val, index) =>
                [iState, index, val.state, alphabet.indexOf(val.alphabet), directions.indexOf(val.direction)].map(x => "0".repeat(x + 1)).join("1")
            )
        );
        setGoedelNumber(result);
    }

    return (
        <div className="flex flex-col sm:flex-row overflow-auto justify-evenly items-center px-4 py-8 border-white border-2 rounded-md gap-4">
            <TransitionTable states={states} transitions={transitions} setStates={setStates} setTransitions={setTransitions} />
            <div className="flex flex-col w-full px-4items-stretch gap-4 sm:w-2/5">
                <div className="w-full break-all [&>span]:text-green-600">
                    <span>111</span>
                    {goedelNumber.map((num, index) => (
                        <React.Fragment key={index}>
                            {num}{index < goedelNumber.length - 1 && <span>11</span>}
                        </React.Fragment>
                    ))}
                    <span>111</span>
                </div>
                <button className="bg-green-600 rounded-md px-3 py-1" onClick={computeGoedelNumber}>Compute Gödel Number</button>
            </div>
        </div >
    )
}
"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import functionPlot from "function-plot";
import nerdamer from "nerdamer";
import "nerdamer/Solve";


export default function FunctionPlot() {
    const [k, setK] = useState(1);
    const [intersection, setIntersection] = useState(3.302775637731995);

    useEffect(() => {
        functionPlot({
            target: "#multiple",
            xAxis: { domain: [0, 10] },
            yAxis: { domain: [0, 10] },
            grid: true,
            data: [
                {
                    fn: `${k}(x-1)^2`,
                    color: "turquoise",
                },
                {
                    fn: "x+2",
                    color: "plum",
                },
                {
                    fn: `1000000(x-${intersection})`,
                    color: "red",
                },
            ],
        });
    }, [intersection, k]);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const newK = parseFloat(e.target.value);
        setK(newK);
        // @ts-ignore
        const intersection = Math.max(
            ...nerdamer
                // @ts-ignore
                .solveEquations(`${newK}(x-1)^2=x+2`, "x")
                .map((solution: string) => parseFloat(nerdamer(solution).evaluate().text()))
        );
        setIntersection(intersection);
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-4 md:gap-8 mx-2 my-4">
            <div id="multiple" className="p-4" />
            <div className="flex flex-col items-center gap-4">
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={k}
                    onChange={onChange}
                    placeholder="Set value of k"
                    style={{
                        width: "4rem",
                        flexGrow: "1",
                        writingMode: "vertical-lr",
                        direction: "rtl",
                    }}
                />
                <span style={{ color: "green" }}>k = {k}</span>
            </div>
        </div>
    );
}

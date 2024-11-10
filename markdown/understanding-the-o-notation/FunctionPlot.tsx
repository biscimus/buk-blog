"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import functionPlot from "function-plot";
import nerdamer from "nerdamer";
import "nerdamer/Solve";

// @ts-ignore
nerdamer.set("SOLUTIONS_AS_OBJECT", false);

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
    }, [k]);

    const onCChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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
        <div className="flex justify-center items-stretch gap-8 h-22 my-4">
            <div id="multiple" />
            <div className="flex flex-col items-center gap-4">
                <input
                    type="range"
                    orient="vertical"
                    min="1"
                    max="10"
                    value={k}
                    onChange={onCChange}
                    placeholder="Set value of k"
                    style={{ height: "100%", width: "4rem" }}
                />
                <span style={{ color: "green" }}>k = {k}</span>
            </div>
        </div>
    );
}

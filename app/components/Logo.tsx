"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function Logo() {
    const [widths, setWidths] = useState({ uk: 0, log: 0 }); // Track current widths
    const ukRef = useRef<HTMLSpanElement>(null);
    const logRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
        // Nothing to do here for slideIn since Tailwind will handle it
    };

    const handleMouseLeave = () => {
        // Capture current widths before unhover
        if (ukRef.current && logRef.current) {
            setWidths({
                uk: ukRef.current?.offsetWidth,
                log: logRef.current?.offsetWidth,
            });
        }
    };

    return (
        // Logo
        <></>
    );
}
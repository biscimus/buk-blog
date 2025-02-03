"use client";

import Link from "next/link";
import { mono } from "@/app/fonts";

export default function Logo() {

    return (
        <Link href="/" className={`text-3xl font-bold ${mono.className} group flex`}>
            <span className="animate-bounceSlow group-hover:animate-none">b</span>
            <span className="animate-slideOut group-hover:animate-slideIn overflow-clip">uk</span>
            <span>_</span>
            <span className="animate-bounceSlow group-hover:animate-none">b</span>
            <span className="animate-slideOut group-hover:animate-slideIn overflow-clip">log</span>
        </Link>
    );
}
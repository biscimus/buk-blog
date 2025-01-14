import { IBM_Plex_Mono, IBM_Plex_Serif, IBM_Plex_Sans_KR } from "next/font/google";

export const mono = IBM_Plex_Mono({ weight: "400", subsets: ["latin"], display: "swap" });
export const serif = IBM_Plex_Serif({ weight: "400", subsets: ["latin", "cyrillic"], display: "swap" });
export const korean = IBM_Plex_Sans_KR({ weight: "400", subsets: ["latin"], display: "swap" });

import {
    IBM_Plex_Mono,
    IBM_Plex_Serif,
    IBM_Plex_Sans_KR,
} from "next/font/google";

const mono = IBM_Plex_Mono({ weight: "400", subsets: ["latin"] });
const serif = IBM_Plex_Serif({ weight: "400", subsets: ["latin", "cyrillic"] });
const korean = IBM_Plex_Sans_KR({ weight: "400", subsets: ["latin"] });

export { mono, serif, korean };

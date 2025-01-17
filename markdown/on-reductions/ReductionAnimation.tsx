"use client";

export default function ReductionAnimation() {

    const onReduce = () => {

    }

    return (
        // TODO: finish button
        <div className="flex flex-col m-4 justify-center">
            <svg
                width="400"
                className="block"
                height="300"
                viewBox="0 0 400 300"
                xmlns="http://www.w3.org/2000/svg"
                style={{ backgroundColor: "lightblue", margin: "auto" }}
            >
                {/* Frame */}
                <rect
                    x="20"
                    y="45"
                    width="360"
                    height="240"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                />

                {/* TODO: https://www.softr.io/tools/svg-shape-generator is pretty cool */}
                {/* <defs>                         <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">                            <stop id="stop1" stopColor="rgba(248, 117, 55, 1)" offset="0%"></stop>                            <stop id="stop2" stopColor="rgba(251, 168, 31, 1)" offset="100%"></stop>                        </linearGradient>            </defs>                <path fill="url(#sw-gradient)" d="M6.7,-5.2C12.3,1.7,22.9,4.6,23.1,5.9C23.3,7.1,13.1,6.5,4.8,10.7C-3.4,15,-9.7,24.1,-11.5,23.4C-13.4,22.7,-10.8,12.3,-14.5,1.7C-18.3,-8.9,-28.3,-19.7,-26.9,-25.7C-25.5,-31.6,-12.8,-32.6,-6.1,-27.7C0.6,-22.8,1.1,-12.1,6.7,-5.2Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" stroke="url(#sw-gradient)"></path> */}

                {/* Second yellow shape (static) */}
                <path
                    d="M200 150 
                C 220 100, 250 80, 270 100
                C 300 120, 320 70, 350 120
                C 380 170, 320 200, 350 250
                C 310 280, 250 240, 200 270
                Z"
                    fill="yellow"
                    stroke="black"
                    strokeWidth="2"
                />

                {/* First yellow shape with animation */}
                <path
                    d="M50 150 
                    C 30 100, 70 50, 100 70 
                    C 130 90, 150 30, 170 70 
                    C 190 110, 120 180, 170 200
                    C 120 250, 80 220, 50 250
                    Z"
                    fill="yellow"
                    stroke="black"
                    strokeWidth="2"
                >
                    <animate
                        attributeName="d"
                        dur="6s"
                        repeatCount="indefinite"
                        fill="freeze"
                        keyTimes="0; 0.2; 0.5; 1"
                        values="
                        M50 150 
                        C 30 100, 70 50, 100 70 
                        C 130 90, 150 30, 170 70 
                        C 190 110, 120 180, 170 200
                        C 120 250, 80 220, 50 250
                        Z;

                        M50 150 
                        C 30 100, 70 50, 100 70 
                        C 130 90, 150 30, 170 70 
                        C 190 110, 120 180, 170 200
                        C 120 250, 80 220, 50 250
                        Z;
                        
                        M290 190 
                        C 290 185, 310 185, 310 190 
                        C 310 195, 290 195, 290 190 
                        C 290 185, 310 185, 310 190 
                        C 310 195, 290 195, 290 190 
                        Z;
                        
                        M290 190 
                        C 290 185, 310 185, 310 190 
                        C 310 195, 290 195, 290 190 
                        C 290 185, 310 185, 310 190 
                        C 310 195, 290 195, 290 190 
                        Z;"
                    />
                    <animate
                        attributeName="fill"
                        dur="6s"
                        repeatCount="indefinite"
                        fill="freeze"
                        keyTimes="0; 0.2; 0.5; 1"
                        values="yellow; yellow; orange; orange"
                    />
                </path>

                <text x="200" y="30" fontFamily="IBM Plex Serif" fontSize="20">{"Σ*"}</text>
                <text x="90" y="140" fontFamily="IBM Plex Serif" fontSize="20">A
                    <animate attributeName="x" dur="6s" keyTimes="0; 0.2; 0.5; 1" values="90; 90; 295; 295" fill="freeze" repeatCount="indefinite" />
                    <animate attributeName="y" dur="6s" keyTimes="0; 0.2; 0.5; 1" values="140; 140; 180; 180" fill="freeze" repeatCount="indefinite" />
                </text>
                <text x="270" y="140" fontFamily="IBM Plex Serif" fontSize="20">B</text>
            </svg>
            <button onClick={onReduce}>Reduce!</button>
        </div>
    )
}
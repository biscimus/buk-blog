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
                    x="10"
                    y="10"
                    width="380"
                    height="280"
                    fill="none"
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
                        keyTimes="0; 0.5; 1"
                        values="
                        M50 150 
                        C 30 100, 70 50, 100 70 
                        C 130 90, 150 30, 170 70 
                        C 190 110, 120 180, 170 200
                        C 120 250, 80 220, 50 250
                        Z;
                        
                        M70 170 
                        C 70 165, 90 165, 90 170 
                        C 90 175, 70 175, 70 170 
                        C 70 165, 90 165, 90 170 
                        C 90 175, 70 175, 70 170 
                        Z;
                        
                        M70 170 
                        C 70 165, 90 165, 90 170 
                        C 90 175, 70 175, 70 170 
                        C 70 165, 90 165, 90 170 
                        C 90 175, 70 175, 70 170 
                        Z"
                    />
                    <animate
                        attributeName="fill"
                        dur="6s"
                        repeatCount="indefinite"
                        fill="freeze"
                        keyTimes="0; 0.5; 1"
                        values="yellow; orange; orange"
                    />
                </path>

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

                {/* Orange ball inside the second shape */}
                <path
                    d="M290 190 
                C 290 185, 310 185, 310 190 
                C 310 195, 290 195, 290 190 
                C 290 185, 310 185, 310 190 
                C 310 195, 290 195, 290 190 
                Z"
                    fill="orange"
                    stroke="black"
                    strokeWidth="2"
                />

                <text x="170" y="30" fontFamily="Arial" fontSize="20" fill="black">{`{0,1}*`}</text>
                <text x="90" y="140" fontFamily="Arial" fontSize="20" fill="black">A</text>
                <text x="270" y="140" fontFamily="Arial" fontSize="20" fill="black">B</text>
            </svg>
            <button onClick={onReduce}>Reduce!</button>
        </div>
    )
}
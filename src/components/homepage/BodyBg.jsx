import { memo } from "react";

const BodyBg = memo(({ canvasRef, ready }) => {
    return <canvas ref={canvasRef} className={`absolute top-0 left-0 bg-transparent ${ready && "animate-canvasFadeIn"} -z-20`}></canvas>
})

export default BodyBg;
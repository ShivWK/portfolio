import { useEffect, useRef, useState } from "react";
import useIntersection from "../../../utils/IntersectionObserver";

const GithubStats = ({ isSmall }) => {
    const [ready, setReady] = useState(false);
    const containerRef = useRef(null);
    useIntersection(containerRef, setReady);

    return <div ref={containerRef} className={`flex flex-col items-center gap-6 lg:gap-8 mx-auto lg:max-w-[1024px] max-lg:px-3 transform ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-400 ease-linear`}>
        <h3 className="self-start text-2xl lg:text-3xl w-fit font-bold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Github Stats</h3>

        <div className="flex items-center justify-center">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4">
                <img src="https://github-readme-streak-stats.herokuapp.com/?user=ShivWK&theme=highcontrast&border_color=53eafd&bg_color=011026" />

                <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=ShivWK&layout=compact&theme=highcontrast&show_icons=true&title_color=53eafd&border_color=53eafd&bg_color=011026&card_width=500px" />
            </div>
        </div>
        <div className="hidden lg:block">
            <img className="-z-50" src={`https://github-readme-activity-graph.vercel.app/graph?username=ShivWK&theme=react-dark&color=ffffff&border_color=53eafd&point=53eafd&radius=16&height=${isSmall ? 500 : 350}&from=2024-14-20`} />
        </div>
    </div>
}

export default GithubStats
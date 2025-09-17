import { useEffect, useRef, useState } from "react";
import TutorialCard from "./TutorialCard";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { tutorial } from "../../../utils/TutorialData";

const Tutorials = () => {
    const isSmall = window.innerWidth <= 768;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stopScroll, setStopScroll] = useState(false);
    const stopScrollRef = useRef(stopScroll);
    const totalCount = tutorial.length;
    const dotArray = Array.from({ length: totalCount }, (_, i) => i);

    useEffect(() => {
        stopScrollRef.current = stopScroll;
    }, [stopScroll])
    
    useEffect(() => {
        if (stopScroll) {
            const timer = setTimeout(() => {
                setStopScroll(false);
            }, 60000)

            return () => clearTimeout(timer);
        }
    }, [stopScroll]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (stopScrollRef.current) return;

            setCurrentIndex((prv) => {
                if (prv === (tutorial.length - 1)) return 0;
                return prv + 1;
            })
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const leftButtonClick = () => {
        setCurrentIndex(prv => {
            if (prv === 0) {
                return totalCount - 1;
            } else {
                return prv - 1;
            }
        });

        setStopScroll(true);
    }

    const rightButtonClick = () => {
        setCurrentIndex(prv => {
            if (prv === (totalCount - 1)) {
                return 0;
            } else {
                return prv + 1;
            }
        })

        setStopScroll(true);
    }

    const Dot = ({ index }) => {
        const clickHandler = () => {
            setCurrentIndex(index);
            setStopScroll(true);
        }

        return <span onClick={clickHandler} className={`h-2.5 w-2.5 cursor-pointer rounded-full border border-[rgb(3,165,252)] ${currentIndex === index && "bg-[rgb(3,165,252)] shadow-[0_0_5px_1px_rgba(3,165,252,0.6)]"}`}></span>
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <h2 className="text-3xl lg:text-4xl w-fit font-semibold font-heading tracking-wide text-transparent justify-self-start bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-5 lg:mb-12 self-start">
                Sharing Knowledge
            </h2>
            <div className="flex flex-col max-lg:gap-8 lg:flex-row items-center justify-between">
                <div className="basis-[45%] text-justify lg:text-center lg:text-lg tracking-wider font-medium font-conten">
                    <p>I regularly share JavaScript tips, tutorials, and insights on LinkedIn. Here’s a collection of my posts to help fellow developers learn and grow</p>
                </div>
                <div className="relative w-full basis-full lg:basis-[50%] shrink-0 flex flex-col gap-6">
                    <div className="h-[27rem] lg:h-[31rem]">
                        <button onClick={leftButtonClick} className="absolute left-0 top-1/2 -translate-y-1/2 max-lg:bg-blue-950 lg:backdrop-blur-sm rounded-full  shadow-[0_0_15px_2px_rgba(3,165,252,0.6)] cursor-pointer active:scale-90 active:shadow-[0_0_5px_1px_rgba(3,165,252,0.6)] transition-all duration-150 ease-linear z-30"><CircleArrowLeft size={35} /></button>

                        <div className="relative lg:w-[80%] w-full h-full mx-auto">
                            {tutorial.map((data, index) => {
                                const show = currentIndex === index;
                                return <TutorialCard key={index} index={index} cardData={data} show={show} />
                            })}
                        </div>

                        <button onClick={rightButtonClick} className="absolute right-0 top-1/2 -translate-y-1/2 max-lg:bg-blue-950 lg:backdrop-blur-sm rounded-full  shadow-[0_0_15px_2px_rgba(3,165,252,0.6)] cursor-pointer active:scale-90 active:shadow-[0_0_5px_1px_rgba(3,165,252,0.6)] transition-all duration-150 ease-linear"><CircleArrowRight size="35" /></button>
                    </div>
                    <div id="dots" className="w-fit mx-auto flex gap-3">
                        {dotArray.map((_, index) => <Dot key={index} index={index} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tutorials;
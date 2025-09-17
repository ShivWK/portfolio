import { useEffect, useRef } from "react";
import { tutorial } from "../../../utils/TutorialData";
import TutorialCard from "./TutorialCard";

const TutorialsCarousel = ({ currentIndex, setCurrentIndex, stopScroll }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const children = containerRef.current.children;
            console.log(children);

            const timer = setInterval(() => {
                setCurrentIndex((prv) => {
                    if (stopScroll) return;

                    if (prv === (children.length - 1)) return 0;
                    return prv + 1;
                })
            }, 3000);

            return () => clearInterval(timer);
        }
    }, []);

    console.log(currentIndex)

  return (
    <div ref={containerRef} className='lg:w-[80%] w-full h-full mx-auto'>
        {
            tutorial.map((data, index) => {
                const show = currentIndex === index;
                return <TutorialCard key={index} index={index} cardData={data} show={show} />
            })
        }
    </div>
  )
}

export default TutorialsCarousel
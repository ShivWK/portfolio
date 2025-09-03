import { useState, useEffect, useRef } from "react";
import HeroSection from "./backgrounds/HeroSection";
import BodySection from "./backgrounds/BodySection";

const Home = () => {
    const [scrollOffset, setScrollOffset] = useState(0);
    const lastClientHeight = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentClientHeight = window.scrollY;

            if (lastClientHeight.current < currentClientHeight) {
                //scrolled down
                setScrollOffset(-100);
            } else {
                // SCROLLED UP
                setScrollOffset(100);
            }
            lastClientHeight.current = currentClientHeight;
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // console.log(scrollOffset);

    return <main>
        <HeroSection scrollOffset={scrollOffset} />
        <BodySection scrollOffset={scrollOffset} />
    </main>
}

export default Home;
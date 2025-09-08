import { useEffect, useLayoutEffect, useRef, useState } from "react";
import HeroSection from "./HeroSection";
import BodySection from "./BodySection";

const Home = () => {
    const [scrollOffset, setScrollOffset] = useState(0);
    const lastClientHeight = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentClientHeight = window.scrollY;

            if (lastClientHeight.current < currentClientHeight) {
                setScrollOffset(-100);
            } else {
                setScrollOffset(100);
            }
            lastClientHeight.current = currentClientHeight;
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <main id="main" className="relative bg-[linear-gradient(135deg,#000000_0%,#01111a_40%,#011d3a_70%,#021120_100%)] -z-10">
        <HeroSection scrollOffset={scrollOffset} />
        <BodySection scrollOffset={scrollOffset} />
    </main>
}

export default Home;
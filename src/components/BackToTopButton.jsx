import { useEffect, useState } from "react";

const BackToTopButton = ({ extraMargin = false }) => {
    const [showBtn, setShowBtn] = useState(false);

    const clickHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        const scrollHandler = () => {
            const HTML = document.documentElement;
            const windowScrollTop = HTML.scrollTop;

            const hasScrolledALot = windowScrollTop >= Math.max(HTML.clientHeight * 2.2, 500);

            if (hasScrolledALot) setShowBtn(true);
            else setShowBtn(false)
        }

        window.addEventListener("scroll", scrollHandler)
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [])

    return <button onClick={clickHandler} className={`fixed flex items-center justify-center gap-1 left-1/2 -translate-x-1/2 bottom-5 bg-[#03336698] border border-blue-400 text-white py-1.5 px-2 rounded-md text-sm cursor-pointer transform transition-all duration-200 ease-linear font-semibold ${showBtn ? "translate-y-o" : "translate-y-[500%]"}`}>
        <i className="ri-arrow-up-circle-line font-extralight text-xl"></i>
        <p className="">Back to top</p>
        </button>
}

export default BackToTopButton;
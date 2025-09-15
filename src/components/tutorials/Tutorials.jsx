import { Repeat, Heart } from "lucide-react";

const Tutorials = () => {
    const isSmall = window.innerWidth <= 768;

    return (
        <div className="relative rounded-xl overflow-hidden lg:w-[40%] w-full h-[27rem] lg:h-[31rem]">
            <img src="/tutorials/Axios.png" alt="Axios VS Fetch tutorial" className="h-full w-full cursor-pointer" />
            <div className="absolute bottom-0 left-0 w-full bg-black/80 z-40 rounded-tl-xl p-3">
                <div className="absolute -top-7 md:-top-8 right-0 px-2 py-1 font-medium tracking-wide bg-black/80 rounded-t-xl flex items-center gap-2 max-md:text-sm">
                    <i
                        onMouseEnter={() => hoverHandler("rgba(41,140,240)")}
                        onMouseOut={() => setHovered(false)}
                        onClick={() => clickHandler("rgba(41,140,240)")}
                        className="fa-brands fa-linkedin text-xl  text-[rgb(41,140,240)] hover:text-black"
                    ></i>
                    <Heart fill="red" size={isSmall ? 15 : 20} className="text-red-600" />
                    <span>400</span>
                    <Repeat size={isSmall ? 15 : 20} className="text-[#53eafd]" />
                    <span>100</span>
                </div>
                <img src="/testimonials/axios.png" alt="testimonal" className="rounded-md" />
            </div>
        </div>
    )
}

export default Tutorials;
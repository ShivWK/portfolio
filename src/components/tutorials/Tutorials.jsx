import { Repeat, Heart } from "lucide-react";

const Tutorials = () => {
    return (
        <div className="relative rounded-xl overflow-hidden lg:w-[40%] w-full h-[27rem] lg:h-[31rem]">
            <img src="/tutorials/Axios.png" alt="Axios VS Fetch tutorial" className="h-full w-full cursor-pointer" />
            <div className="absolute bottom-0 left-0 w-full bg-black/80 z-40 rounded-tl-xl p-3">
                <div className="absolute -top-8 right-0 px-2 py-1 font-medium tracking-wide bg-black/80 rounded-t-xl flex items-center gap-2">
                    <Heart fill="red" className="text-red-600" />
                    <span>400</span>
                    <Repeat className="text-[#53eafd]" />
                    <span>100</span>
                </div>
                <img src="/testimonials/axios.png" alt="testimonal" className="rounded-md" />
            </div>
        </div>
    )
}

export default Tutorials;
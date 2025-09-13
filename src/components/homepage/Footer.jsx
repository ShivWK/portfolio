const Footer = ({ reference }) => {
    return <footer ref={reference} className="flex items-center justify-center h-24 lg:h-40 overflow-hidden">
            <svg
            className="h-full w-full"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
        >

            <defs>
                <path
                    id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
            </defs>

            <g className="parallax">
                <use
                    xlinkHref="#gentle-wave"
                    x="48"
                    y="0"
                    fill="rgba(0,153,255,0.7)"
                />

                <use
                    xlinkHref="#gentle-wave"
                    x="48"
                    y="3"
                    fill="rgba(0,153,255,0.5)"
                />

                <use
                    xlinkHref="#gentle-wave"
                    x="48"
                    y="5"
                    fill="rgba(0,153,255,0.3)"
                />

                <use
                    xlinkHref="#gentle-wave"
                    x="48"
                    y="7"
                    fill="rgba(0,153,255,0.5)"
                />
            </g>
        </svg>

        <p className="absolute bottom-3 text-center hidden lg:block font-medium text-white tracking-wider font-footer">Background crafted with Vanilla JavaScript, CSS and HTML.</p>

        <p className="absolute bottom-3 text-center lg:hidden font-medium text-white tracking-wider font-footer">BG crafted with Vanilla JS, CSS & HTML.</p>

    </footer>
}

export default Footer;
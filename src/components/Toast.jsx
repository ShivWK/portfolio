const Toast = ({ showToast, message, error }) => {
    return <div className={`fixed ${ showToast ? "bottom-8 lg:bottom-10" : "-bottom-12"} left-1/2 -translate-x-1/2 lg:max-w-[30%] max-w-[80%] py-2 px-3 rounded-lg font-medium tracking-wide font-heading border-2 text-gray-100 text-center ${error ? "border-red-500 bg-red-500/30 shadow-[0_0_15px_2px_rgba(0,153,255,0.5)]" : "border-green-600 bg-green-500/50 shadow-[0_0_8px_4px_rgba(0,153,255,0.5)]"}
    transition-all duration-150 ease-in-out`}>
        {message}
    </div>
}

export default Toast;
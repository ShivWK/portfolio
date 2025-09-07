const GithubStats = ({ size }) => {
    return <div className=" lg:my-1 mx-auto lg:w-[1024px] max-lg:px-3">
        <h3 className="text-2xl lg:text-3xl w-fit font-semibold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Github Stats</h3>

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4 my-6 lg:my-8">
            <img src="https://github-readme-streak-stats.herokuapp.com/?user=ShivWK&theme=radical" />
            <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=ShivWK&layout=compact&theme=radical" />
        </div>
        <div className="backdrop-blur-xl my-6 lg:my-8">
            <img src={`https://github-readme-activity-graph.vercel.app/graph?username=ShivWK&theme=github-compact&color=ffffff&border_color=51a2ff&point=51a2ff&radius=16&height=${size === "small" ? 500 : 350}&from=2024-14-20`} />
        </div>

    </div>
}

export default GithubStats
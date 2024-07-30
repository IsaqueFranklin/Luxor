const ProblemSection = () => {
    return (
        <section className="relative max-w-5xl mx-auto py-4 px-4 md:px-8 mt-8 lg:mt-16 border-b border-blue-600">
            <div className="absolute top-0 left-0 w-full h-full"></div>
            <div className="relative z-10 gap-5 items-center lg:flex">
                <div className="flex-1 max-w-5xl py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
                    <h3 className="text-3xl font-semibold md:text-4xl">
                        Você aprendeu do jeito errado. <span className="text-transparent bg-clip-text bg-blue-600">É possível aprender com diversão.</span>
                    </h3>
                    <p className="leading-relaxed mt-6">
                    This devalues the currency, causing inflation and reducing your purchasing power. Bitcoin offers a solution as a decentralized, finite currency. Embrace Bitcoin today, it's the ultimate solution for true financial freedom.                    
                    </p>
                    <a className="hover:no-underline" href="/signup">
                        <button className="px-3 py-3 mt-6 rounded-lg w-full font-semibold text-sm duration-150 btn bg-blue-600 text-white">
                            Quero aprender me divertindo!
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </a>
                </div>
                <div className="flex-1 mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
                    <img 
                        src="https://www.icegif.com/wp-content/uploads/2023/10/icegif-620.gif" 
                        alt="" 
                        className="w-full rounded-xl" 
                    />
                </div>
            </div>
        </section>
    )
}

export default ProblemSection
const CTA = () => {
    return (
        <section className="relative max-w-5xl mx-auto py-4 px-4 md:px-8 mt-8 lg:mt-16 mb-8 border-b border-blue-600">
            <div className="absolute top-0 left-0 w-full h-full"></div>
            <div className="relative z-10 gap-5 items-center lg:flex">
                <div className="flex-1 mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
                    <img 
                        src="https://i.pinimg.com/originals/96/bb/ba/96bbbaecbe996339fc75a3de5f8ef9e2.gif" 
                        alt="Aprenda do jeito certo" 
                        className="w-full rounded-xl" 
                    />
                </div>
                <div className="flex-1 max-w-5xl py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
                    <h3 className="text-3xl font-bold md:text-4xl">
                        Aprenda gramática de forma fácil <span className="text-transparent bg-clip-text bg-blue-600">e do jeito certo.</span>
                    </h3>
                    <p className="leading-relaxed mt-6">
                        Discover how Bitcoin can serve as a reliable store of value. Our platform provides essential resources and step-by-step guides to help you understand and utilize Bitcoin for preserving your wealth. 
                    </p>
                    <a className="hover:no-underline" href="/signup">
                        <button className="px-3 py-3 mt-6 rounded-lg w-full font-semibold text-sm duration-150 btn bg-blue-600 text-white">
                            Começar minha jornada agora
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default CTA
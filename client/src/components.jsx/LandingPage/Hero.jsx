import React from 'react'

const Hero = () => {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between">
      <section>
            <div className="max-w-screen-xl mx-auto px-4 py-8 lg:pt-28 gap-12 md:px-8">
                <div className="space-y-6 lg:space-y-8 max-w-4xl mx-auto text-center">
                    <h1 className="text-md text-blue-500 font-medium">
                        O melhor aplicativo de gramática.
                    </h1>
                    <h2 className="text-3xl lg:text-5xl font-extrabold mx-auto md:text-5xl">
                        Aprenda gramática de <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500">um jeito divertido.</span>
                    </h2>
                    <p className="max-w-2xl mx-auto lg:text-lg">
                        Discover our comprehensive directory of resources designed to help beginners navigate the Bitcoin world with ease. Start your Bitcoin journey today! 
                    </p>
                    <div className="items-center justify-center gap-4 space-x-4 space-y-3 sm:flex sm:space-y-0">
                        <a className="hover:no-underline" href="/cadastro"><button className="btn bg-blue-600 py-2 px-4 text-white">Começar agora</button></a>
                        <a className="hover:no-underline" target="_blank"><button className="btn btn-netrual py-2 px-4">Como funciona</button></a>
                    </div>
                </div>
                <div className="mt-14">
                    <img src="https://i.pinimg.com/originals/2d/6e/2d/2d6e2d241d23c273848a61ec5878eb49.gif" className="w-full shadow-lg rounded-lg" alt="" />
                </div>
            </div>
        </section>
      </div>
  )
}

export default Hero
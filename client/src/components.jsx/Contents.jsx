import React from 'react'
import { Link } from 'react-router-dom'

export default function Contents({ contents }){

    return (
        <>
        <div className='carousel gap-8 max-w-full lg:max-w-7xl'>
            {contents?.length > 0 && contents?.map((content, key) => {
                return(
                    <div key={key}>
                    <Link to={'/conteudo/'+content._id} key={key} id={key} className='carousel-item'>
                        <div className="artboard w-64 h-96 md:phone-1 relative max-w-xl mx-auto mt-20">
                            <img className="h-full w-full object-cover rounded-md" src={content.photos?.[0]} alt="Random image" />
                            <div className="absolute inset-0 bg-gray-700 opacity-30 rounded-md"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="my-auto mx-auto items-center justify-center px-4">
                                    <h2 className="text-white text-xl md:text-3xl font-bold">{content.title}</h2>
                                    <p className="text-white font-semibold">{content.description}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    </div>
                )
            })}
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
            {contents.length > 0 && contents.map((content, key) => {
                return (
                    <a href={"#"+key} key={key} className="btn btn-xs">{key+1}</a> 
                )
            })}
        </div>
    </>
    )
}
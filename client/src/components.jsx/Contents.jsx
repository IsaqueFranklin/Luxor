import React from 'react'
import { Link } from 'react-router-dom'

export default function Contents({ contents }){

    return (
        <>
        <div className='carousel gap-8 max-w-full lg:max-w-7xl'>
            {contents?.length > 0 && contents?.map((content, key) => {
                return(
                    <>
                    <Link to={'/modulo/'+content._id} key={key} id={key} className='carousel-item'>
                        <div class="artboard phone-1 relative max-w-xl mx-auto mt-20">
                            <img class="h-full w-full object-cover rounded-md" src={'http://localhost:5000/uploads/'+content.photos?.[0]} alt="Random image" />
                            <div class="absolute inset-0 bg-gray-700 opacity-30 rounded-md"></div>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div className="my-auto mx-auto items-center justify-center">
                                    <h2 class="text-white text-3xl font-bold">{content.title}</h2>
                                    <p>{content.description}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    </>
                )
            })}
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
            {contents.length > 0 && contents.map((content, key) => {
                return (
                    <a href={"#"+key} className="btn btn-xs">{key}</a> 
                )
            })}
        </div>
    </>
    )
}
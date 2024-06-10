import React from 'react'
import { Link } from 'react-router-dom'

export default function Modules({ modules }){

    return (
        <div className='mt-20'>
        <div className='flex gap-4'>
            <h2 className="text-3xl font-semibold mb-0">{modules[0]?.groupTag}</h2>
            <Link to={'/edit-group/'+modules[0]?.group}><button className='btn btn-active'>Editar grupo</button></Link>
        </div>
        <div className='carousel gap-8 max-w-full lg:max-w-7xl'>
            {modules?.length > 0 && modules?.map((module, key) => {
                return(
                    <div key={key}>
                    <Link to={'/modulo/'+module._id} id={key} className='carousel-item'>
                        <div className="artboard phone-1 relative max-w-xl mx-auto mt-8">
                            <img className="h-full w-full object-cover rounded-md" src={'http://localhost:5000/uploads/'+module.photos?.[0]} alt="Random image" />
                            <div className="absolute inset-0 bg-gray-700 opacity-30 rounded-md"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="my-auto mx-auto items-center justify-center">
                                    <h2 className="text-white text-3xl font-bold">{module.title}</h2>
                                    <p>{module.description}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    </div>
                )
            })}
            {}
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
            {modules.length > 0 && modules.map((module, key) => {
                return (
                    <a href={"#"+key} key={key} className="btn btn-xs">{key+1}</a> 
                )
            })}
        </div>
    </div>
    )
}
import React from 'react'

const CreateContent = () => {

    if(createModule){
        return (
            <div className='my-auto mx-auto items-center mt-12 max-w-4xl'>
                <form onSubmit={saveModule}>
                    <h2 className='text-2xl mt-4 mb-4'>Título do seu módulo</h2>
                    <input type="text" value={moduleTitle} onChange={ev => setModuleTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

                    <h2 className='text-2xl mt-12 mb-4'>Descrição do seu módulo</h2>
                    <input type="text" value={moduleDescription} onChange={ev => setModuleDescription(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 

                    <h2 className='text-2xl mt-12 mb-4'>Foto de capa do seu módulo</h2>
                    <PhotosUploader addedPhotos={moduleAddedPhotos} onChange={setModuleAddedPhotos} />

                    <div className='mb-10 mt-12'>
                        <button className='py-2 px-4 w-full rounded rounded-lg bg-[#0047AB] text-white hover:bg-white hover:text-black my-4 mb-20'>Publicar</button>
                    </div>
                </form>
            </div>
        )
    }
    
    return (
        <div>CreateModule</div>
    )
}

export default CreateContent
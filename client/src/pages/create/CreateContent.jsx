import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import PhotosUploader from '../../components.jsx/PhotosUploader';
import axios from "axios";

const CreateContent = ({ onChange }) => {
    
    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [contentTitle, setContentTitle] = useState('');
    const [contentDescription, setContentDescription] = useState('');
    const [contentContent, setContentContent] = useState('')
    const [contentAddedPhotos, setContentAddedPhotos] = useState([]);

    const [redirect, setRedirect] = useState(false);

    async function saveContent(ev){
        ev.preventDefault();

        const conteudoPostData = {
            contentTitle, contentDescription, contentAddedPhotos, dia:new Date()
        }

        try {
            if(user?.admin){
                if(id){
                    await axios.post('/criar-conteudo', {
                        id, ...conteudoPostData
                    })
                    setRedirect(true);
                } else {
                    await axios.post('/criar-conteudo', {
                        ...conteudoPostData
                    })
                    setRedirect(true);
                }
            } else {
                console.log("Você não é admim.")
                alert("Você não é admim.")
            }
        } catch (err) {
            console.log(err)
        }

    }

    if(redirect){
        window.location.reload()
    }

    return (
        <div className='my-auto mx-auto items-center mt-12 max-w-4xl px-8'>
            <button onClick={() => onChange(false)} className='btn btn-active'>
                ⬅️ Voltar
            </button>
            <form onSubmit={saveContent}>
                <h2 className='text-2xl mt-4 mb-4'>Título do seu conteúdo</h2>
                <input className="input input-ghost w-full max-w-xs" type="text" value={contentTitle} onChange={ev => setContentTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

                <h2 className='text-2xl mt-12 mb-4'>Descrição do seu conteúdo</h2>
                <input className="input input-ghost w-full max-w-xs" type="text" value={contentDescription} onChange={ev => setContentDescription(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 

                <h2 className='text-2xl mt-12 mb-4'>Foto de capa do seu conteúdo</h2>
                <PhotosUploader addedPhotos={contentAddedPhotos} onChange={setContentAddedPhotos} />

                <div className='mb-10 mt-12'>
                    <button className='btn btn-info py-2 px-4 w-full'>Publicar</button>
                </div>
            </form>
        </div>
    )
}

export default CreateContent
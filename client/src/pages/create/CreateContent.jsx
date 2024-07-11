import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import PhotosUploader from '../../components.jsx/PhotosUploader';
import axios from "axios";
import PdfUploader from '../../components.jsx/PdfUploader';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const CreateContent = ({ onChange }) => {
    
    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();
    const location = useLocation()

    const [contentTitle, setContentTitle] = useState('');
    const [contentDescription, setContentDescription] = useState('');
    const [contentContent, setContentContent] = useState('')
    const [contentAddedPhotos, setContentAddedPhotos] = useState([]);
    const [videoUrl, setVideoUrl] = useState('');
    const [pdfUrl, setPdfUrl] = useState([]);
    const [conjunto, setConjunto] = useState('')

    const [redirect, setRedirect] = useState(false);
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    useEffect(() => {
        if(!id){
            return
        }

        axios.get('/content/'+id).then(response => {

            const {data} = response;
            setContentTitle(data.title)
            setContentDescription(data.description)
            setContentContent(data.content)
            setContentAddedPhotos(data.photos)
            setVideoUrl(data.videoUrl)
            setPdfUrl(data.pdfUrl)
            setConjunto(data.conjunto)
            //console.log(location.pathname === '/conteudo/'+id)
        })

    }, [id])

    async function saveContent(ev){
        ev.preventDefault();

        const conteudoPostData = {
            contentTitle, contentDescription, contentAddedPhotos, videoUrl, pdfUrl, contentContent, dia:new Date()
        }

        try {
            if(user?.admin){
                if(id && location.pathname === '/conteudo/'+id){
                    await axios.put('/criar-conteudo', {
                        id, ...conteudoPostData
                    })
                    setRedirect(true);
                } else {
                    await axios.post('/criar-conteudo', {
                        id, ...conteudoPostData
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

    async function deleteContent(ev){
        ev.preventDefault();

        try {
            if(user?.admin){
                if(id){
                    await axios.post('/delete-content', {id});
                    setRedirectToDashboard(true);
                }
            }
        } catch(err){
            console.log(err)
        }
    }

    function deleteDialog(ev){
        ev.preventDefault()

        document.getElementById('delete_modal').showModal()
    }

    if(redirectToDashboard){
        return <Navigate to={'/modulo/'+conjunto} />
    }

    if(redirect){
        window.location.reload();
    }

    return (
        <div className='my-auto mx-auto items-center mt-12 max-w-4xl px-8'>
            <dialog id="delete_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tem certeza que deseja deletar esse conteúdo?</h3>
                    <p className="py-4">Se você deletar esse conteúdo não será impossível recuperá-lo.</p>
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <div className='flex gap-4'>
                            <button onClick={deleteContent} className="btn btn-error">Deletar</button>
                            <button className="btn">cancelar</button>
                        </div>
                    </form>
                    </div>
                </div>
            </dialog>
            <button onClick={() => onChange(false)} className='btn btn-active'>
                ⬅️ Voltar
            </button>
            <form onSubmit={saveContent}>
                <h2 className='text-2xl mt-4 mb-4'>Título do seu conteúdo</h2>
                <input className="input input-ghost w-full max-w-xs" type="text" value={contentTitle} onChange={ev => setContentTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

                <h2 className='text-2xl mt-12 mb-4'>Descrição do seu conteúdo</h2>
                <input className="input input-ghost w-full max-w-xs" type="text" value={contentDescription} onChange={ev => setContentDescription(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 

                <h2 className='text-2xl mt-12 mb-4'>Link do vídeo</h2>
                <input className="input input-ghost w-full" type="text" value={videoUrl} onChange={ev => setVideoUrl(ev.target.value)} placeholder='Um descrição de abrir a boca...' />

                <h2 className='text-2xl mt-12 mb-4'>Adicione o PDF</h2>
                <PdfUploader addedPhotos={pdfUrl} onChange={setPdfUrl} />  

                <h2 className='text-2xl mt-12 mb-4'>Conteúdo escrito</h2>
                <ReactQuill
                    value={contentContent}
                    onChange={setContentContent}
                    theme={'snow'}
                    modules={modules} 
                    formats={formats} 
                />

                <h2 className='text-2xl mt-12 mb-4'>Foto de capa do seu conteúdo</h2>
                <PhotosUploader addedPhotos={contentAddedPhotos} onChange={setContentAddedPhotos} />

                <div className='mb-10 mt-12'>
                    <button className='btn btn-info py-2 px-4 w-full'>Publicar conteúdo</button>
                    <button onClick={deleteDialog} type="submit" className="btn btn-error text-white w-full mt-4">Apagar conteúdo</button>
                </div>
            </form>
        </div>
    )
}

export default CreateContent
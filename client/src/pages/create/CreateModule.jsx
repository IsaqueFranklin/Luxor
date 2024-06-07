import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Navigate, Link, useParams} from 'react-router-dom';
import { UserContext } from '../../UserContext';
import PhotosUploader from '../../components.jsx/PhotosUploader';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

export default function CreateModule(){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [redirect, setRedirect] = useState(false);

    //States for books
    const [bookTitle, setBookTitle] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookAddedPhotos, setBookAddedPhotos] = useState([]);

    async function saveBook(ev){
        ev.preventDefault();

        const bookPostData = {
            bookTitle, bookDescription, bookAddedPhotos, dia:new Date()
        }

        try {
            if(user?.admin){
                if(id){
                    await axios.post('/criar-book', {
                        id, ...bookPostData
                    })
                    setRedirect(true);
                } else {
                    await axios.post('/criar-book', {
                        ...bookPostData
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

    if(ready && !user){
        return <Navigate to={'/cadastro'} />
    }

    if(redirect){
        window.location.reload()
    }

    return (
        <div className='my-auto mx-auto items-center mt-12 max-w-4xl'>
        <form onSubmit={saveBook}>
            <h2 className='text-2xl mt-4 mb-4'>Título do seu book</h2>
            <input type="text" value={bookTitle} onChange={ev => setBookTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

            <h2 className='text-2xl mt-12 mb-4'>Descrição do seu book</h2>
            <input type="text" value={bookDescription} onChange={ev => setBookDescription(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 

                    <h2 className='text-2xl mt-12 mb-4'>Foto de capa do seu book</h2>
                    <PhotosUploader addedPhotos={bookAddedPhotos} onChange={setBookAddedPhotos} />

                    <div className='mb-10 mt-12'>
                        <button className='py-2 px-4 w-full rounded rounded-lg bg-[#0047AB] text-white hover:bg-white hover:text-black my-4 mb-20'>Publicar</button>
                    </div>
                </form>
        </div>
    )
}
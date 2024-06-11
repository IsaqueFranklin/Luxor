import { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreateContent from '../create/CreateContent';
import Contents from '../../components.jsx/Contents';
import CreateModule from '../create/CreateModule';

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

export default function ModulePage({ modulos }) {

    const { ready, user, setUser } = useContext(UserContext);
    const { id } = useParams();

    const [createContent, setCreateContent] = useState(false);
    const [editModule, setEditModule] = useState(false);
    const [moduleId, setModuleId] = useState(null);

    const [seeContents, setSeeContents] = useState(false);
    const [contents, setContents] = useState([]);

    const [wichBook, setWichBook] = useState(null);

    const [contentTitle, setContentTitle] = useState('');
    const [contentDescription, setContentDescription] = useState('');
    const [contentAddedPhotos, setContentAddedPhotos] = useState([]);
    const [contentContent, setContentContent] = useState('');

    useEffect(() => {
        axios.get('/get-contents/'+id).then(response => {
            setContents([...response.data])
        })
    }, [id])

    async function saveContent(ev){
        ev.preventDefault();

        const contentPostData = {
            contentTitle, contentDescription, contentAddedPhotos, contentContent, dia:new Date(), moduleId
        }

        setCreateContent(false);
        setContentTitle('');
        setContentDescription('');
        setContentAddedPhotos([]);
        setContentContent('');

        if(user.admin){
            if(id){
                await axios.post('/criar-conteudo/'+id, {
                    id, ...contentPostData
                })
                
            } else {
                await axios.post('/criar-conteudo', {
                    ...contentPostData
                })
            }
        }
    }

    if (createContent) {
      return (
        <CreateContent />
      )
    }

    if(editModule){
      return (
        <CreateModule />
      )
    }

    return (
        <div className='my-auto items-center py-16 lg:py-2 lg:pt-32 px-4 lg:px-0'>

        <div className='my-16 max-w-7xl mx-auto my-auto'>
                        <h1 className="text-xl font-light leading-tight tracking-tight lg:text-3xl mb-4">
                            Qual tipo de publicação deseja criar?
                        </h1>
                        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 flex gap-4">
                            <Link><button onClick={() => setCreateContent(true)} type="submit" className="btn btn-success">Novo conteúdo</button></Link>
                            <button onClick={() => setEditModule(true)} type="submit" className="btn btn-active">Editar módulo</button>
                        </div>
                        <h2></h2>
                        <Contents contents={contents} />
                </div>
        </div>
    )
}
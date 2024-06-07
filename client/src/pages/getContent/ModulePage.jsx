import { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PhotosUploader from '../../components.jsx/PhotosUploader';
import { UserContext } from '../../UserContext';
import Content from '../../components.jsx/Content';
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

export default function ModulePage({ modulos }) {

    const { ready, user, setUser } = useContext(UserContext);
    const { id } = useParams();

    const [createContent, setCreateContent] = useState(false);
    const [moduleId, setModuleId] = useState(null);

    const [seeContents, setSeeContents] = useState(false);
    const [contents, setContents] = useState([]);

    const [wichBook, setWichBook] = useState(null);

    const [contentTitle, setContentTitle] = useState('');
    const [contentDescription, setContentDescription] = useState('');
    const [contentAddedPhotos, setContentAddedPhotos] = useState([]);
    const [contentContent, setContentContent] = useState('');

    useEffect(() => {
        axios.get('/get-contents').then(response => {
            setContents([...response.data])
        })
    }, [])

    if (createContent) {
        return (
          <createContent />
        )
    }

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
                await axios.post('/criar-conteudo', {
                    id, ...contentPostData
                })
                
            } else {
                await axios.post('/criar-conteudo', {
                    ...contentPostData
                })
            }
        }
    }

    return (
        <div className='mt-8'>
            {modulos?.length > 0 && modulos?.map((module, index) => {
                return (
                    <Link key={index} className=''>
                        <div className="py-1 lg:py-4 px-2 lg:px-4 mb-2">
                            <div className='flex'>
                                <div className='bg-gray-500 mb-2 lg:w-24 lg:h-24 min-w-16 h-16 aspect-square rounded-2xl'>
                                    <img className='rounded-2xl lg:w-24 lg:h-24 min-w-16 h-16 aspect-square' src={'http://localhost:5000/uploads/' + module.photos?.[0]} />
                                </div>
                                <div className='my-auto mx-8'>
                                    <h2 className='font-light text-sm lg:text-xl text-black'>{module.title}</h2>
                                    <h3 className='text-sm text-gray-900'>{module.description}</h3>
                                    {/*<div className='content' dangerouslySetInnerHTML={{__html:post.content}} /> */}
                                    <button onClick={() => { setCreateContent(true), setModuleId(module._id) }} className='py-2 px-2 rounded-full bg-[#0047AB] text-white hover:bg-gray-700 hover:text-black my-4 mb-6'>
                                        <svg className="lg:w-6 lg:h-6 w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                        </svg>
                                    </button>
                                    {seeContents && wichBook === module._id ? (
                                        <>
                                            <button onClick={() => (setSeeContents(false), setWichBook(null))} type="submit" className="mx-2 text-white bg-gray-700 hover:bg-[#0047AB] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-2 py-2 text-center">
                                                <svg className="lg:w-6 lg:h-6 w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7" />
                                                </svg>
                                            </button>
                                            <Conteudos conteudos={contents.filter(content => content.conjunto === module._id)} />
                                        </>

                                    ) : (<button onClick={() => (setSeeContents(true), setWichBook(module._id))} type="submit" className="mx-2 text-white bg-[#0047AB] hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-2 py-2 text-center">
                                        <svg className="lg:w-6 lg:h-6 w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                        </svg>
                                    </button>)}
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
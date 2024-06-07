import { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import { UserContext } from '../UserContext';
import ContentCreateDock from './ContentCreateDock';

export default function Conteudos({ conteudos }) {

    const { ready, user, setUser } = useContext(UserContext);
    const { id } = useParams();

    const [moduleId, setModuleId] = useState(null);

    const [seeContents, setSeeContents] = useState(false);
    const [contents, setContents] = useState([]);

    const [wichBook, setWichBook] = useState(null);


    return (
        <div className='mt-8'>
            {conteudos?.length > 0 && conteudos?.map((module, index) => {
                return (
                    <Link key={index} to={"/criar-conteudo/"+module._id} className=''>
                        <div className="py-1 lg:py-4 px-2 lg:px-4 mb-2">
                            <div className='flex'>
                                <div className='bg-gray-500 mb-2 lg:w-32 lg:h-32 min-w-16 h-16 aspect-square rounded-2xl'>
                                    <img className='rounded-2xl lg:w-32 lg:h-32 min-w-16 h-16 aspect-square' src={'http://localhost:5000/uploads/' + module.photos?.[0]} />
                                </div>
                                <div className='my-auto mx-8'>
                                    <h2 className='font-light text-sm lg:text-xl text-black'>{module.title}</h2>
                                    <h3 className='text-sm text-gray-900'>{module.description}</h3>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useParams, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Header from '../components.jsx/Header';
import Modules from '../components.jsx/Modules';
import CreateModule from './create/CreateModule';
import CreateGroup from './create/CreateGroup';


export default function PublicarPage(){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [newsletter, setNewsletter] = useState(false);
    const [book, setBook] = useState(false);
    const [group, setGroup] = useState(false);


    const [modules, setModules] = useState([]);
    const [groups, setGroups] = useState([])

    const [seeBooks, setSeeBooks] = useState(false);

    useEffect(() => {
        axios.get('/get-books').then(response => {
            setModules([...response.data])
        })

        axios.get('/get-groups').then(response => {
            setGroups([...response.data])
        })
    }, [])

    if(ready && !user){
        return <Navigate to={'/cadastro'} />
    }

    if(book){
        return (
            <CreateModule />
        )
    }

    if(group){
        return (
            <CreateGroup modules={modules} />
        )
    }

    return (
        <>
            <Header />
            <section className="my-auto items-center py-16 lg:py-2 lg:pt-32 px-4 lg:px-0">
                
                <div className='my-16 max-w-7xl mx-auto my-auto'>
                        <h1 className="text-xl font-light leading-tight tracking-tight lg:text-3xl mb-4">
                            Qual tipo de publicação deseja criar?
                        </h1>
                        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 flex gap-4">
                            <Link><button onClick={() => setBook(true)} type="submit" className="btn btn-success">Novo Book</button></Link>
                            <Link><button onClick={() => setGroup(true)} type="submit" className="btn btn-info">Criar grupo</button></Link>
                        </div>
                    {groups?.length > 0 && groups?.map((group, key) => (
                        <Modules modules={modules.filter(module => module.group === group._id)} key={key} />
                    ))}
                </div>
            </section>
        </>
    )
}
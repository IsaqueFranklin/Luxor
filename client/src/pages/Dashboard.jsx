import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useParams, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Header from '../components.jsx/Header';
import Modules from '../components.jsx/Modules';
import CreateModule from './create/CreateModule';


export default function PublicarPage(){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [newsletter, setNewsletter] = useState(false);
    const [book, setBook] = useState(false);


    const [books, setBooks] = useState([]);

    const [seeBooks, setSeeBooks] = useState(false);

    useEffect(() => {
        axios.get('/get-books').then(response => {
            setBooks([...response.data])
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

    return (
        <>
            <Header />
            <section className="my-auto items-center py-16 lg:py-2 lg:pt-32 px-4 lg:px-0">
                
                <div className='my-16 max-w-7xl mx-auto my-auto'>
                        <h1 className="text-xl font-light leading-tight tracking-tight lg:text-3xl mb-4">
                            Qual tipo de publicação deseja criar?
                        </h1>
                        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 grid grid-cols-2 gap-4">
                            
                            <div className="">
                                <Link><button onClick={() => setBook(true)} type="submit" className="w-full hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Novo Book</button></Link>
                            </div>
                        </div>
                    <Modules modules={books} />
                </div>
            </section>
        </>
    )
}
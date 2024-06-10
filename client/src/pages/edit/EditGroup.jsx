import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useParams, Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import CreateGroup from '../create/CreateGroup';


export default function EditGroup(){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [modules, setModules] = useState([]);

    useEffect(() => {
        axios.get('/get-books').then(response => {
            setModules([...response.data])
        })
    }, [])

    if(ready && !user){
        return <Navigate to={'/login'} />
    }

    return (
        <CreateGroup modules={modules.filter(module => module.group === id)} />
    )
}
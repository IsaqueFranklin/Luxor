import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import axios from "axios";

function CreateGroup({ modules }){
    
    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [groupTitle, setGroupTitle] = useState('');
    const [contentDescription, setContentDescription] = useState('');
    const [booksArray, setBooksArray] = useState([]);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(id){
            axios.get('/get-group/'+id).then(response => {
                const {data} = response;
                setGroupTitle(data.tag);
            })
        }
    }, [])

    async function createGroupHandle(ev){
        ev.preventDefault();

        const groupData = {
            groupTitle, booksArray, dia:new Date()
        }

        try {
            if(user?.admin){
                if(id){
                    await axios.post('/criar-grupo', {
                        id, ...groupData
                    })
                    setRedirect(true);
                } else {
                    await axios.post('/criar-grupo', {
                        ...groupData
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

    function handleCheckboxChange(id){
        const repeated = booksArray.filter(book => book === id)
        console.log(repeated?.length === 0)

        if(repeated?.length === 0){
            setBooksArray([...booksArray, id])
        } else {
            setBooksArray((prevItems) => prevItems.filter(item => item != id));
        }
    }

    if(redirect){
        window.location.reload()
    }

    const filteredModules = modules.filter(module => module.group === 'padrão' || module.group === null || module.group === '')
    const arrayToUse = id ? modules : filteredModules;

    return (
        <div className='my-auto mx-auto items-center mt-12 max-w-4xl px-8'>
            <form onSubmit={createGroupHandle}>
                <h2 className='text-2xl mt-4 mb-4'>Título do seu grupo</h2>
                <input type="text" value={groupTitle} onChange={ev => setGroupTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

                {arrayToUse?.length > 0 &&  arrayToUse?.map((module, key) => (
                    <div key={key} className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{module?.title}</span> 
                            <input onChange={() => handleCheckboxChange(module._id)} type="checkbox" defaultChecked={!!id} className="checkbox" />
                        </label>
                    </div>
                ))}

                <div className='mb-10 mt-12'>
                    <button className='py-2 px-4 w-full rounded rounded-lg bg-[#0047AB] text-white hover:bg-white hover:text-black my-4 mb-20'>Criar</button>
                </div>
            </form>
        </div>
    )
}

export default CreateGroup
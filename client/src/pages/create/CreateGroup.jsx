import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../UserContext';
import { Navigate, useParams } from 'react-router-dom';
import axios from "axios";

function CreateGroup({ modules, onChange }){
    
    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [groupTitle, setGroupTitle] = useState('');
    const [groupId, setGroupId] = useState('');
    const [booksArray, setBooksArray] = useState([]);
    const [booksOutArray, setBooksOutArray] = useState([]);

    const [redirect, setRedirect] = useState(false);
    const [blockCreate, setBlockCreate] = useState(false);

    useEffect(() => {
        if(id){
            axios.get('/get-group/'+id).then(response => {
                const {data} = response;
                setGroupTitle(data.tag);
                setGroupId(data._id);
                setBooksArray([...data.modulesArray])
            })
        }
    }, [])

    async function createGroupHandle(ev){
        ev.preventDefault();

        const groupData = {
            groupTitle, booksArray, booksOutArray, dia:new Date()
        }

        try {
            if(user?.admin && !blockCreate){
                if(id){
                    await axios.put('/criar-grupo', {
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
                console.log("Existem erros no seu grupo, corrija-os.")
                alert("Existem erros no seu grupo, corrija-os.")
            }
        } catch (err) {
            console.log(err)
        }

    }

    async function deleteGroupHandle(ev){
        ev.preventDefault();

        try {
            if(user?.admin){
                if(id){
                    await axios.post('/delete-group', {
                        id, booksArray
                    })
                    setRedirect(true);
                }
            }
        } catch(err){
            console.log(err)
        }
    }

    function handleCheckboxChange(id){
        const repeated = booksArray.filter(book => book === id)
        console.log(repeated?.length === 0)

        if(repeated?.length === 0){
            if(booksArray.length >= 10){
                document.getElementById('my_modal_1').showModal()
                setBlockCreate(true);
            } else {
                setBooksArray([...booksArray, id])
            }
        } else {
            setBooksArray((prevItems) => prevItems.filter(item => item != id));
            setBooksOutArray([...booksOutArray, id])
        }
    }

    function problemDialog(ev){        
        ev.preventDefault();
        
        document.getElementById('my_modal_3').showModal()
    }

    function problemDialog2(ev){        
        ev.preventDefault();
        
        document.getElementById('my_modal_2').showModal()
    }

    if(redirect){
        if(id){
            return <Navigate to={'/dashboard'} />
        } else {
            window.location.reload()
        }
    }

    const filteredModules = modules.filter(module => module.group === 'padrão' || module.group === null || module.group === '' || module.group === groupId)

    return (
        <div className='my-auto mx-auto items-center py-8 lg:pt-32 max-w-4xl px-8'>
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Grupo muito cheio!</h3>
                <p className="py-4">Você ultrapassou o limite de módulos nesse grupo, retire um.</p>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Fechar</button>
                </form>
                </div>
            </div>
            </dialog>
            <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Deletar grupo!</h3>
                <p className="py-4">Tem certeza que você gostaria de deletar esse grupo?</p>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <div className='flex gap-4'>
                        <button onClick={deleteGroupHandle} className="btn btn-error">Deletar</button>
                        <button className="btn">cancelar</button>
                    </div>
                </form>
                </div>
            </div>
            </dialog>
            <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Erros encontrados!</h3>
                <p className="py-4">Vocẽ não pode criar um grupo sem títulos ou módulos.</p>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Fechar</button>
                </form>
                </div>
            </div>
            </dialog>
            <button onClick={() => onChange(false)} className='btn btn-active'>
                ⬅️ Voltar
            </button>
            <form onSubmit={!id && booksArray.length === 0 ? problemDialog : createGroupHandle}>
                <h2 className='text-2xl mt-4 mb-4'>Título do seu grupo</h2>
                <input className="input input-bordered w-full" type="text" value={groupTitle} onChange={ev => setGroupTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

                {filteredModules?.length > 0 ? filteredModules?.map((module, key) => (
                    <div key={key} className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{module?.title}</span> 
                            <input onChange={() => handleCheckboxChange(module._id)} type="checkbox" defaultChecked={id && module.group === groupId ? true : false} className="checkbox" />
                        </label>
                    </div>
                )) : (<h2 className='mx-auto my-auto font-semibold text-xl mt-4'>Nenhum módulo disponível.</h2>)}

                    <div className='mb-10 mt-12'>
                        <button className={booksArray.length === 0 ? 'btn btn-error py-2 px-4 w-full' : 'btn btn-success py-2 px-4 w-full'}>{id ? (booksArray.length === 0 ? 'Deletar' : 'Editar') : (booksArray.length === 0 ? 'Selecione algum módulo' : 'Criar')}</button>
                    </div>
            </form>
                {id && booksArray.length > 0 ? (
                    <div className='mb-10 mt-12'>
                        <button onClick={problemDialog2} className='btn btn-error py-2 px-4 w-full'>Apagar grupo</button>
                    </div>
                ) : ''}
        </div>
    )
}

export default CreateGroup
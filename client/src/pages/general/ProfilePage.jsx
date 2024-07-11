import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext';
import PhotosUploader from '../../components.jsx/PhotosUploader';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ProfilePage = () => {

    const {ready, user, setUser} = useContext(UserContext);

    const [profileImg, setProfileImg] = useState([]);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if(ready && user){
            axios.get('/get-profile-info').then(response => {
                const {data} = response
    
                setProfileImg(data.profileImg);
                setName(data.name);
                setUsername(data.username)
            })
        }
    }, [ready])

    async function saveProfile(ev){
        ev.preventDefault();
        const profileData = { name, username, profileImg }

        try {
            const savePromise = new Promise(async (resolve, reject) => {
                await axios.put('/edit-profile-info', {
                    ...profileData
                })

                resolve()
            })

            await toast.promise(
                savePromise,
                {
                    loading: 'Salvando...',
                    success: <b>Perfil salvo!</b>,
                    error: <b>Não foi possível salvar.</b>,
                }
            )
        } catch (err){
            console.log(err)
        }
    }


    if(ready && !user){
        return (
            <div className='my-auto mx-auto items-center mt-12 max-w-4xl px-8'>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    return (
        <div className='my-auto mx-auto items-center mt-12 max-w-4xl px-8'>
            <form onSubmit={saveProfile}>
                <h2 className='text-xl md:text-2xl mt-4'>Nome</h2>
                <input className="input input-bordered w-full" type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder='Your name...' />

                <h2 className='text-xl md:text-2xl mt-12'>Nome de usuário</h2>
                <input className="input input-bordered w-full" type="text" value={username} onChange={ev => setUsername(ev.target.value)} placeholder='Your username...' /> 

                <h2 className='text-xl md:text-2xl mt-12'>Foto de perfil</h2>
                <PhotosUploader addedPhotos={profileImg} onChange={setProfileImg} />

                <div className='mb-10 mt-12'>
                    <button className='btn bg-blue-600 text-white py-2 px-4 w-full'>Salvar perfil</button>
                </div>
            </form>
        </div>
    )
}

export default ProfilePage
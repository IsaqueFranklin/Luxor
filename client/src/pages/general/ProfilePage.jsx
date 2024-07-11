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
            axios.get('/auth/get-profile-info').then(response => {
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
                await axios.put('/auth/edit-profile-info', {
                    ...profileData
                })

                resolve()
            })

            await toast.promise(
                savePromise,
                {
                    loading: 'Saving...',
                    success: <b>Profile saved!</b>,
                    error: <b>Could not save.</b>,
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
                <h2 className='text-2xl mt-4 mb-4'>Name</h2>
                <input className="input input-bordered w-full" type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder='Your name...' />

                <h2 className='text-2xl mt-12 mb-4'>Username</h2>
                <input className="input input-bordered w-full" type="text" value={username} onChange={ev => setUsername(ev.target.value)} placeholder='Your username...' /> 

                <h2 className='text-2xl mt-12 mb-4'>Profile image</h2>
                <PhotosUploader addedPhotos={profileImg} onChange={setProfileImg} />

                <div className='mb-10 mt-12'>
                    <button className='btn btn-info py-2 px-4 w-full'>Save profile</button>
                </div>
            </form>
        </div>
    )
}

export default ProfilePage
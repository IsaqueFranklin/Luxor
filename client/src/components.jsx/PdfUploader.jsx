import { useState } from 'react';
import axios from 'axios';

export default function PdfUploader({addedPhotos, onChange}){
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev){
        ev.preventDefault();

        try {
            const {data:filename} = await axios.post('/uploadbylink', {link: photoLink});
            onChange(prev => {
                return [...prev, filename];
            });
            setPhotoLink('');
        } catch (err) {
            console.log('Erro: '+err)
        }
    }

    function uploadPhoto(ev){
        ev.preventDefault();

        const files = ev.target.files;
        const data = new FormData();

        for (let i = 0; i < files.length; i++){
            data.append('photos', files[i]);
        };

        axios.post('/upload', data, {
            headers: {'Content-Type':'multipart/form-data'}
        }).then(response => {
            const {data:filenames} = response;
            onChange(prev => {
                return [...prev, ...filenames]
            })
        })
    }

    function removePhoto(ev, filename) {
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)])
    }

    function selectAsMainPhoto(ev, filename){
        ev.preventDefault();
        onChange([filename, ...addedPhotos.filter(photo => photo !== filename)])
    }

    return (
        <>
                        <div className='flex gap-2'>
                            <input className="input input-ghost w-full max-w-xs" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} type='text' placeholder='Adicione um pdf por link...' />
                            <button onClick={addPhotoByLink} className='btn btn-info'>adicione&nbsp;pdf</button>
                        </div>
                        
                        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            <input
                                type="file"
                                placeholder="You can't touch this"
                                className="w-full"
                                disabled />
                        </div>
        </>
    )
}
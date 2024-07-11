import React, { useState } from 'react'
import PhotosUploader from '../../components.jsx/PhotosUploader';

const CustomerSupportPage = () => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [problemDescription, setProblemDescription] = useState('')
  const [problemImg, setProblemImg] = useState([]);

  async function sendSupportEmail(ev){
    ev.preventDefault();


  }

  return (
    <div className='my-auto mx-auto items-center mt-4 lg:mt-12 max-w-4xl px-8'>
      <h1 className='text-2xl lg:text-4xl font-medium my-8'>Customer support form</h1>
      <p className='mb-8'>Fill the form bellow and we'll get in touch with your through your email in 1 to 2 days.</p>
            <form onSubmit={sendSupportEmail}>
                <h2 className='text-xl lg:text-2xl mt-4 mb-4'>What's your name?</h2>
                <input type="text" className="input input-bordered w-full" value={name} onChange={ev => setName(ev.target.value)} placeholder='Your name...' />

                <h2 className='text-xl lg:text-2xl mt-12 mb-4'>What's your username?</h2>
                <input type="text" className="input input-bordered w-full" value={username} onChange={ev => setUsername(ev.target.value)} placeholder='Your username...' /> 

                <h2 className='text-xl lg:text-2xl mt-12 mb-4'>Describe your problem/issue:</h2>
                <textarea value={problemDescription} onChange={(ev) => setProblemDescription(ev.target.value)} className="textarea textarea-bordered rounded-xl textarea-lg w-full bg-transparent outline-none border focus:border-indigo-600 shadow-sm" placeholder="Briefly describe your problem/issue"></textarea>

                <h2 className='text-xl lg:text-2xl mt-12 mb-4'>Atach some images of your issue if needed</h2>
                <PhotosUploader addedPhotos={problemImg} onChange={setProblemImg} />

                <div className='mb-10 mt-12'>
                    <button className='btn btn-info py-2 px-4 w-full'>Send</button>
                </div>
            </form>
    </div>
  )
}

export default CustomerSupportPage
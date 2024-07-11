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
      <h1 className='text-2xl lg:text-4xl font-medium my-8'>Formulário de suporte</h1>
      <p className='mb-8'>Preencha o formulário e nós entraremos em contato pelo seu email dentro dos próximos 2 dias.</p>
            <form onSubmit={sendSupportEmail}>
                <h2 className='text-xl lg:text-2xl mt-4 mb-4'>Qual seu nome?</h2>
                <input type="text" className="input input-bordered w-full" value={name} onChange={ev => setName(ev.target.value)} placeholder='Seu nome' />

                <h2 className='text-xl lg:text-2xl mt-12 mb-4'>Qual seu nome de usuário?</h2>
                <input type="text" className="input input-bordered w-full" value={username} onChange={ev => setUsername(ev.target.value)} placeholder='Seu username' /> 

                <h2 className='text-xl lg:text-2xl mt-12 mb-4'>Descreva seu problema:</h2>
                <textarea value={problemDescription} onChange={(ev) => setProblemDescription(ev.target.value)} className="textarea textarea-bordered rounded-xl textarea-lg w-full bg-transparent outline-none border focus:border-indigo-600 shadow-sm" placeholder="Descreva brevemente seu problema"></textarea>

                <h2 className='text-xl lg:text-2xl mt-12 mb-4'>Envie algumas imagens do problema se precisar</h2>
                <PhotosUploader addedPhotos={problemImg} onChange={setProblemImg} />

                <div className='mb-10 mt-12'>
                    <button className='btn bg-blue-600 text-white py-2 px-4 w-full'>Enviar</button>
                </div>
            </form>
    </div>
  )
}

export default CustomerSupportPage
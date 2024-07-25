import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../../UserContext';
import axios from 'axios';
import CreateQuiz from '../create/CreateQuiz';
import CreateContent from '../create/CreateContent';

const ContentPage = () => {

  const {ready, user, setUser, setBell} = useContext(UserContext);
  const {id} = useParams();

  const filteredCompletedContents = user?.completedContents?.filter(item => item === id);

  const [contents, setContents] = useState([]);

  const [editContent, setEditContent] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [createQuiz, setCreateQuiz] = useState(false);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [content, setContent] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [pdfUrl, setPdfUrl] = useState([]);
  const [conjunto, setConjunto] = useState();
  const [contentComments, setContentComments] = useState([]);

  const [comment, setComment] = useState('');
  const [contentReload, setReloadContent] = useState(false);

  useEffect(() => {
    if(!id){
      return
    }

    axios.get('/content/'+id).then(response => {
      const {data} = response;
      setTitle(data.title)
      setDescription(data.description)
      setContent(data.content)
      setVideoUrl(data.videoUrl)
      setPdfUrl(data.pdfUrl)
      setConjunto(data.conjunto)
      setContentComments(data.comments)

      axios.get('/get-contents/'+data.conjunto).then(response => {
        setContents([...response.data])
      })
    })
  }, [editContent, contentReload])

  async function handleConcludeContent(ev){
    ev.preventDefault();

    let concludeBool;
    if(filteredCompletedContents.length === 0){
      concludeBool = true;
    }

    if(filteredCompletedContents.length != 0){
      concludeBool = false;
    }

    try {
      await axios.put('/conclude-content', {id, concludeBool})
      setBell(true);
    } catch(err){
      console.log(err)
    }
  }

  async function handleComment(ev){
    ev.preventDefault();

    try {
      const bodyContent = {id, comment, timestamp:new Date()}
      await axios.put('/comment-on-content', {...bodyContent})

      setReloadContent(!contentReload);
      setComment('')
    } catch(err){
      throw err
    }
  }

  if(editContent){
    return <CreateContent onChange={setEditContent} />
  }

  if(goBack){
    return <Navigate to={'/modulo/'+conjunto} />
  }

  if(createQuiz){
    return <CreateQuiz onChange={setCreateQuiz} />
  }
  
  return (
    <div className='px-4 lg:pr-0 lg:pl-48 mx-auto py-8 lg:pt-4 px-4 lg:px-0 lg:flex h-full'>
      <div className='my-16 my-auto items-center mx-auto justify-center lg:w-[200%]'>
        <dialog id="seeContents" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-4">Conteúdos do módulo</h3>
            <div className='border rounded-lg'>
              <ol className=''>
                {contents?.length > 0 && contents.map((item, key) => (
                  <a href={"/conteudo/"+item._id} key={key}>
                    <li className={id === item._id ? 'justify-between py-3 w-full px-4 flex gap-4 items-center bg-gray-800 text-white rounded-lg' : 'justify-between py-3 w-full flex gap-4 md:px-2 lg:px-4 items-center rounded-lg'}>
                      <h2 className='text-lg'>{item.title}</h2>
                      {user?.completedContents?.filter(content => content === item._id).length === 0 ? (
                        <h2 className='text-blue-600'>Não concluído</h2>
                      ) : (
                        <h2 className='text-green-600'>Concluído</h2>
                      )}
                    </li>
                  </a>
                ))}
              </ol>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <div className='inline-flex gap-4'>
                  <button className="btn btn-active w-full">Fechar</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
        <div className='inline-flex gap-2 mx-auto justify-center'>
          <button onClick={() => setGoBack(true)} className='btn btn-active'>
            ⬅️ Voltar
          </button>
          {user?.admin && (
              <>
                <button onClick={() => setEditContent(true)} type="submit" className="btn bg-blue-600 text-white">Editar conteúdo</button>
                <button onClick={() => setCreateQuiz(true)} className='btn bg-blue-600 text-white'>
                  Criar Quiz
                </button>
              </>
          )}
        </div>
        <div className='pt-6 mb-4 md:py-6'>
          <h2 className='text-2xl md:text-4xl'>{title}</h2>
          <p className='mt-4'>{description}</p>
        </div>
        {videoUrl ? (
          <div className="overflow-hidden relative pb-[56%] rounded-2xl mb-16s">
            <iframe
            className='h-full w-full absolute'
              width="853"
              height="1580"
              src={`https://www.youtube.com/embed/`+videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        ) : ''}
        {pdfUrl?.length > 0 ? (
          <div className='lg:max-h-full mt-8'>
            <iframe src={pdfUrl} className='w-full' height={1200} width={400} />
          </div>
        ) : ''}
        {content ? (
          <div className='mt-4 md:mt-6 px-0'>
            <div tabIndex={0} className="collapse bg-base-200">
              <div className="collapse-title text-lg font-medium">Descrição</div>
              <div className="collapse-content">
                <div className='content lg:text-xl lg:leading-relaxed leading-normal mb-8 mt-8' dangerouslySetInnerHTML={{__html:content}} />
              </div>
            </div>
          </div>
        ) : ''}
        <div className='py-4'>
          <button onClick={()=>document.getElementById('seeContents').showModal()} className='md:hidden btn bg-blue-600 mb-4 w-full text-white'>Ver conteúdos</button>
          {filteredCompletedContents?.length === 0 ? (
            <button onClick={handleConcludeContent} className='btn bg-blue-600 text-white w-full'>Marcar como concluído</button>
          ) : (
            <button onClick={handleConcludeContent} className='btn bg-green-600 text-white w-full'>Concluído</button>
          )}
        </div>
        <div className='py-8'>
          <h2 className='text-lg font-semibold mb-4'>Comentários</h2>
          <div className='border rounded-md p-4'>
            <div className='flex gap-4'>
              <input value={comment} onChange={ev => setComment(ev.target.value)} className='input input-bordered w-full rounded-md' placeholder='Escreva seu comentário aqui...' />
              <button onClick={handleComment} className='btn bg-blue-600 text-white rounded-md'>Enviar</button>
            </div>

            <div className='pt-8'>
              {contentComments.length > 0 && contentComments.map((item, key) => (
                <div key={key} className='mt-6 mb-4 w-full'>
                  <div className='inline-flex items-center gap-2'>
                    <div className="btn btn-ghost btn-circle avatar w-12 h-12">
                      <img className='btn btn-ghost btn-circle avatar w-12 h-12' alt="Tailwind CSS Navbar component" src={item?.userId?.profileImg ?item?.userId?.profileImg : 'https://dudewipes.com/cdn/shop/articles/gigachad.jpg?v=1667928905&width=2048'} />
                    </div>
                    <span className='font-semibold'>{item?.userId?.username}</span>
                  </div>
                  <h2 className=''>{item.body}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:block w-full mx-auto justify-center text-center pl-4 ml-8'>
        <h2 className='text-xl font-semibold mb-4'>Conteúdos do módulo</h2>
        <div className='mb-4 top-0 w-full min-h-[82%] border rounded-lg bg-gray-900'>
          <ol className='py-2'>
            {contents?.length > 0 && contents.map((item, key) => (
              <a href={"/conteudo/"+item._id} key={key}>
                <li className={id === item._id ? 'justify-between py-3 w-full flex gap-4 md:px-2 lg:px-4 items-center bg-gray-800 text-white hover:bg-gray-300' : 'justify-between py-3 w-full flex gap-4 md:px-2 lg:px-4 items-center bg-gray-900 text-white hover:bg-gray-300'}>
                  <h2 className='text-lg'>{item.title}</h2>
                  {user?.completedContents?.filter(content => content === item._id).length === 0 ? (
                    <h2 className='text-blue-600'>Não concluído</h2>
                  ) : (
                    <h2 className='text-green-600'>Concluído</h2>
                  )}
                </li>
              </a>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default ContentPage
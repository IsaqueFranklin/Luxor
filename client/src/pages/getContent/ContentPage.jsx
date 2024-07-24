import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
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

      axios.get('/get-contents/'+data.conjunto).then(response => {
        setContents([...response.data])
      })
    })
  }, [editContent])

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
      <div className='my-16 my-auto items-center mx-auto justify-center'>
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
          <div className='md:mt-6 px-0'>
            <div tabIndex={0} className="collapse bg-base-200">
              <div className="collapse-title text-lg font-medium">Descrição</div>
              <div className="collapse-content">
                <div className='content text-lg lg:text-xl lg:leading-relaxed leading-normal font-serif mb-8 mt-8' dangerouslySetInnerHTML={{__html:content}} />
              </div>
            </div>
          </div>
        ) : ''}
        <div className='py-4'>
          {filteredCompletedContents?.length === 0 ? (
            <button onClick={handleConcludeContent} className='btn bg-blue-600 text-white w-full'>Marcar como concluído</button>
          ) : (
            <button onClick={handleConcludeContent} className='btn bg-green-600 text-white w-full'>Concluído</button>
          )}
        </div>
      </div>
      <div className='hidden lg:block w-full mx-auto justify-center text-center pl-4 ml-8'>
        <h2 className='text-xl font-semibold mb-4'>Conteúdos do módulo</h2>
        <div className='mb-4 top-0 w-full min-h-full border rounded-lg'>
          <ol>
            {contents?.length > 0 && contents.map((item, key) => (
              <div className='border-b'>
                <li className='py-3 w-full flex gap-4 md:px-2 lg:px-4 items-center'>
                  <h2 className='text-lg'>{item.title}</h2>
                  {filteredCompletedContents?.length === 0 ? (
                    <button onClick={handleConcludeContent} className='btn bg-blue-600 text-white py-0'>Marcar como concluído</button>
                  ) : (
                    <button onClick={handleConcludeContent} className='btn bg-green-600 text-white py-0'>Concluído</button>
                  )}
                </li>
              </div>
            ))}
           
          </ol>
        </div>
      </div>
    </div>
  )
}

export default ContentPage
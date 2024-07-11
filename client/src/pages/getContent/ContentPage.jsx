import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../../UserContext';
import axios from 'axios';
import CreateQuiz from '../create/CreateQuiz';
import CreateContent from '../create/CreateContent';

const ContentPage = () => {

  const {ready, user, setUser} = useContext(UserContext);
  const {id} = useParams();

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
      setPdfUrl(data.pdfURl)
      setConjunto(data.conjunto)
    })
  }, [editContent])

  if(editContent){
    return <CreateContent onChange={setEditContent} />
  }

  if(goBack){
    return <Navigate to={'/modulo/'+conjunto} />
  }

  if(createQuiz){
    return <CreateQuiz />
  }

  return (
    <div className='my-auto items-center py-8 lg:pt-16 px-4 lg:px-0'>
      <div className='my-16 max-w-5xl mx-auto my-auto'>
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
        <div className='pt-6 md:py-6'>
          <h2 className='text-3xl'>{title}</h2>
          <p>{description}</p>
        </div>
        {videoUrl ? (
          <div className="overflow-hidden relative pb-[56%] rounded-2xl mb-16s">
            <iframe
            className='h-full w-full absolute'
              width="853"
              height="1580"
              src={`https://www.youtube.com/embed/zEk3mi4Pt_E?si=lsu7cekOZp-iu2-4`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        ) : ''}
        {pdfUrl?.length > 0 ? (
          <div className='lg:max-h-full mt-16'>
            <iframe src={pdfUrl} className='w-full' height={1200} width={400} />
          </div>
        ) : ''}
        {content ? (
          <div className='md:mt-6 px-0'>
            <div className='content text-lg lg:text-xl lg:leading-relaxed leading-normal font-serif mb-8 mt-8' dangerouslySetInnerHTML={{__html:content}} />
          </div>
        ) : ''}
      </div>
    </div>
  )
}

export default ContentPage
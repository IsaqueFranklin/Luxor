import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../../UserContext';
import axios from 'axios';
import CreateQuiz from '../create/CreateQuiz';

const ContentPage = () => {

  const {ready, user, setUser} = useContext(UserContext);
  const {id} = useParams();

  const [goBack, setGoBack] = useState(false);
  const [createQuiz, setCreateQuiz] = useState(false);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [pdfUrl, setPdfUrl] = useState();
  const [conjunto, setConjunto] = useState();

  useEffect(() => {
    if(id && user){
      axios.get('/content/'+id).then(response => {
        const {data} = response;
        setTitle(data.title)
        setDescription(data.description)
        setVideoUrl(data.videoUrl)
        setPdfUrl(data.pdfURl)
        setConjunto(data.conjunto)
      })
    }
  }, [])

  if(goBack){
    return <Navigate to={'/modulo/'+conjunto} />
  }

  if(createQuiz){
    return <CreateQuiz />
  }

  return (
    <div className='my-auto items-center py-8 lg:pt-16 px-4 lg:px-0'>
      <div className='my-16 max-w-5xl mx-auto my-auto'>
        <div className='inline-flex gap-4'>
          <button onClick={() => setGoBack(true)} className='btn btn-active'>
            ⬅️ Voltar
          </button>
          <button onClick={() => setCreateQuiz(true)} className='btn btn-success'>
            Criar Quiz
          </button>
        </div>
        <div className='py-6'>
          <h2 className='text-3xl'>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="overflow-hidden relative pb-[56%] rounded-2xl">
          <iframe
          className='h-full w-full absolute'
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/zEk3mi4Pt_E?si=lsu7cekOZp-iu2-4`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        {!pdfUrl ? (
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 mt-8">
            <div className="collapse-title text-xl font-medium">
              Leia o material disponível
            </div>
            <div className="collapse-content"> 
              <p>tabIndex={0} attribute is necessary to make the div focusable</p>
            </div>
          </div>
        ) : ''}
      </div>
    </div>
  )
}

export default ContentPage
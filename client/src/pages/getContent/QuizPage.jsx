import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { useParams } from 'react-router-dom';
import axios from "axios";

function QuizPage(){

    const {ready, user} = useContext(UserContext);
    const {id} = useParams();

    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if(!id){
            return
        }

        axios.get('/get-quiz/'+id).then(response => {
            const {data} = response;
            setQuizTitle(data.title);
            setQuizDescription(data.description);
            setQuestions([...data.questions])
        })  
    }, [])
    
    return (
        <div className='my-auto mx-auto items-center mt-12 max-w-4xl px-6 md:px-8 py-8 md:py-64 justify-center'>
            <h2 className='font-semibold text-xl'>{quizTitle}</h2>
            <h2 className='font-semibold text-xl'>{quizDescription}</h2>
            {questions.length > 0 && questions.map((item, key) => (
                <h2 className='font-semibold text-xl'>{item.statement}</h2>
            ))}
        </div>
    )
}

export default QuizPage
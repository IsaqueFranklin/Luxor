import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { useReward } from 'react-rewards';

const CreateQuiz = ({onChange}) => {

    const {ready, user} = useContext(UserContext)
    const {id} = useParams();
    const { reward, isAnimating } = useReward('rewardId', 'confetti');

    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');

    const [startMakingQuiz, setStartMakingQuiz] = useState(false);
    const [finishQuiz, setFinishQuiz] = useState(false);
    const [createdFlag, setCreatedFlag] = useState(false);

    const [howMany, setHowMany] = useState(1);
    const [counter, setCounter] = useState(0);

    const [questionStatement, setQuestionStatement] = useState('');
    const [questionOptions, setQuestionOptions] = useState([]);
    const [correctOption, setCorrectOption] = useState('');

    const [questions, setQuestions] = useState([]);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (questions.length.toString() === howMany) {
            console.log(questions.length.toString(), howMany)
            console.log('All questions added:', questions);
        }

        if(createdFlag){
            reward();
        }
    }, [questions, createdFlag]);

    function handleQuestionCounter(ev){
        ev.preventDefault();

        const newQuestionJson = {
            statement: questionStatement,
            options: questionOptions,
            correctOption: correctOption,
        }

        setQuestions((prev) => [...prev, newQuestionJson])

        if(counter !== howMany-1){
            const newCounter = counter + 1
            setCounter(newCounter);
            console.log(newCounter, howMany-1)
        } else if(counter === howMany-1){
            console.log('concluir')
            setStartMakingQuiz(false);
            setFinishQuiz(true);
        }


        setQuestionStatement('')
        setQuestionOptions([])
        setCorrectOption('')
    }

    const handleChange = (ev, index) => {
        const newValue = ev.target.value;
    
        setQuestionOptions(prevOptions => {
          const updatedOptions = [...prevOptions];
          updatedOptions[index] = newValue;
          return updatedOptions;
        });
        console.log(questionOptions)
        console.log(questionStatement)
    };
    
    const addOption = () => {
        setQuestionOptions([...questionOptions, '']);
    };

    async function handleCreateQuiz(ev){
        ev.preventDefault()

        const quizData = {
            quizTitle, quizDescription, howMany, questions, created:new Date(), id
        }
        console.log(quizData)

        try {
            await axios.post('/create-quiz', {
                ...quizData
            })

            setCreatedFlag(true);
            //reward();
            //onChange(false)
        } catch(err){
            throw err
        }
    }

    if(createdFlag){
        return (
            <div className='my-auto mx-auto items-center mt-12 max-w-4xl px-6 md:px-8 py-8 md:py-64 justify-center'>
                <div className="border border-1 border-blue-700 shadow-lg rounded-lg shadow-lg p-4 md:p-8 mt-8 text-center">
                    <div className='flex flex-col items-center mx-auto justify-center text-center mb-8'>
                        <h2 className='text-xl md:text-4xl font-semibold mb-2'>Seu Quiz foi criado com sucesso!</h2>
                        <p className='text-lg'>Finalize para conseguir ver seu quiz na tela do conteúdo em que ele foi criado.</p>
                        <span id="rewardId" className='w-full justify-center' />
                    </div>
                    <span id="rewardId" className='w-full justify-center text-center' />
                    <button onClick={() => onChange(false)} className='w-full btn bg-blue-600 text-white'>Finalizar</button>
                </div>
            </div>
        )
    }

    if(finishQuiz){
        return (
            <div className='my-auto mx-auto items-center mt-12 max-w-4xl px-6 md:px-8 pb-8 md:pb-24'>
                <h2 className='text-2xl mt-12 mb-4'>Revise seu Quiz</h2>
                <div className='border border-1 border-blue-700 shadow-xl rounded-lg p-4'>
                    <span className='text-sm mb-2'>Título:</span>
                    <h3 className='text-2xl font-semibold mb-4'>{quizTitle}</h3>
                    <span className='text-sm mb-2'>Descrição:</span>
                    <p className='font-medium'>{quizDescription}</p>
                    {questions.length > 0 && questions.map((item, key) => (
                        <div className='mt-8 border p-4 shadow-lg rounded-lg border-blue-600'>
                            <div className='py-4 border-b border-blue-600'>
                                <span>Pergunta {key+1}</span>
                                <h2 className='font-semibold text-lg md:text-xl'>{item.statement}</h2>
                            </div>
                            <div className='py-4 border-b border-blue-600'>
                                <span>Opções</span>
                                <ul className='list-disc px-6'>
                                    {item.options.length > 0 && item.options.map((option, key) => (
                                        <li className='font-semibold text-md'>{option}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='py-4'>
                                <span>Opção correta</span>
                                <h2 className='font-semibold text-lg md:text-xl'>{item.correctOption}</h2>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleCreateQuiz} className='btn rounded-lg bg-blue-600 text-white w-full mt-8'>Salvar quiz</button>
                </div>
            </div>
        )
    }

    if(startMakingQuiz){
        return (
            <div className='min-h-full my-auto mx-auto items-center mt-12 max-w-4xl px-8'>
                <div className="border border-1 border-blue-700 shadow-lg rounded-lg shadow-lg p-4 md:p-8 mt-8">
                    <h2 className='text-lg md:text-2xl mt-4 md:mt-12 mb-4'>Pergunta {counter+1} do seu Quiz</h2>
                    <input type="text" placeholder="Pergunta do seu quiz" className="input input-bordered w-full" value={questionStatement} onChange={ev => setQuestionStatement(ev.target.value)} />

                    <h2 className='text-lg md:text-2xl mt-4 md:mt-12 mb-4'>Adicione suas alternativas</h2>
                    <div>
                        {questionOptions.map((option, index) => (
                            <div className='flex gap-4 items-center'>
                                <input type="text" key={index} value={option} onChange={ev => handleChange(ev, index)} placeholder="Opção do seu quiz" className="input input-bordered w-full mt-4" />
                                {correctOption === '' && option !== '' ? (
                                    <button onClick={() => setCorrectOption(option)} className='btn rounded-lg bg-blue-600 text-white'>Opção correta</button>
                                ) : ''}
                                {correctOption !== '' && correctOption === option ? (
                                    <button onClick={() => setCorrectOption('')} className='btn btn-success text-white'>Marcada como correta</button>
                                ) : ''}
                            </div>
                        ))} 
                    </div>
                    
                    <button className='btn bg-blue-600 text-white mt-6' onClick={addOption}>Adicionar</button>

                    <div className='md:mb-10 mt-4 md:mt-12'>
                        <button onClick={handleQuestionCounter} className='btn bg-blue-600 text-white py-2 px-4 w-full'>{counter != howMany-1 ? 'Continuar' : 'Finalizar'}</button>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className='my-auto mx-auto items-center mt-12 max-w-4xl px-8'>
            <button onClick={() => onChange(false)} className='btn btn-active'>
                ⬅️ Voltar
            </button>
            <form className="border border-1 border-blue-700 shadow-lg rounded-lg shadow-lg p-4 md:p-8 mt-8">
                <h2 className='text-lg md:text-2xl mt-4 md:mt-12 mb-2'>Título do seu Quiz</h2>
                <input className="input input-bordered w-full" type="text" value={quizTitle} onChange={ev => setQuizTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

                <h2 className='text-lg md:text-2xl mt-4 md:mt-12 mb-2'>Descrição do seu Quiz</h2>
                <input className="input input-bordered w-full" type="text" value={quizDescription} onChange={ev => setQuizDescription(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 


                <h2 className='text-lg md:text-2xl mt-4 md:mt-12 mb-2'>Quantas questões terão o seu Quiz</h2>
                <input type="number" placeholder="Type here" className="input input-bordered w-full" value={howMany} onChange={ev => setHowMany(ev.target.value)} />


                <div className='md:mb-10 mt-4 md:mt-12'>
                    <button onClick={() => setStartMakingQuiz(true)} className='btn bg-blue-600 text-white py-2 px-4 w-full'>Continuar</button>
                </div>
            </form>
        </div>
    )
}

export default CreateQuiz
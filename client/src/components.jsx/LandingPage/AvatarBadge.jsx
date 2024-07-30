import React from 'react'

const AvatarBadge = () => {
  return (
    <div className='max-w-2xl mx-auto items-center justify-center px-4'>
        <div className=''>
            <p className="text-lg md:text-xl mx-auto text-center justify-center mb-4 font-semibold">
                Usado e aprovado por diversos alunos.
            </p>
        </div>
        <div className="avatar-group -space-x-6 rtl:space-x-reverse mx-auto items-center justify-center">
            <div className="avatar">
                <div className="w-12 lg:w-14">
                <img src="https://arcapericia.com.br/wp-content/uploads/2023/10/1-768x768.png" />
                </div>
            </div>
            <div className="avatar">
                <div className="w-12 lg:w-14">
                <img src="https://arcapericia.com.br/wp-content/uploads/2023/10/2-1024x1024.png" />
                </div>
            </div>
            <div className="avatar">
                <div className="w-12 lg:w-14">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1O2Lx9DFuIgju_PRreCn_2yad4jumkdEBg&s" />
                </div>
            </div>
            <div className="avatar">
                <div className="w-12 lg:w-14">
                <img src="https://www.belaazevedo.com.br/img/bela.png" />
                </div>
            </div>
            <div className="avatar placeholder">
                <div className="w-12 lg:w-14 bg-neutral text-neutral-content">
                <span>+25</span>
                </div>
            </div>
        </div>
        <div className='mx-auto items-center justify-center flex mt-4'>
            <img className="mask mask-star-2 h-8 lg:h-10 w-8 lg:w-10" src="https://images.unsplash.com/flagged/photo-1593005510329-8a4035a7238f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <img className="mask mask-star-2 h-8 lg:h-10 w-8 lg:w-10" src="https://images.unsplash.com/flagged/photo-1593005510329-8a4035a7238f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <img className="mask mask-star-2 h-8 lg:h-10 w-8 lg:w-10" src="https://images.unsplash.com/flagged/photo-1593005510329-8a4035a7238f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <img className="mask mask-star-2 h-8 lg:h-10 w-8 lg:w-10" src="https://images.unsplash.com/flagged/photo-1593005510329-8a4035a7238f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <img className="mask mask-star-2 h-8 lg:h-10 w-8 lg:w-10" src="https://images.unsplash.com/flagged/photo-1593005510329-8a4035a7238f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
        
    </div>
  )
}

export default AvatarBadge
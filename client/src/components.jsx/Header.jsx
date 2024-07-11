import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import axios from "axios";


function Header(){

  const { redirect, user, setUser } = useContext(UserContext);

  async function signOut(){
    await axios.post('/auth/logout');
    window.location.reload();
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          
          {!user?.fullUser ? (
            <>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Homepage</a></li>
                <li><a>Portfolio</a></li>
                <li><a>About</a></li>
              </ul>
            </>
            ) : (
              <div className="drawer z-50">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label htmlFor="my-drawer" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                  </label>
                </div> 
                <div className="drawer-side">
                  <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                  <ul className="menu p-4 w-60 md:w-80 min-h-full bg-base-200 text-base-content">
                    <dialog id="signOutModal" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-xl">Ter certeza?</h3>
                        <p className="py-4 text-lg">Você está deslogando da plataforma.</p>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className='inline-flex gap-4'>
                              <button onClick={signOut} className="btn bg-red-600 text-white">Sair/deslogar</button>
                              <button className="btn btn-active">Cancelar</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </dialog>
                    <div className='mx-auto text-center items-center my-8'>
                      <div className='btn btn-ghost btn-circle avatar w-16 h-16'>
                        <img  src={user?.profileImg ? user.profileImg : 'https://dudewipes.com/cdn/shop/articles/gigachad.jpg?v=1667928905&width=2048'} className='rounded-full w-48 bg-gray-300' />
                      </div>
                      <h2 className='mt-4 text-lg font-semibold'>{user.username}</h2>
                      <h2>{user?.email}</h2>
                    </div>
                    
                    {/* Sidebar content here */}
                    <li className='font-semibold text-xl'><a href='/perfil'>Perfil</a></li>
                    <li className='font-semibold text-xl'><a href='/dashboard'>Dashboard</a></li>
                    <li className='font-semibold text-xl'><a href='/suporte'>Suporte</a></li>
                    <li className='font-semibold text-xl'><a onClick={()=>document.getElementById('signOutModal').showModal()}>Sair</a></li>
                  </ul>
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl font-semibold lg:text-2xl" href="/">Luxor</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user?.profileImg ? user.profileImg : 'https://dudewipes.com/cdn/shop/articles/gigachad.jpg?v=1667928905&width=2048'} />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between" href='/perfil'>
                Perfil
                <span className="badge">New</span>
              </a>
            </li>
            <li><a href='/suporte'>Suporte</a></li>
            <li><a onClick={()=>document.getElementById('signOutModal').showModal()}>Sair</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
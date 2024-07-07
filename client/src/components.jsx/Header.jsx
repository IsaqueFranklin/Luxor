import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

const Header = () => {

  const { redirect, user, setUser } = useContext(UserContext);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          
          {!user ? (
            <>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
                  <ul className="menu p-4 w-60 lg:w-80 min-h-full bg-base-200 text-base-content">
                    <div className='mx-auto text-center items-center my-8'>
                      <div className='btn btn-ghost btn-circle avatar w-16 h-16'>
                        <img src='https://dudewipes.com/cdn/shop/articles/gigachad.jpg?v=1667928905&width=2048' className='rounded-full w-48 bg-gray-300' />
                      </div>
                      <h2 className='mt-4 text-lg font-semibold'>{user.username}</h2>
                      <h2>{user?.email}</h2>
                    </div>
                    
                    {/* Sidebar content here */}
                    <li className='font-semibold text-xl'><a>Perfil</a></li>
                    <li className='font-semibold text-xl'><a href='/dashboard'>Dashboard</a></li>
                    <li className='font-semibold text-xl'><a>Suporte</a></li>
                    <li className='font-semibold text-xl'><a>Sair</a></li>
                  </ul>
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl font-semibold" href="/">Luxor</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
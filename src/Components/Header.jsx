import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/authContext'

function Header () {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated, logout, role } = useContext(AuthContext)
  console.log('Rol actual:', role)

  const handleLogout = () => {
    logout() // Cierra sesión
    navigate('/') // Redirige a la página de inicio de sesión
  }

  return (
    <div className='navbar fixed left-0 top-0 z-50 w-full bg-Blue50 shadow'>
      <div className='flex-1'>
        <NavLink className='btn btn-ghost text-xl' to={'/'}>
          Inventech
        </NavLink>
      </div>

      {/* Menu Items Desktop*/}
      <div className='hidden flex-none md:flex md:flex-row'>
        {isAuthenticated && (
          <ul className='menu menu-horizontal flex-row space-x-4 p-0'>
            {role === 1 ? (
              <>
                <li>
                  <NavLink className='btn btn-ghost' to='/usersPanel'>
                    {t('header.users')}
                  </NavLink>
                </li>
                <li>
                  <NavLink className='btn btn-ghost' to='/deviceManagment'>
                    {t('header.devices')}
                  </NavLink>
                </li>
                <li>
                  <NavLink className='btn btn-ghost' to='/maintenance'>
                    {t('header.maintenance')}
                  </NavLink>
                </li>
              </>
            ) : role === 2 ? (
              <>
                <li>
                  <NavLink className='btn btn-ghost' to='/deviceManagment'>
                    {t('header.devices')}
                  </NavLink>
                </li>
                <li>
                  <NavLink className='btn btn-ghost' to='/maintenance'>
                    {t('header.maintenance')}
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink className='btn btn-ghost' to='/maintenance'>
                  {t('header.maintenance')}
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </div>
      {/* Menu Items Mobile */}
      <div className='dropdown dropdown-end md:hidden'>
        {isAuthenticated && (
          <>
            <div tabIndex={0} role='button' className='btn m-1 bg-Blue50'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu dropdown-content z-[1] w-52 rounded-box bg-Blue50 p-2 shadow'
            >
              {role === 1 ? (
                <>
                  <li>
                    <NavLink className='btn btn-ghost' to='/usersPanel'>
                      {t('header.maintenance')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className='btn btn-ghost' to='/deviceManagment'>
                      {t('header.maintenance')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className='btn btn-ghost' to='/maintenance'>
                      {t('header.maintenance')}
                    </NavLink>
                  </li>
                </>
              ) : role === 2 ? (
                <>
                  <li>
                    <NavLink className='btn btn-ghost' to='/deviceManagment'>
                      {t('header.maintenance')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className='btn btn-ghost' to='/maintenance'>
                      {t('header.maintenance')}
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink className='btn btn-ghost' to='/maintenance'>
                    {t('header.maintenance')}
                  </NavLink>
                </li>
              )}
            </ul>
          </>
        )}
      </div>

      {/* Avatar Dropdown */}
      <div className='flex-none'>
        {isAuthenticated && (
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='avatar btn btn-circle btn-ghost'
            >
              <div className='w-10 rounded-full'>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/3541/3541871.png'
                  alt='Avatar Tailwind CSS Component'
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-Blue50 p-2 shadow'
            >
              <li>
                <button onClick={handleLogout}>{t('header.logout')}</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header

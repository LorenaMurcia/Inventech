import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="navbar bg-Blue50 shadow">
      <div className="flex-1">
        <NavLink className="btn btn-ghost text-xl" to={"/"}>Inventech</NavLink>
      </div>

      {/* Menu Items Desktop*/}
      <div className="hidden flex-none md:flex md:flex-row">
        <ul className="menu menu-horizontal flex-row space-x-4 p-0">
          <li><NavLink className="btn btn-ghost" to="/usersPanel">Users</NavLink></li>
          <li><NavLink className="btn btn-ghost" to="/deviceManagment">Devices</NavLink></li>
          <li><NavLink className="btn btn-ghost" to="/maintenance">Maintenance</NavLink></li>
        </ul>
      </div>
      {/* Menu Items Mobile */}
      <div className="dropdown dropdown-end md:hidden">
        <div tabIndex={0} role="button" className="btn m-1 bg-Blue50">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
        <ul tabIndex={0} className="menu dropdown-content z-[1] w-52 rounded-box bg-Blue50 p-2 shadow">
          <li><NavLink className="btn btn-ghost" to="/usersPanel">Users</NavLink></li>
          <li><NavLink className="btn btn-ghost" to="/deviceManagment">Devices</NavLink></li>
          <li><NavLink className="btn btn-ghost" to="/maintenance">Maintenance</NavLink></li>
        </ul>
      </div>

      {/* Avatar Dropdown */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <img
                alt="Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-Blue50 p-2 shadow">
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header

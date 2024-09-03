import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className="navbar bg-Blue50 shadow">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Inventech</a>
      </div>
      <div className="flex">
        <ul className="menu menu-horizontal p-0">
          <li><NavLink className="btn btn-ghost" to={"/usersPanel"}>Users</NavLink></li>
          <li><NavLink className="btn btn-ghost" to={"/deviceManagment"}>Devices</NavLink></li>
          <li><NavLink className="btn btn-ghost" to={"/maintenance"}>Maintance</NavLink></li>
        </ul>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header

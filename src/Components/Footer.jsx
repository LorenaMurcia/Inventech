import React from 'react'

function Footer() {
  return (
    <footer className="footer footer-center rounded bg-Blue950 p-10 text-base-content text-white">
      <nav className="grid grid-flow-col gap-4">
        <a className="link-hover link">Lorena Murcia</a>
        <a className="link-hover link">Johan Galeano</a>
        <a className="link-hover link">Sergio Lopez</a>
        <a className="link-hover link">Wendy Medina</a>
      </nav>
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by INVENTECH</p>
      </aside>
</footer>
  )
}

export default Footer

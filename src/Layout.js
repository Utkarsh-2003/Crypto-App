import React from 'react'
import { Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
            <li><Link to='/'>Home</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Layout

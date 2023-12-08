import React from 'react'
import Logo from './Logo'

const Navbar = () => {
  return (
    <div>
      <div className="headerContainer">
        <div className="leftLogo">
          <Logo></Logo>
        </div>
        <div className="rightContent"></div>
      </div>

    </div>
  )
}

export default Navbar
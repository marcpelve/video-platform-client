import React, { Fragment, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#videos">Videos</Nav.Link>
    <Nav.Link href="#favorites">Favorites</Nav.Link>
    <Nav.Link href="#create-video">Add Video</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link to="/videos">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => {
  const [navExpanded, setNavExpanded] = useState(false)

  const openNav = (expanded) => {
    setNavExpanded(expanded)
  }

  const closeNav = () => {
    setNavExpanded(false)
  }

  return (
    <Navbar onToggle={openNav} expanded={navExpanded} bg="primary" variant="dark" expand="md">
      <Navbar.Brand href="#/videos">
        video-platform-client
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav onSelect={closeNav} className="ml-auto">
          { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
          { user ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header

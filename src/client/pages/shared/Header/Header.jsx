import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import MyAlbumsBadgeContainer from './MyAlbumsBadgeContainer';

const Header = () => (
  <Navbar data-testid="header" fixed="top" bg="dark" variant="dark" expand="sm">
    <LinkContainer to="/">
      <Navbar.Brand data-testid="brand">album-brainz</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <LinkContainer to="/my-albums">
          <Nav.Link data-testid="myAlbums">
            My Albums
            <MyAlbumsBadgeContainer data-testid="badge" />
          </Nav.Link>
        </LinkContainer>
        <LinkContainer exact to="/search">
          <Nav.Link data-testid="find">Find</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;

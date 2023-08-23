import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginModal from '../components/login/LoginModal';

const MyHeader = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <div>
      <>
        <LoginModal toggle={toggle} modal={modal} />
        <Navbar>
          <NavbarBrand>
            <Link to="/">HOME</Link>
          </NavbarBrand>
          <Nav>
            <NavItem>
              <NavLink onClick={toggle}>로그인</NavLink>
            </NavItem>
            <NavItem>
              <Link to="/write">
                <NavLink>글쓰기</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/mypage">
                <NavLink>내정보</NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
      </>
    </div>
  );
};

export default MyHeader;

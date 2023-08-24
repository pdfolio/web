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
          <Link to="/">
            <img
              width={150}
              src="https://cdn.imweb.me/thumbnail/20230822/a1f437f8ba5e8.png"
              alt="logo"
            />
          </Link>
          <Nav
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '1%',
            }}
          >
            <Button
              onClick={toggle}
              outline
              style={{ marginRight: '10px', border: 'none' }}
            >
              로그인
            </Button>
            <Link to="/project/write">
              <Button outline style={{ marginRight: '10px', border: 'none' }}>
                글쓰기
              </Button>
            </Link>
            <Link to="/gather/write">
              <Button outline style={{ marginRight: '10px', border: 'none' }}>
                모집
              </Button>
            </Link>
            <Link to="/mypage">
              <Button outline style={{ marginRight: '10px', border: 'none' }}>
                내정보
              </Button>
            </Link>
          </Nav>
        </Navbar>
      </>
    </div>
  );
};

export default MyHeader;

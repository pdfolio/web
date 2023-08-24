import React, { useState } from 'react';
import { Button, Nav, Navbar } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../components/login/LoginModal';
import { isLogin } from '../store/store';
import { logout } from '../utills/userUtils';

const MyHeader = () => {
  const [modal, setModal] = useState(false);
  const { state, setState } = isLogin();
  const nav = useNavigate();
  const logoutHandler = () => {
    logout(setState);
    nav('/');
  };

  const toggle = () => setModal(!modal);
  return (
    <div>
      <>
        <LoginModal toggle={toggle} modal={modal} />
        <Navbar>
          <Link to="/">
            <img
              width={150}
              src="https://github.com/pdfolio/web/assets/71807768/be9bd7df-0b32-484b-a1c9-de9a0a1bda1e"
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
            {!state.isLogin ? (
              <Button
                onClick={toggle}
                outline
                style={{ marginRight: '10px', border: 'none' }}
              >
                로그인
              </Button>
            ) : (
              <>
                <Link to="/gather/1">
                  <Button
                    outline
                    style={{ marginRight: '10px', border: 'none' }}
                  >
                    테스트용1번모집글가기나중에없애야됨
                  </Button>
                </Link>
                <Link to="/project/write">
                  <Button
                    outline
                    style={{ marginRight: '10px', border: 'none' }}
                  >
                    글쓰기
                  </Button>
                </Link>
                <Link to="/gather/write">
                  <Button
                    outline
                    style={{ marginRight: '10px', border: 'none' }}
                  >
                    모집
                  </Button>
                </Link>
                <Link to="/mypage">
                  <Button
                    outline
                    style={{ marginRight: '10px', border: 'none' }}
                  >
                    내정보
                  </Button>
                </Link>
                <Button
                  onClick={logoutHandler}
                  outline
                  style={{ marginRight: '10px', border: 'none' }}
                >
                  로그아웃
                </Button>
              </>
            )}
          </Nav>
        </Navbar>
      </>
    </div>
  );
};

export default MyHeader;

import React from 'react';
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import LoginButton from './LoginButton';

const LoginModal = ({ toggle, modal }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>로그인</ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            <Col>
              <LoginButton provider="google" />
            </Col>
            <Col>
              <LoginButton provider="kakao" />
            </Col>
            <Col>
              <LoginButton provider="github" />
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          취소
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LoginModal;

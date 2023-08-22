import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const LoginModal = ({ toggle, modal }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>로그인</ModalHeader>
      <ModalBody>
        <Button>구글</Button>
        <Button>깃허브</Button>
        <Button>카카오</Button>
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

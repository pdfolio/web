import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { oauth2Uri } from '../../networks/member/oauth2Api';

const LoginButton = ({ provider }) => {
  const oauth2Handler = () => {
    window.location.assign(oauth2Uri[provider]);
  };

  return (
    <Container>
      <Row>
        <Button outline color="info" onClick={oauth2Handler}>
          <Col>
            <img width={30} src={`/img/${provider}.png`} alt="oauth2Login" />
          </Col>
          <Col>
            <p>{provider}</p>
          </Col>
        </Button>
      </Row>
    </Container>
  );
};

export default LoginButton;

import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import { skillList } from '../../utills/skillList';
import { oauth2PostApi } from '../../networks/member/oauth2Api';
import { useNavigate } from 'react-router-dom';
import { loginSuccessHandler } from '../../utills/userUtils';
import { isLogin } from '../../store/store';

const SignupPage = () => {
  const nav = useNavigate();
  const { accessToken, providerName } = JSON.parse(
    sessionStorage.getItem('signup'),
  );
  const { state, setState } = isLogin();

  const [skills, setSkills] = useState([]);

  const signup = async () => {
    try {
      const data = await oauth2PostApi(
        `/api/v1/oauth2/${'google'}/signup`,
        'POST',
        {
          accessToken,
          nickName: form.nickName,
          imageUrl: form.imageUrl,
          skills,
        },
      );
      loginSuccessHandler(data, setState);
      alert('signup success');
      nav('/');
    } catch (e) {
      alert('signup fail');
    }
  };

  const skillChangeHandler = (e) => {
    setSkills((prev) => [...prev, e.target.value]);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [form, setForm] = useState({
    nickName: '',
    imageUrl: '',
  });

  return (
    <Container fluid="md">
      <Form>
        <FormGroup row>
          <Label for="provider" sm={2}>
            가입
          </Label>
          <Col sm={10}>
            <Input
              id="provider"
              name="provider"
              value={providerName}
              disabled
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="nickName" sm={2}>
            닉네임
          </Label>
          <Col sm={10}>
            <Input
              id="nickName"
              name="nickName"
              value={form.nickName}
              onChange={onChangeHandler}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="skills" sm={2}>
            기술스택
          </Label>
          <Col sm={10}>
            {skills.map((skill) => (
              <Badge color="primary">{skill}</Badge>
            ))}
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="skills" sm={2}></Label>{' '}
          <Col sm={10}>
            <Input
              id="skillSelect"
              name="skillSelect"
              type="select"
              onChange={skillChangeHandler}
            >
              {skillList.map((skill) => (
                <option value={skill}>{skill}</option>
              ))}
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="imageUrl" sm={2}>
            프로필
          </Label>
          <Col sm={10}>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="text"
              value={form.imageUrl}
              onChange={onChangeHandler}
            />
            <FormText>바꾸고 싶은 이미지의 주소를 넣어주세요.</FormText>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col
            sm={{
              offset: 5,
              size: 10,
            }}
          >
            <Button onClick={signup}>가입</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default SignupPage;

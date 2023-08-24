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
import { memberApi } from '../../networks/member/memberApi';
import { skillList } from '../../utills/skillList';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const nav = useNavigate();
  const [member, setMember] = useState({
    id: '',
    name: '',
    nickName: '',
    providerName: '',
    imageUrl: '',
  });

  const withdraw = async () => {
    try {
      const data = await memberApi(`/api/v1/member`, 'DELETE', {});
      alert('withdraw success');
      localStorage.clear();
      sessionStorage.clear();
      nav('/');
    } catch (e) {
      alert('fail withdraw member');
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getMember();
  }, []);

  const [memberSkills, setMemberSkills] = useState([]);
  const skillChangeHandler = (e) => {
    const { value } = e.target;
    if (value !== '') {
      setMemberSkills((prev) => [...prev, value]);
    }
  };

  const updateMember = async () => {
    try {
      const data = await memberApi(`/api/v1/member/all`, 'PUT', {
        nickName: member.nickName,
        imageUrl: member.imageUrl,
        skills: memberSkills,
      });
      alert('update success');
      nav('/');
    } catch (e) {
      alert('fail update member');
    }
  };

  const getMember = async () => {
    try {
      const data = await memberApi(`/api/v1/member`, 'GET');
      setMember(data);
      setMemberSkills(data.skills);
    } catch (error) {
      alert('fail get member');
    }
  };

  return (
    <Container fluid="md">
      <Form>
        <FormGroup row>
          <img
            src={member.imageUrl}
            alt="Profile"
            style={{
              width: '300px',
              height: '30vh',
              margin: 'auto',
              borderRadius: '50%',
            }}
          />
        </FormGroup>
        <FormGroup row>
          <Label for="memberId" sm={2}>
            유저번호
          </Label>
          <Col sm={10}>
            <Input id="memberId" name="memberId" value={member.id} disabled />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="name" sm={2}>
            아이디
          </Label>
          <Col sm={10}>
            <Input id="name" name="name" value={member.name} disabled />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="provider" sm={2}>
            가입
          </Label>
          <Col sm={10}>
            <Input
              id="provider"
              name="provider"
              value={member.providerName}
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
              value={member.nickName}
              onChange={onChangeHandler}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="skills" sm={2}>
            기술스택
          </Label>
          <Col sm={10}>
            {memberSkills.map((skill) => (
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
              <option value="">기술스택(이름을 들어봤다)</option>
              {skillList.map((skill) => (
                <option value={skill}>{skill}</option>
              ))}
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="newImageUrl" sm={2}>
            프로필
          </Label>
          <Col sm={10}>
            <Input
              id="newImageUrl"
              name="newImageUrl"
              type="text"
              value={member.imageUrl}
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
            <Button onClick={updateMember}>변경</Button>
            <Button onClick={withdraw}>회원탈퇴</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default Mypage;

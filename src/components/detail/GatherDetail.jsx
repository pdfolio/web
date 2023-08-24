import React, { useEffect, useRef, useState } from 'react';

import remarkGfm from 'remark-gfm';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Badge,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { noTokenApi } from '../../networks/test/commonApi';
import ReactMarkdown from 'react-markdown';

const GatherDetail = ({ setContent }) => {
  const nav = useNavigate();
  const { id } = useParams();
  const [gather, setGather] = useState({
    title: '',
    content: '',
    teamSize: 0,
    contact: '',
    category: 'STUDY',
    startDate: '',
    closeDate: '',
  });

  const [gatherSkills, setGatherSkills] = useState([]);

  const getGather = async () => {
    try {
      const data = await noTokenApi(`/api/v1/gather/detail/${id}`, 'GET', {});
      setGather(data);
      console.log(data);
      setGatherSkills(data.skills);
    } catch (error) {
      alert('fail get member');
    }
  };

  useEffect(() => {
    getGather();
  }, []);

  const [skills, setSkills] = useState([]);
  const skillChangeHandler = (e) => {
    const { value } = e.target;
    if (value !== '') {
      setSkills((prev) => [...prev, value]);
    }
  };

  return (
    <Container fluid="md">
      <Form>
        <FormGroup row>
          <Label for="title" sm={2}>
            제목
          </Label>
          <Col sm={10}>
            <Input id="title" name="title" value={gather.title} disabled />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="teamSize" sm={2}>
            모집
          </Label>
          <Col sm={3}>
            <Input
              id="category"
              name="category"
              value={gather.category}
              type="select"
              disabled
            >
              <option value="STUDY">스터디</option>
              <option value="PROJECT">프로젝트</option>
            </Input>
          </Col>
          <Col sm={3}>
            <Input
              id="teamSize"
              name="teamSize"
              value={gather.teamSize}
              type="number"
              placeholder="모집인원"
              disabled
            />
          </Col>
          <Col sm={2}>
            <Input
              id="startDate"
              name="startDate"
              type="text"
              placeholder=""
              value={gather.startDate.toString().replaceAll(',', '-')}
              disabled
            />
          </Col>

          <Col sm={2}>
            <Input
              id="closeDate"
              name="closeDate"
              type="text"
              placeholder=""
              value={gather.closeDate.toString().replaceAll(',', '-')}
              disabled
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="skills" sm={2}>
            기술스택
          </Label>
          <Col sm={10}>
            {gatherSkills.map((skill) => (
              <Badge color="primary">{skill.skill}</Badge>
            ))}
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="contact" sm={2}>
            연락방법
          </Label>
          <Col sm={10}>
            <Input
              id="contact"
              name="contact"
              value={gather.contact}
              disabled
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="contact" sm={2}>
            내용
          </Label>
          <Col sm={10}>
            <ReactMarkdown
              children={gather.content}
              remarkPlugins={[remarkGfm]}
            />
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};
export default GatherDetail;

import React, { useEffect, useRef, useState } from 'react';

import remarkGfm from 'remark-gfm';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { noTokenApi, tokenApi } from '../../networks/test/commonApi';
import ReactMarkdown from 'react-markdown';
import { isLogin } from '../../store/store';

const ProjectDetail = ({ setContent }) => {
  const nav = useNavigate();
  const { state } = isLogin();
  const { id } = useParams();

  const [project, setProject] = useState({
    title: '',
    content: '',
    description: '',
    repositoryUrl: '',
    publishUrl: '',
    teamSize: 0,
    category: 'STUDY',
  });

  const [projectSkills, setProjectSkills] = useState([]);

  const getProject = async () => {
    try {
      const data = await noTokenApi(`/api/v1/project/${id}`, 'GET', {});
      setProject(data);
      setProjectSkills(data.skillStacks);
      console.log(data);
    } catch (error) {
      alert('fail get project');
      nav('/');
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <Container
      fluid="md"
      style={{ border: 'solid 1px lightgray', padding: '3%' }}
    >
      <Form>
        <FormGroup row>
          <Label for="title" sm={2}>
            제목
          </Label>
          <Col sm={10}>
            <Input id="title" name="title" value={project.title} disabled />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="title" sm={2}>
            요약
          </Label>
          <Col sm={10}>
            <Input
              id="description"
              name="description"
              value={project.description}
              disabled
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="skills" sm={2}>
            기술스택
          </Label>
          <Col sm={10}>
            {projectSkills.map((skill) => (
              <Badge color="primary">{skill.skillName}</Badge>
            ))}
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="repositoryUrl" sm={2}>
            GIT
          </Label>
          <Col sm={10}>
            <Input
              id="repositoryUrl"
              name="repositoryUrl"
              value={project.repositoryUrl}
              disabled
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="publishUrl" sm={2}>
            배포주소
          </Label>
          <Col sm={10}>
            <Input
              id="publishUrl"
              name="publishUrl"
              value={project.publishUrl}
              disabled
            />
          </Col>
        </FormGroup>

        <FormGroup
          row
          style={{
            border: 'solid 1px lightgray',
            padding: '3%',
          }}
        >
          <Col sm={10}>
            <ReactMarkdown
              children={project.content}
              remarkPlugins={[remarkGfm]}
            />
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};
export default ProjectDetail;

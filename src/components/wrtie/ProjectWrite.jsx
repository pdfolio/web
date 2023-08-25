import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
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
import { skillList } from '../../utills/skillList';
import { tokenApi } from '../../networks/test/commonApi';
import { useNavigate } from 'react-router-dom';

const ProjectWrite = ({ setContent }) => {
  const editorRef = useRef();
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    repositoryUrl: '',
    publishUrl: '',
    thumbNailUrl: '',
  });

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [skills, setSkills] = useState([]);
  const skillChangeHandler = (e) => {
    const { value } = e.target;
    if (value !== '') {
      setSkills((prev) => [...prev, value]);
    }
  };
  const postProject = async () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();

    try {
      const data = await tokenApi(`/api/v1/project`, 'POST', {
        ...form,
        content,
        projectSkills: skills,
      });
      alert('post success');
      nav('/');
    } catch (e) {
      alert('post fail');
    }
  };

  return (
    <Container
      fluid="md"
      style={{
        border: 'solid 1px lightgray',
        padding: '3%',
      }}
    >
      <Form>
        <FormGroup row>
          <Label for="title" sm={2}>
            제목
          </Label>
          <Col sm={10}>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={formChangeHandler}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="description" sm={2}>
            요약
          </Label>
          <Col sm={10}>
            <Input
              id="description"
              name="description"
              value={form.description}
              onChange={formChangeHandler}
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
              <option value="">기술스택</option>
              {skillList.map((skill) => (
                <option value={skill}>{skill}</option>
              ))}
            </Input>
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
              value={form.repositoryUrl}
              onChange={formChangeHandler}
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
              value={form.publishUrl}
              onChange={formChangeHandler}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="thumbNailUrl" sm={2}>
            썸네일이미지
          </Label>
          <Col sm={10}>
            <Input
              id="thumbNailUrl"
              name="thumbNailUrl"
              value={form.thumbNailUrl}
              onChange={formChangeHandler}
            />
          </Col>
        </FormGroup>
      </Form>
      <Editor
        previewStyle="vertical"
        height="300px"
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['image', 'link'],
          ['code', 'codeblock'],
        ]}
        ref={editorRef}
      ></Editor>

      <div
        style={{ display: 'flex', justifyContent: 'flex-end', margin: '1%' }}
      >
        <Button onClick={postProject}>등록</Button>
      </div>
    </Container>
  );
};

export default ProjectWrite;

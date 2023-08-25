import React, { useRef, useState } from 'react';
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
import { Editor } from '@toast-ui/react-editor';
import { useNavigate } from 'react-router-dom';
import { tokenApi } from '../../networks/test/commonApi';

const GatherWrite = ({ setContent }) => {
  const editorRef = useRef();
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: '',
    teamSize: 0,
    contact: '',
    category: 'STUDY',
    startDate: new Date(),
    closeDate: new Date(),
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
  const postGather = async () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();

    try {
      const data = await tokenApi(`/api/v1/gather`, 'POST', {
        ...form,
        content,
        skills,
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
          <Label for="teamSize" sm={2}>
            모집
          </Label>
          <Col sm={3}>
            <Input
              id="category"
              name="category"
              type="select"
              onChange={formChangeHandler}
            >
              <option value="STUDY">스터디</option>
              <option value="PROJECT">프로젝트</option>
            </Input>
          </Col>
          <Col sm={3}>
            <Input
              id="teamSize"
              name="teamSize"
              type="number"
              placeholder="모집인원"
              onChange={formChangeHandler}
            />
          </Col>

          <Col sm={2}>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              placeholder=""
              onChange={formChangeHandler}
            />
          </Col>
          <Col sm={2}>
            <Input
              id="closeDate"
              name="closeDate"
              type="date"
              placeholder=""
              onChange={formChangeHandler}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="skills" sm={2}>
            기술스택
          </Label>
          <Col sm={10}>
            {skills.map((skill, index) => (
              <Badge key={index} color="primary">
                {skill}
              </Badge>
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
              {skillList.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </Input>
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
              value={form.contact}
              onChange={formChangeHandler}
              placeholder="구글 폼, 카카오톡 오픈채팅..."
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
        <Button onClick={postGather}>등록</Button>
      </div>
    </Container>
  );
};
export default GatherWrite;

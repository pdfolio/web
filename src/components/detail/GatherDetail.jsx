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

const GatherDetail = ({ setContent }) => {
  const nav = useNavigate();
  const { state } = isLogin();
  const { id } = useParams();
  const [newComment, setNewComment] = useState();
  const [reply, setReply] = useState({
    isReply: false,
    commentId: 0,
  });
  const [gather, setGather] = useState({
    title: '',
    content: '',
    teamSize: 0,
    gatherCommentList: [],
    contact: '',
    category: 'STUDY',
    startDate: '',
    closeDate: '',
  });

  const [gatherSkills, setGatherSkills] = useState([]);

  const getGather = async () => {
    setNewComment('');
    try {
      const data = await noTokenApi(`/api/v1/gather/detail/${id}`, 'GET', {});
      setGather(data);
      console.log(data);
      setGatherSkills(data.skills);
    } catch (error) {
      alert('fail get member');
    }
  };

  const deleteComment = async (e, commentId) => {
    console.log(e, commentId);
    try {
      const data = await noTokenApi(
        `/api/v1/gather/comment/${commentId}`,
        'DELETE',
        {},
      );
      getGather();
    } catch (error) {
      alert('fail delete comment');
    }
  };

  const deleteReply = async (e, commentId) => {
    console.log(e, commentId);
    try {
      const data = await noTokenApi(
        `/api/v1/gather/reply/${commentId}`,
        'DELETE',
        {},
      );
      getGather();
    } catch (error) {
      alert('fail delete reply');
    }
  };

  const postComment = async () => {
    try {
      const data = await tokenApi(`/api/v1/gather/comment`, 'POST', {
        gatherId: id,
        content: newComment,
      });
      getGather();
    } catch (error) {
      alert('fail post comment');
    }
  };

  const postReply = async () => {
    try {
      const data = await tokenApi(`/api/v1/gather/reply`, 'POST', {
        commentId: reply.commentId,
        content: newComment,
      });
      setReply({
        isReply: false,
        commentId: 0,
      });
      getGather();
    } catch (error) {
      alert('fail reply comment');
    }
  };

  useEffect(() => {
    getGather();
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
              value={gather.teamSize + '명 모집'}
              type="text"
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

        <FormGroup row style={{ border: 'solid 1px lightgray', padding: '3%' }}>
          <Col sm={10}>
            <ReactMarkdown
              children={gather.content}
              remarkPlugins={[remarkGfm]}
            />
          </Col>
        </FormGroup>

        <FormGroup row style={{ border: 'solid 1px lightgray', padding: '3%' }}>
          <Label
            for="comment"
            sm={2}
            onClick={(e) => setReply({ isReply: false, commentId: 0 })}
          >
            댓글달기
          </Label>
          {reply.isReply || (
            <>
              <Col sm={8}>
                <Input
                  id="comment"
                  name="comment"
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
              </Col>
              <Col sm={2}>
                <Button outline onClick={postComment}>
                  등록
                </Button>
              </Col>
            </>
          )}
        </FormGroup>
        {gather.gatherCommentList.map((comment, index) => (
          <FormGroup
            row
            key={index}
            style={{ border: 'solid 1px lightgray', padding: '3%' }}
          >
            <Label
              id={comment.id}
              for={comment.nickName}
              onClick={(e) =>
                setReply({ isReply: true, commentId: e.target.id })
              }
              sm={2}
            >
              ⏺️{comment.nickName}
            </Label>
            <Col sm={8}>
              <Input
                id={comment.id}
                name="comment"
                disabled
                value={comment.content}
              />
            </Col>
            {comment.memberId == state.info.id && (
              <Col sm={2}>
                <Button outline onClick={(e) => deleteComment(e, comment.id)}>
                  삭제
                </Button>
              </Col>
            )}
            {reply.isReply && reply.commentId == comment.id && (
              <FormGroup row style={{ marginTop: '1%' }}>
                <Label for="newReply" sm={2}>
                  대댓글달기
                </Label>
                <Col sm={8}>
                  <Input
                    id="newReply"
                    name="newReply"
                    value={newComment}
                    onChange={(e) => {
                      setNewComment(e.target.value);
                    }}
                  />
                </Col>
                <Col sm={2}>
                  <Button outline onClick={postReply}>
                    등록
                  </Button>
                </Col>
              </FormGroup>
            )}
            <div style={{ marginTop: '2%' }}>
              {comment.gatherReplies.map((reply, index) => (
                <FormGroup row key={index} style={{ marginLeft: '1%' }}>
                  <Label for="comment" sm={2}>
                    ➡️{reply.nickName}
                  </Label>
                  <Col sm={8}>
                    <Input
                      id="comment"
                      name="comment"
                      disabled
                      value={reply.content}
                    />
                  </Col>
                  {reply.memberId == state.info.id && (
                    <Col sm={2}>
                      <Button
                        outline
                        onClick={(e) => {
                          deleteReply(e, reply.id);
                        }}
                      >
                        삭제
                      </Button>
                    </Col>
                  )}
                </FormGroup>
              ))}
            </div>
          </FormGroup>
        ))}
      </Form>
    </Container>
  );
};
export default GatherDetail;

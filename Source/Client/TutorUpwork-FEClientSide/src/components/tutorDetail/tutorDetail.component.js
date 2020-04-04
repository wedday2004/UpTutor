/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';

import { Row, Col, Avatar, Tag, Icon, Button, Rate, Menu, Statistic } from 'antd';
import Swal from 'sweetalert2';
import dateFormat from 'dateformat';
import uuidv1 from 'uuid/v1';
import Contract from './contractInfo';
import Intro from './introduce';
import Comment from './comment';

import { loadOneTutor } from '../../reducers/actions';
import { addressDetail } from '../../utils/location';
import { getListComment } from './action';
import Payment from './payment';
import '../_css/side.css';

import { BubbleChat } from '../tutor/chatbox';
import { useAuth } from '../../context/auth';

const TutorDetail = props => {
  const { history, match } = props;
  const { authTokens } = useAuth();
  const { user, token } = authTokens;
  const [comments, setComments] = useState(false);
  const loadCommentDone = res => {
    console.log(res);
    setComments(res.result);
  };
  useEffect(() => {
    getListComment(match.params.id, loadCommentDone);
  }, []);

  const [menuItem, setMenuItem] = useState(['intro']);
  const [data, setData] = useState(false);
  const [payModal, setPayModal] = useState(false);

  const handleBookClick = () => {
    if (user && user.role === 'student') setPayModal(true);
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn chưa đăng nhập hoặc không có quyền',
        footer: '<a href="/login">Đăng nhập vai trò student ngay !</a>',
      });
    }
  };
  const skillTagHtml = [];
  const done = val => {
    if (val.length < 1) history.push('/');
    const temp = val[0];
    temp.address = addressDetail(val[0].address.city, val[0].address.district);
    setData(temp);
  };

  if (data) {
    data.skills.forEach(skill => {
      skillTagHtml.push(
        <Tag key={uuidv1()} color="blue">
          {skill}
        </Tag>,
      );
    });
  }

  useEffect(() => {
    loadOneTutor(match.params.id, done);
  }, []);

  const menuHandleClick = e => {
    setMenuItem([e.key]);
  };

  const Side = () => {
    if (menuItem[0] === 'intro') return <Intro intro={!data ? 'Loading...' : data.intro} />;
    if (menuItem[0] === 'history') return <Contract contracts={!data ? false : data.contracts} />;
    if (menuItem[0] === 'comment')
      return (
        <Comment
          user={user}
          tutor={match.params.id}
          setComments={setComments}
          comments={comments}
          token={token}
        />
      );

    return <Intro />;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Payment
        data={data}
        payModal={payModal}
        setPayModal={setPayModal}
        studentID={user ? user.id : false}
        token={token}
      />
      <Row
        type="flex"
        justify="center"
        align="middle"
        className="loginRow"
        style={{ width: '95%' }}
      >
        <Col span={6} className="customCol">
          <div className="sideBox userSide">
            <div className="userInfoSide">
              <h3 style={{ fontWeight: 'bold', marginBottom: '20px' }}>THÔNG TIN CƠ BẢN</h3>
              <Avatar
                icon="user"
                style={{ backgroundColor: '#87d068', verticalAlign: 'middle' }}
                size={100}
                src={!data ? '' : data.avatar}
              >
                H
              </Avatar>

              <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Gia sư</p>
              <Rate value={data.star} disabled allowHalf />
              <div className="info" style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                  <Icon type="check-circle" style={{ marginRight: '5px' }} />
                  {!data ? 'Loading...' : data.successRate} %
                </p>
              </div>
              <div className="userInfo">
                <div className="info" style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                    <Icon type="user" style={{ marginRight: '5px' }} />
                    {!data ? 'Loading...' : data.name}
                  </p>
                </div>

                <div className="info" style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                    <Icon type="home" style={{ marginRight: '5px' }} />
                    {!data ? 'Loading...' : data.address.cityName.name}
                  </p>
                </div>
                <div className="info" style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                    <Icon type="home" style={{ marginRight: '5px' }} />
                    {!data ? 'Loading...' : data.address.disName.name}
                  </p>
                </div>

                <div className="info" style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                    <Icon type="man" style={{ marginRight: '5px' }} />

                    {!data ? 'Loading...' : `${data.gender} | ${dateFormat(data.birthday, 'yyyy')}`}
                  </p>
                </div>

                <div className="info" style={{ display: 'flex', flexDirection: 'row' }}>
                  <Icon type="dollar" style={{ marginRight: '5px' }} />
                  <Statistic
                    groupSeparator="."
                    style={{
                      display: 'inline-block',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      margin: '0px',
                      lineHeight: 'normal',
                    }}
                    value={!data ? 0 : data.price}
                  />
                  <p
                    style={{
                      display: 'inline-block',
                      fontWeight: 'bold',
                      margin: '0px',
                      lineHeight: 'normal',
                    }}
                  >
                    {' '}
                    VND/giờ
                  </p>
                </div>
                <div className="info" style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                    <Icon type="book" style={{ marginRight: '5px' }} />
                    Kỹ năng
                  </p>
                </div>
                <div>{skillTagHtml}</div>
              </div>
            </div>
            <div className="userInfoSide">
              <Button
                type="primary"
                className="login-form-button"
                style={{ fontWeight: 'bold', marginBottom: '10px' }}
                onClick={() => handleBookClick()}
              >
                Đặt
              </Button>
            </div>
          </div>
        </Col>
        <Col span={18} className="customCol">
          <div className="sideBox userSide">
            <div className="contractSide">
              <Menu onSelect={e => menuHandleClick(e)} selectedKeys={menuItem} mode="horizontal">
                <Menu.Item key="intro">
                  <Icon type="mail" />
                  <p style={{ fontWeight: 'bold', display: 'inline' }}> Giới thiệu</p>
                </Menu.Item>
                <Menu.Item key="history">
                  <Icon type="appstore" />
                  <p style={{ fontWeight: 'bold', display: 'inline' }}> Lịch sử</p>
                </Menu.Item>
                <Menu.Item key="comment">
                  <Icon type="question" />
                  <p style={{ fontWeight: 'bold', display: 'inline' }}> Đánh giá</p>
                </Menu.Item>
              </Menu>
              <Side />
            </div>
          </div>
        </Col>
      </Row>
      {data ? (
        <BubbleChat
          history={history}
          userData={{
            avatar: data.avatar,
            name: data.name,
            id: data.id,
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default TutorDetail;

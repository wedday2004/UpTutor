/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar, Tag, Icon, Button, Rate, Menu, Statistic } from 'antd';
import dateFormat from 'dateformat';
import Contract from './contractInfo';
import Intro from './introduce';
import Comment from './comment';
import { addressDetail } from '../../utils/location';
import StatisticComponent from './statistic';
import LogOut from '../logout';
import '../_css/side.css';
import { loadOneTutor } from '../../reducers/actions';
import { getListContractByTime } from './action';
import { useAuth } from '../../context/auth';

const TutorHome = props => {
  const { authTokens } = useAuth();
  const { user, token } = authTokens;
  const [menuItem, setMenuItem] = useState(['intro']);
  const [data, setData] = useState(false);
  const [timeRange, setTimeRange] = useState([]);
  const [statisticData, setStatisticData] = useState(false);
  const skillTagHtml = [];
  const done = val => {
    if (val.length < 1) props.history.push('/');
    const temp = val[0];
    temp.address = addressDetail(val[0].address.city, val[0].address.district);
    setData(temp);
  };
  if (data) {
    data.skills.forEach(skill => {
      skillTagHtml.push(<Tag color="blue">{skill}</Tag>);
    });
  }
  const loadStatisticDone = res => {
    setStatisticData(res);
  };
  useEffect(() => {
    getListContractByTime(user.id, '2000/01/01', '2030/01/01', loadStatisticDone);
    loadOneTutor(user.id, done);
  }, []);

  const menuHandleClick = e => {
    setMenuItem([e.key]);
  };

  const Side = () => {
    if (menuItem[0] === 'intro') return <Intro intro={!data ? 'Loading...' : data.intro} />;
    if (menuItem[0] === 'history')
      return (
        <Contract
          data={data && data.contracts.length > 0 ? data : false}
          setData={setData}
          token={token}
        />
      );
    if (menuItem[0] === 'comment') return <Comment comments={!data ? false : []} user={data} />;
    if (menuItem[0] === 'statistic')
      return (
        <StatisticComponent
          statisticData={statisticData.data}
          setStatisticData={setStatisticData}
          getListContractByTime={getListContractByTime}
          loadStatisticDone={loadStatisticDone}
          tutorId={user.id}
          setTimeRange={setTimeRange}
          timeRange={timeRange}
        />
      );
    return <Intro />;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                  />{' '}
                  <p
                    style={{
                      display: 'inline-block',
                      fontWeight: 'bold',
                      margin: '0px',
                      lineHeight: 'normal',
                    }}
                  >
                    {'  '}
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
              <Link to="/mess">
                <Button
                  type="primary"
                  className="login-form-button"
                  style={{ fontWeight: 'bold', marginBottom: '10px' }}
                >
                  Chat
                </Button>
              </Link>

              <Link to="/me">
                <Button
                  type="primary"
                  className="login-form-button"
                  style={{ fontWeight: 'bold', marginBottom: '10px' }}
                >
                  Cập nhật thông tin
                </Button>
              </Link>
              <LogOut />
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
                  <p style={{ fontWeight: 'bold', display: 'inline' }}> Hợp đồng</p>
                </Menu.Item>
                <Menu.Item key="comment">
                  <Icon type="question" />
                  <p style={{ fontWeight: 'bold', display: 'inline' }}> Đánh giá</p>
                </Menu.Item>
                <Menu.Item key="statistic">
                  <Icon type="question" />
                  <p style={{ fontWeight: 'bold', display: 'inline' }}>Thống kê</p>
                </Menu.Item>
              </Menu>
              <Side />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TutorHome;

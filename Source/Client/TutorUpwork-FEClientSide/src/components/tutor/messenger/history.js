/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { Button, Icon, Input, Form, Avatar } from 'antd';
import { MessageList } from 'react-chat-elements';
import './index.css';
import { useAuth } from '../../../context/auth';

export const MessengerArea = props => {
  const { data, me } = props;
  const [text, setText] = useState('');
  const { authTokens } = useAuth();
  console.log(data.room);
  const dataSource = data.messages.map(val => ({
    position: val.id === me ? 'right' : 'left',
    type: 'text',
    text: val.content,
    date: val.date,
  }));
  const person = me === data.person1.id ? data.person2 : data.person1;
  const { send } = props;
  const submit = (
    <Button
      type="primary"
      htmlType="submit"
      className="login-form-button"
      style={{ fontWeight: 'bold', height: '5vh' }}
    >
      <Icon type="check" />
    </Button>
  );
  const onChange = ({ target }) => {
    setText(target.value);
  };
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        if (text) {
          authTokens.socket.emit('chat', data.room, text, person.id);
          send(text);
          setText('');
        }
      }}
      style={{ marginLeft: 10 }}
    >
      <div className="name">
        <Avatar src={person.avatar} size="large" />
        <h1>{person.name || 'Chưa cập nhật tên'}</h1>
      </div>
      <MessageList className="message-list" toBottomHeight="100%" dataSource={dataSource} />
      <Form.Item
        wrapperCol={{ span: 24 }}
        style={{
          width: '85%',
          display: 'inline-block',
        }}
      >
        <Input
          className="input"
          // style={{ height: 30 }}
          placeholder="Type here..."
          value={text}
          onChange={onChange}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{ span: 24 }}
        style={{
          width: '10%',
          display: 'inline-block',
          marginRight: 10,
          marginLeft: 10,
        }}
      >
        {submit}
      </Form.Item>
    </Form>
  );
};

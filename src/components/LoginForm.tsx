import React from 'react';
import { Button, Checkbox, Form, Input, Row, Typography, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { firebaseErrorCodes } from '../utilities/util';

const LoginForm: React.FC<{
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setHasAccount, setLoggedIn }) => {
  const [api, contextHolder] = message.useMessage();
  const [loginLoading, setLoginLoading] = React.useState(false);
  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };
  const onFinish = async (values: { [key: string]: string }) => {
    setLoginLoading(true);
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success('Login Successful');
      setLoggedIn(true);
    } catch (error: any) {
      message.error(
        error.code === firebaseErrorCodes.invalidLogin
          ? 'Invalid Username/Password'
          : 'Failed to Login'
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Form
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          name='email'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input
            style={{ background: 'white' }}
            placeholder='Email'
            addonAfter={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            style={{ background: 'white' }}
            placeholder='Password'
            addonAfter={<LockOutlined />}
          />
        </Form.Item>

        <Row style={{ width: '100%' }} justify={'space-between'}>
          <Form.Item<FieldType> name='remember' valuePropName='checked'>
            <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
          </Form.Item>
          <Typography.Link
            style={{ color: 'white', textDecoration: 'underline' }}
            onClick={() => {
              setHasAccount(false);
            }}
          >
            No Account? Sign Up
          </Typography.Link>
        </Row>
        <Row justify={'center'}>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loginLoading}>
              Login
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default LoginForm;

import React from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  message,
} from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { addOrEditDoc } from '../utilities/util';
const SignUpForm: React.FC<{
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setHasAccount, setLoggedIn }) => {
  const [api, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: { [key: string]: string }) => {
    const { name, lastname, email, password } = values;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const id = credentials.user.uid;
      await addOrEditDoc('add', 'users', id, {
        name,
        lastname,
      })
        .then(async () => {
          message.success('Registration Successful');
          await addOrEditDoc('add', 'cells', id, {
            '123456': {
              id: '123456',
              content: `## Documentation
              This is an interactive coding environment. You can write JavaScript, see it executed, and write comprehensive documentation using markdown.
              
              - Click any text cell (including this one) to edit it
              - The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in a following cell!
              - You can show any react component, string, number, or anything else by calling the \`show\` function. This is a function built into this environment.
              - Re-order or delete cells using the buttons on the top right
              - Add new cells by hovering on the divider between each cell
              `,
              variant: 'text',
            },
            '123457': {
              id: '123457',
              content: `// Creating a React Component and showing it!
              const MyComponent = () => {
                return (
                  <button
                    onClick={() => {
                      document.querySelector('#root').parentElement.parentElement.style =
                        'background-color: blue; color: white';
                    }}
                  >
                    Click Me
                  </button>
                );
              };
              
              show(MyComponent);
              `,
              variant: 'code',
            },
          });
          await addOrEditDoc('add', 'order', '1', {
            order: ['123456', '123457'],
          });
          setLoggedIn(true);
        })
        .catch((error: any) => {
          console.log(error);
          message.error('Something went wrong, Please try again later');
        });
      form.resetFields();
    } catch (error: any) {
      message.error(
        error.code === 'auth/email-already-in-use'
          ? 'Existing email detected, Please Login with your Password'
          : 'Registration Failed'
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <Form form={form} name='register' onFinish={onFinish} scrollToFirstError>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input placeholder='First Name' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='lastname'
              rules={[
                {
                  required: true,
                  message: 'Please input your last name!',
                },
              ]}
            >
              <Input placeholder='Last Name' />
            </Form.Item>
          </Col>
        </Row>
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
          <Input placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password').length > 5) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The password must be a minimum of 6 characters!')
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder='Password' />
        </Form.Item>
        <Form.Item
          name='confirm'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder='Confirm Password' />
        </Form.Item>
        <Row style={{ width: '100%' }}>
          <Typography.Link
            style={{ color: 'white', textDecoration: 'underline' }}
            onClick={() => {
              setHasAccount(true);
            }}
          >
            Already Have an Account? Log In
          </Typography.Link>
        </Row>
        <Row justify={'center'} style={{ marginTop: '20px' }}>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              Sign Up
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default SignUpForm;

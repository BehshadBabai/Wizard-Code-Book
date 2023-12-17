import React from 'react';
import { Col, Row, Typography } from 'antd';
import useScreenSize from '../hooks/useScreenSize';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const Login: React.FC<{
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setLoggedIn }) => {
  const scSize = useScreenSize();
  const [hasAccount, setHasAccount] = React.useState(true);
  return (
    <div>
      <Row justify={'center'} style={{ marginTop: '40px' }}>
        <Typography.Title
          style={{ color: 'white' }}
          level={scSize.width > 535 ? 1 : 3}
        >
          Welcome to Wizard Code Book
        </Typography.Title>
      </Row>
      <Row justify={'center'}>
        <Typography.Title
          style={{ color: 'white' }}
          level={scSize.width > 535 ? 3 : 4}
        >
          {hasAccount ? 'Login To Continue' : 'Create an Account'}
        </Typography.Title>
      </Row>
      <Row justify={'center'} style={{ width: '100%', marginTop: '20px' }}>
        <Col xs={20} md={12} xl={8}>
          {hasAccount ? (
            <LoginForm
              setHasAccount={setHasAccount}
              setLoggedIn={setLoggedIn}
            />
          ) : (
            <SignUpForm
              setHasAccount={setHasAccount}
              setLoggedIn={setLoggedIn}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Login;

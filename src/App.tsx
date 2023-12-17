import React from 'react';
import CellList from './components/cellList';
import { auth } from './firebase/firebase';
import Login from './components/Login';
import { fetchSingleDocument } from './utilities/util';
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Spin } from 'antd';

export type UserInfo = {
  name: string;
  lastname: string;
  id: string;
};

const App: React.FC = () => {
  const [pageLoading, setPageLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userinfo, setUserInfo] = React.useState<UserInfo>({
    name: '',
    lastname: '',
    id: '',
  });
  React.useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const dbInfo = (await fetchSingleDocument('users', user.uid)).data();
        setUserInfo({ ...dbInfo, id: user.uid } as UserInfo);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setPageLoading(false);
    });
  }, []);
  return pageLoading ? (
    <Row
      justify={'center'}
      align={'middle'}
      style={{ width: '100%', height: '100vh' }}
    >
      <Spin
        tip='Loading...'
        size='large'
        style={{ color: 'white' }}
        indicator={<LoadingOutlined />}
      />
    </Row>
  ) : loggedIn ? (
    <CellList userInfo={userinfo} setLoggedIn={setLoggedIn} />
  ) : (
    <Login setLoggedIn={setLoggedIn} />
  );
};

export default App;

import { useTypedSelector } from '../hooks/useTypedSelector';
import CellListItem from './cellListItem';
import AddCell from './addCell';
import React, { Fragment, useEffect } from 'react';
import './cellList.css';
import { useActions } from '../hooks/useActions';
import { UserInfo } from '../App';
import { Button, Col, Row, Typography, message } from 'antd';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { CloudUploadOutlined } from '@ant-design/icons';
import { addOrEditDoc } from '../utilities/util';

const CellList: React.FC<{
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo;
}> = ({ setLoggedIn, userInfo }) => {
  const [logoutLoading, setLogoutLoading] = React.useState(false);
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [api, contextHolder] = message.useMessage();
  const wholeCells = useTypedSelector((state) => state.cells);
  const cellsForDb = wholeCells.data;
  const order = wholeCells.order;
  const cells = order.map((id) => cellsForDb[id]);

  const { fetchCells } = useActions();

  useEffect(() => {
    async function effect() {
      if (userInfo) {
        fetchCells(userInfo.id, setPageLoading);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    effect();
  }, []);

  const saveToDb = async () => {
    setSaveLoading(true);
    try {
      await addOrEditDoc('edit', 'order', '1', { order: order });
      await addOrEditDoc('edit', 'cells', userInfo.id, cellsForDb);
      message.success('Progress Saved!');
    } catch (error) {
      message.error('Save Failed. Try Again Later!');
    } finally {
      setSaveLoading(false);
    }
  };

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return pageLoading ? (
    <></>
  ) : (
    <div className='cell-list'>
      {contextHolder}
      <Row justify={'space-between'}>
        <Col>
          <Typography.Title level={1} style={{ color: 'white' }}>
            {userInfo.name} {userInfo.lastname}'s Code Book
          </Typography.Title>
        </Col>
        <Col>
          <Row gutter={10}>
            <Col>
              <Button
                type='primary'
                style={{ background: '#278E21' }}
                loading={saveLoading}
                onClick={saveToDb}
              >
                <CloudUploadOutlined /> Save
              </Button>
            </Col>
            <Col>
              <Button
                type='primary'
                style={{ background: '#DF691A' }}
                loading={logoutLoading}
                onClick={async () => {
                  try {
                    setLogoutLoading(true);
                    await signOut(auth);
                    message.success('Log Out Successful');
                    setLoggedIn(false);
                  } catch (error) {
                    message.error('Log Out Failed');
                  } finally {
                    setLogoutLoading(false);
                  }
                }}
              >
                Logout
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;

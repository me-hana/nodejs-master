import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Button, Input } from '@mui/material';

const ContentWrapper = styled('div')(() => ({
  margin: '100px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '.button-area': {
    marginTop: '30px',
  },
}));

const StyledButton = styled(Button)(() => ({
  margin: '10px',
}));

function App() {
  const [info, setInfo] = useState({ id: '', pw: '' });
  const cookies = new Cookies();

  const setTestCookie = () => {
    cookies.set(
      'test-cookie',
      { name: 'chanchan', nickname: 'boba' },
      {
        path: '/',
        // expires: Math.floor(Date.now() / 1000) + (60 * 60)
      }
    );
  };

  const loginApi = async (user) => {
    axios
      .post('api/user/login', user, { withCredentials: true })
      .then((res) => {
        if (res.data.state) {
          console.log('로그인 요청', res);
        } else {
          console.log('요청은 성공했으나 서버 에러', res);
        }
      })
      .catch((err) => {
        console.log('로그인 요청 에러', err);
      });
  };

  const logoutApi = async () => {
    axios
      .post('api/user/logout', { withCredentials: true })
      .then((res) => {
        if (res.data.state) {
          console.log('로그아웃 요청', res);
        } else {
          console.log('요청은 성공했으나 서버 에러', res);
        }
      })
      .catch((err) => {
        console.log('로그아웃 요청 에러', err);
      });
  };

  return (
    <ContentWrapper>
      <div style={{ fontSize: '3rem', margin: '50px' }}>쿠키 테스트</div>
      <Input
        placeholder="ID"
        onChange={(e) => {
          setInfo({ ...info, id: e.target.value });
        }}
      />
      <Input
        placeholder="Password"
        onChange={(e) => {
          setInfo({ ...info, id: e.target.value });
        }}
      />
      <div className="button-area">
        <StyledButton
          variant="contained"
          onClick={() => {
            loginApi(info);
          }}
        >
          로그인
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={() => {
            logoutApi();
          }}
        >
          로그아웃
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={() => {
            setTestCookie();
          }}
        >
          universal 쿠키 만들기
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={() => {
            console.log('쿠키 볼래!', cookies.get('test-cookie'));
          }}
        >
          universal 쿠키 보기
        </StyledButton>
      </div>
    </ContentWrapper>
  );
}

export default App;

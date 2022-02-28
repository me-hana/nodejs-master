import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button, Input } from "@mui/material";

const ContentWrapper = styled("div")(() => ({
  margin: "100px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  ".button-area": {
    marginTop: "30px",
  },
}));

const StyledButton = styled(Button)(() => ({
  margin: "10px",
}));

function App() {
  const [info, setInfo] = useState({ id: "", pw: "" });

  return (
    <ContentWrapper>
      <div style={{ fontSize: "3rem", margin: "50px" }}>쿠키 테스트</div>
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
        <StyledButton variant="contained">로그인</StyledButton>
        <StyledButton variant="contained">로그아웃</StyledButton>
        <StyledButton variant="contained">universal</StyledButton>
      </div>
    </ContentWrapper>
  );
}

export default App;

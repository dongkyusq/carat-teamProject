import React from "react";
import styled from "styled-components";

const Img = styled.img`
  height: 50px;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100%;
  background-color: #ffd0d0;
  border: none;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  height: 30px;
  border: 0;
  border-radius: 10px;
  outline: none;
`;

const Option = styled.option`
  text-align: center;
`;

const HomeLeft = () => {
  return (
    <LeftDiv>
      <div>
        <Img src="public\img\profileLogo.png" />
        <span>로그인이 필요합니다.</span>
        <br />
        <Button>로그인</Button>
        <form>
          <Select>
            <Option selected hidden>
              정렬 선택
            </Option>
            <Option>MBTI별 게시물 순</Option>
            <Option>인기 게시물 순</Option>
            <Option>최신 게시물 순</Option>
            <Option>오래된 게시물 순</Option>
          </Select>
        </form>
      </div>
      <div>
        <Button>새글 등록하기</Button>
      </div>
    </LeftDiv>
  );
};

export default HomeLeft;

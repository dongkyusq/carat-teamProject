import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SvgIcon } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, setFilter } from "../redux/slices/postSortSlice";

const DropdownPack = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.posts.filter);

  useEffect(() => {
    dispatch(fetchPosts(filter));
  }, [dispatch, filter]);

  const handleMenuSelect = menu => {
    dispatch(setFilter(menu));
  };

  return (
    <NavbarContainer>
      <NavBarP>{filter ? ` ${filter}` : "게시물 정렬"}</NavBarP>
      <NavItem icon={<TuneIcon style={filterIcon} />} onMenuSelect={handleMenuSelect}>
        <DropdownMenu onMenuSelect={handleMenuSelect} />
      </NavItem>
    </NavbarContainer>
  );
};

function NavbarContainer(props) {
  return (
    <Navbar>
      <NavbarItem>{props.children}</NavbarItem>
    </Navbar>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuSelect = menu => {
    props.onMenuSelect(menu);
    setOpen(false);
  };

  return (
    <NavChildren ref={ref}>
      <NavIconBtn onClick={() => setOpen(!open)}>{props.icon}</NavIconBtn>
      {open && React.cloneElement(props.children, { onMenuSelect: handleMenuSelect })}
    </NavChildren>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  const mbtiList = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"];

  function DropdownItem(props) {
    return (
      <MenuItem
        href="#"
        onClick={() => {
          props.goToMenu ? setActiveMenu(props.goToMenu) : props.onMenuSelect(props.children);
        }}
      >
        <BackIcon>{props.leftIcon}</BackIcon>
        {props.children}
      </MenuItem>
    );
  }

  return (
    <Dropdown>
      {activeMenu === "main" && (
        <DropdownBox>
          <DropdownItem onMenuSelect={props.onMenuSelect}>인기 게시물 순</DropdownItem>
          <DropdownItem onMenuSelect={props.onMenuSelect}>최신 게시물 순</DropdownItem>
          <DropdownItem onMenuSelect={props.onMenuSelect}>오래된 게시물 순</DropdownItem>
          <DropdownItem goToMenu="MbtiList">MBTI별 게시물 순</DropdownItem>
        </DropdownBox>
      )}

      {activeMenu === "MbtiList" && (
        <div>
          <DropdownItem leftIcon={<SvgIcon component={ArrowBackIcon} />} goToMenu="main">
            <p>뒤로 가기</p>
          </DropdownItem>
          <MBTIListContainer>
            {mbtiList.map(mbti => (
              <DropdownItem key={mbti} onMenuSelect={props.onMenuSelect}>
                {mbti}
              </DropdownItem>
            ))}
          </MBTIListContainer>
        </div>
      )}
    </Dropdown>
  );
}

const filterIcon = {
  color: "#cc8798",
};

const NavBarP = styled.p`
  text-align: center;
`;

const DropdownBox = styled.div`
  text-align: center;
`;

const BackIcon = styled.span`
  margin: 2px 5px 0 0;
`;

const MenuItem = styled.a`
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 0 10px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #ffd0d0;
    color: white;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  left: -162px;
  width: 205px;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  font-size: 13px;
`;

const NavIconBtn = styled.a`
  width: 30px;
  height: 30px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: transparent;
  transition: filter 300ms;

  &:hover {
    filter: brightness(1.2);
  }
`;

const NavChildren = styled.li`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 170px;
  position: absolute;

  &:hover {
    color: white;
  }
`;

const Navbar = styled.nav`
  background-color: transparent;
  margin-bottom: 180px;
  margin-top: 0;
`;

const NavbarItem = styled.ul`
  max-width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  color: black;
`;

const MBTIListContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: 240px;
`;

export default DropdownPack;

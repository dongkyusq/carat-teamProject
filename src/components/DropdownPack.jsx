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
      <NavItem
        icon={<TuneIcon sx={{ color: "#141233", fontSize: "25px", marginLeft: "5px", position: "absolute", marginTop: "-13px", "&:hover": { color: "#F8CACC" } }} />}
        onMenuSelect={handleMenuSelect}
      >
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
      <a onClick={() => setOpen(!open)}>{props.icon}</a>
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
  top: 0;
  left: 0;
  width: 92%;
  border-radius: 20px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  padding: 10px;
`;

const NavChildren = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Navbar = styled.nav`
  background-color: transparent;
  margin-bottom: 280px;
  position: relative;
  cursor: pointer;
`;
const NavbarItem = styled.ul`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  color: #141233;
  font-weight: bold;
  font-size: 20px;
`;
const MBTIListContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: 240px;
`;
export default DropdownPack;

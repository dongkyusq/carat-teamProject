import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import supabase from "../supabaseClient";

function Search({ userInput, setUserInput }) {
  const [searchfocus, setSearchfocus] = useState(false);
  const [posts, setPosts] = useState([]);

  const searchData = e => {
    setUserInput(e.target.value || "");
  };

  const searchClick = e => {
    e.preventDefault();
    console.log(userInput);
  };

  useEffect(() => {
    const getProducts = async () => {
      let { data, error } = await supabase.from("posts").select("text_content, likes");
      if (error) {
        console.log("error", error);
      } else {
        console.log("data", data);
        setPosts(data);
      }
    };

    getProducts();
  }, []);

  const filteredPosts = posts.filter(post => post.text_content.toLowerCase().includes(userInput || "".toLowerCase())).sort((a, b) => b.likes - a.likes);
  console.log("123", userInput);

  return (
    <>
      <div>
        <SearchBox onSubmit={searchClick}>
          <SearchIcon style={{ color: "#000" }} />
          <input type="text" placeholder="Search" onChange={searchData} onFocus={() => setSearchfocus(true)} onBlur={() => setSearchfocus(false)} searchfocus={searchfocus} />
        </SearchBox>
      </div>
    </>
  );
}

export default Search;

const SearchBox = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 30px;
  border-radius: 99999px;
  background-color: #fff;

  & > input {
    width: calc(100% - 50px);
    height: 35px;
    border: 0;
    border-radius: 30px;
    padding: 0;
    outline: none;
    text-indent: 10px;
    background-color: transparent;

    &::placeholder {
      text-indent: 10px;
    }
  }
`;

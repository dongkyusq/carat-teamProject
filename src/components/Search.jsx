import { useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "../supabaseClient";
import MainFeed from "./MainFeed";

const SearchBox = styled.form`
  flex-shrink: 0;
  position: relative;
  margin-bottom: 30px;

  & > input {
    width: calc(100% - 50px);
    height: 35px;
    border: 0;
    border-radius: 30px;
    padding: 0 10px 0 40px;
  }

  & > button {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border: 0;
  }
`;

const ExpenseItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 4%;
`;

const InputStyle = styled.input`
  border-radius: 20px;
  padding: 10px;
  width: 300px;
  font-size: 16px;
  background-color: ${props => (props.searchFocus ? "#ffff" : "#ffff")};
  outline: none;
  border: ${props => (props.searchFocus ? "1px solid #000" : "1px solid #000 ")};
`;

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
`;

function Search({ userInput, setUserInput }) {
  const [searchFocus, setSearchFocus] = useState(false);
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
          <input type="text" placeholder="Search" onChange={searchData} onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)} searchFocus={searchFocus} />
          <button>
            <svg id="fi_3031293" enableBackground="new 0 0 461.516 461.516" height="20" viewBox="0 0 461.516 461.516" width="20" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="m185.746 371.332c41.251.001 81.322-13.762 113.866-39.11l122.778 122.778c9.172 8.858 23.787 8.604 32.645-.568 8.641-8.947 8.641-23.131 0-32.077l-122.778-122.778c62.899-80.968 48.252-197.595-32.716-260.494s-197.594-48.252-260.493 32.716-48.252 197.595 32.716 260.494c32.597 25.323 72.704 39.06 113.982 39.039zm-98.651-284.273c54.484-54.485 142.82-54.486 197.305-.002s54.486 142.82.002 197.305-142.82 54.486-197.305.002c-.001-.001-.001-.001-.002-.002-54.484-54.087-54.805-142.101-.718-196.585.239-.24.478-.479.718-.718z"></path>
              </g>
            </svg>
          </button>
        </SearchBox>
      </div>

      {/* <div>
        <ExpenseItemList>
          <FormStyle onSubmit={searchClick}>
            <InputStyle onChange={searchData} onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)} searchFocus={searchFocus} type="text" placeholder="🔍︎검색" />
          </FormStyle>
        </ExpenseItemList>
      </div> */}
    </>
  );
}

export default Search;

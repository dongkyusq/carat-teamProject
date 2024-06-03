import { useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "../utils/supabaseClient";

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

function Search() {
  const [userInput, setUserInput] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [posts, setPosts] = useState([]);

  const searchData = e => {
    setUserInput(e.target.value);
  };

  const searchClick = e => {
    e.preventDefault();
    console.log(userInput);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        let { data: posts, error } = await supabase.from("posts").select("text_content");
        if (error) {
          throw error;
        }
        console.log(posts);
        setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <ExpenseItemList>
        <FormStyle onSubmit={searchClick}>
          <InputStyle onChange={searchData} onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)} searchFocus={searchFocus} type="text" placeholder="🔍︎검색" />
        </FormStyle>
        <div>{posts.length > 0 ? posts.map((post, index) => <div key={index}>{post.text_content}</div>) : <div>No posts available</div>}</div>
      </ExpenseItemList>
    </div>
  );
}

export default Search;

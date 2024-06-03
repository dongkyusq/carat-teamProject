import { useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "";
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
      let { data, error } = await supabase.from("posts").select("text_content");
      if (error) {
        console.log("error", error);
      } else {
        console.log("data", data);
        setPosts(data);
      }
    };

    getProducts();
  }, []);

  const filteredPosts = posts.filter(post => post.text_content.toLowerCase().includes(userInput.toLowerCase()));

  return (
    <div>
      <ExpenseItemList>
        <FormStyle onSubmit={searchClick}>
          <InputStyle onChange={searchData} onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)} searchFocus={searchFocus} type="text" placeholder="🔍︎검색" />
        </FormStyle>
        <div>
          {filteredPosts.map((post, index) => (
            <div key={index}>{post.text_content}</div>
          ))}
        </div>
      </ExpenseItemList>
    </div>
  );
}

export default Search;

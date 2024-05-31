import React, { useState } from "react";

function Search() {
  const [userInput, setUserInput] = useState("");

  const searchData = (e) => {
    setUserInput(e.targe.value);
  };

  const searchClick = (e) => {
    e.preventDefault();
    console.log(userInput);
  };

  return (
    <div>
      <form onSubmit={searchClick}>
        <input onChange={searchData} type="text" placeholder="검색" />
        <button>검색</button>
      </form>
    </div>
  );
}

export default Search;

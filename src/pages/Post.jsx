import React from "react";
import { useLocation } from "react-router-dom";
import NewsfeedCreate from "../components/NewsfeedCreate";
import NewsfeedUpdate from "../components/NewsfeedUpdate";

function Post() {
  const location = useLocation();
  console.log("location =>", location.state);

  return <>{location.state === "new" ? <NewsfeedCreate /> : <NewsfeedUpdate />}</>;
}

export default Post;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { fetchAuthMe } from "../redux/slices/auth";
import Pre from "../images/pre.jpg";

export const Home = () => {
  const [tagSelected, setTagSelected] = useState("");
  const userData = useSelector((state) => state.auth.data);

  const { posts, tags } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const isPostsLoading = posts.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const handleTagSelected = (tag) => {
    if (tagSelected === tag) {
      setTagSelected("");
    } else {
      setTagSelected(tag);
    }
  };

  console.log(tags);

  return (
    <>
      {/* <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label='basic tabs example'
      >
        <Tab label='New' />
        <Tab label='Popular' />
      </Tabs> */}
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items)
            .filter((item) =>
              tagSelected !== "" ? item?.tags.includes(tagSelected) : item
            )
            .map((obj, index) =>
              isPostsLoading ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  key={index}
                  _id={obj._id}
                  title={obj.title}
                  imageUrl={
                    obj.imageUrl ? `http://localhost:5000${obj.imageUrl}` : ""
                  }
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={0}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                  handleTagSelected={handleTagSelected}
                  tagSelected={tagSelected}
                />
              )
            )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            handleTagSelected={handleTagSelected}
            tagSelected={tagSelected}
            items={tags.items}
            isLoading={false}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Burul Shambetova",
                  avatarUrl: Pre,
                },
                text: "Nice! 😜",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

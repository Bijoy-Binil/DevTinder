import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { useGetFeedQuery } from "./userApi";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {
  const { data: feed, isLoading, error } = useGetFeedQuery();
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed);

  useEffect(() => {
    if (feed) {
      dispatch(addFeed(feed));
    }
  }, [feed, dispatch]);
  if (error) {
    console.error(`Error: ${error.data}`)
  }
  return (
    <div>
      <FeedCard data={feed} />
    </div>
  );
};
export default Feed;

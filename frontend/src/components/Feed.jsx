import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FeedCard from "./FeedCard";
import { useGetFeedQuery, useSendRequestMutation } from "./userApi";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {
  const { data: feed, isLoading, error } = useGetFeedQuery();
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed);
  const [sendRequest] = useSendRequestMutation();

  useEffect(() => {
    if (feed) {
      dispatch(addFeed(feed));
    }
  }, [feed, dispatch]);

  const handleSwipe = async (userId, status) => {
    try {
      const res = await sendRequest({ status, userId }).unwrap();
      dispatch(removeUserFromFeed(userId));
      toast.success(
        res?.message ||
          (status === "interested" ? "Marked as interested 💜" : "Ignored")
      );
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  if (error) {
    return <h1 className="text-center text-xl mt-10">Error loading feed</h1>;
  }

  if (isLoading || !feeds) {
    return <h1 className="text-center text-xl mt-10">Loading...</h1>;
  }

  if (feeds.length === 0) {
    return (
      <h1 className="text-center text-xl mt-10">
        No new users in your feed 🎉
      </h1>
    );
  }

  return (
    <div className="my-10">
      <FeedCard data={feeds} onSwipe={handleSwipe} />
    </div>
  );
};

export default Feed;

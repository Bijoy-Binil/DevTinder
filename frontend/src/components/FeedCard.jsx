const FeedCard = ({ data: feed = [] }) => {
  return (
    <>
      {feed.map((user) => {
        return (
          <div key={user._id} className="flex justify-center my-10">
            <div className="card card-side bg-base-100 shadow-sm w-125">
              <figure>
                <img
                  src={
                    user?.photo_url ||
                    "https://randomuser.me/api/portraits/men/33.jpg"
                  }
                  alt={user?.firstName}
                  className=" object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">
                  {user?.firstName} {user?.lastName}
                </h2>

                <p>{user?.about}</p>

                <p>Age: {user?.age}</p>

                <div className="flex flex-wrap gap-2">
                  {user?.skills?.map((skill, idx) => (
                    <span key={idx} className="badge badge-primary">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="card-actions justify-end mt-3">
                  <button className="btn btn-primary">Ignore</button>
                  <button className="btn btn-secondary">Interested</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FeedCard;

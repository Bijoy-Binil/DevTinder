const FeedCard = ({ data }) => {
  const users = Array.isArray(data) ? data : [data];

  return (
    <>
      {users.map((user, idx) => {
        if (!user) return null;

        return (
          <div key={idx} className="flex justify-center">
            <div className="relative w-80 h-[550px] rounded-3xl overflow-hidden shadow-2xl bg-base-100">

              {/* Profile Image */}
              <img
                src={
                  user?.photo_url ||
                  "https://randomuser.me/api/portraits/men/33.jpg"
                }
                alt={user?.firstName}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

              {/* Top Badge */}
              <div className="absolute top-4 left-4">
                <span className="badge badge-error text-white px-4 py-3">
                  ONLINE
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-5 text-white">

                {/* Name + Age */}
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>

                  <span className="text-2xl font-semibold">
                    {user?.age}
                  </span>
                </div>

                {/* About */}
                <p className="mt-2 text-sm text-gray-200 line-clamp-3">
                  {user?.about || "No bio available"}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {user?.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs border border-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-6 mt-6">

                  {/* Ignore */}
                  <button className="w-14 h-14 rounded-full bg-white text-red-500 text-2xl shadow-lg hover:scale-110 transition">
                    ✕
                  </button>

                  {/* Interested */}
                  <button className="w-14 h-14 rounded-full bg-pink-500 text-white text-2xl shadow-lg hover:scale-110 transition">
                    ❤
                  </button>

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
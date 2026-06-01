import { useGetConnectionsQuery } from "./profileApi";

const Connections = () => {
  const { data: allConnections, isError, isLoading } =
    useGetConnectionsQuery();

  console.log(allConnections);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error...</h1>;

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-3xl font-bold mb-5">Connections</h1>

      <div className="flex flex-col gap-4">
        {allConnections?.map((user) => {
          const {
            _id,
            firstName,
            lastName,
            age,
            gender,
            photo_url,
            about,
            skills,
          } = user;

          return (
            <div
              key={_id}
              className="bg-base-300 p-5 rounded-xl w-96 shadow-xl"
            >
              <img
                src={photo_url}
                alt={firstName}
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />

              <div className="text-center mt-4">
                <h2 className="text-xl font-bold">
                  {firstName} {lastName}
                </h2>

                <p>
                  {age}, {gender}
                </p>

                <p className="mt-2 text-sm">
                  {about}
                </p>

                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  {skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="badge badge-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
import { useGetRequestQuery, useReviewRequestMutation } from "./profileApi";

const Requests = () => {
  const { data: allRequest, isLoading, isError } = useGetRequestQuery();
  const [reviewRequest, { isSuccess }] = useReviewRequestMutation();

  console.log("allRequest==>", allRequest);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error loading requests</h1>;
  const handleRequest = async (status, requestId) => {
    console.log("status==>", status, requestId);
    await reviewRequest({ status, requestId });
    if (isSuccess) {
      console.log("Success");
    }
  };
  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-3xl font-bold mb-5">Requests</h1>

      <div className="flex flex-col gap-4">
        {allRequest?.data?.map((request) => {
          const { _id, fromUserId, status } = request;

          return (
            <div
              key={_id}
              className="bg-base-300 p-5 rounded-xl w-96 shadow-xl"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold">
                  {fromUserId?.firstName} {fromUserId?.lastName}
                </h2>

                <p className="text-sm mt-2">Status: {status}</p>

                <div className="flex justify-center gap-3 mt-5">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleRequest("accepted", _id)}
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleRequest("rejected", _id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;

import NoDataFound from "@components/NoDataFound";
import useUserConnections from "@hooks/useUserConnections";
import FollowContent from "./FollowContent";
import { Users } from "../../../../../app/data/user";
const Follow = ({ activeTab }) => {
  const {
    data: followData = [],
    loading: followLoading,
    refetch: refetchFollow,
  } = useUserConnections(activeTab);

  return (
    <div>
      {followLoading ? (
        <div>Loading...</div>
      ) : followData.length > 0 ? (
        <FollowContent followData={Users} activeTab={activeTab} />
      ) : (
        <NoDataFound actionType={activeTab} />
      )}
    </div>
  );
};

export default Follow;

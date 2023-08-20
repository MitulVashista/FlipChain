import Card from "../../ui/Card";
import BasicGrid from "../../ui/Grid";
import Spinner from "../../ui/Spinner";
import useDisplayRewards from "./useDisplayRewards";

function DisplayRewards({ brandId }) {
  const { isLoadingRewards, rewardsIds, error } = useDisplayRewards(brandId);
  if (isLoadingRewards) return <Spinner />;
  return (
    <div>
      <h1>Rewards</h1>
      {
        <BasicGrid
          cards={rewardsIds.map((reward) => (
            <Card value={reward} title="Reward Id" />
          ))}
        />
      }
    </div>
  );
}

export default DisplayRewards;

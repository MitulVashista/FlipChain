import useAllRewards from "../features/rewards/useAllRewards";
import Typography from "@mui/material/Typography";
import Spinner from "../ui/Spinner";
import RewardCard from "../ui/RewardCard";
import BasicGrid from "../ui/Grid";

function Rewards() {
  const { isLoadingRewards, brandsRewards, brandNames } = useAllRewards();
  if (isLoadingRewards) return <Spinner />;
  return (
    <div>
      <h1>Rewards</h1>

      {brandsRewards.map((rewards, idx) => (
        <div>
          <Typography variant="h4">{brandNames[idx]}</Typography>
          <BasicGrid
            cards={rewards.map((reward) => (
              <RewardCard value={reward} title="Reward Id" />
            ))}
          />
        </div>
      ))}
    </div>
  );
}

export default Rewards;

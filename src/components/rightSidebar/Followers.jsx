import UserInfo from "../UserInfo";
import configData from "../../Data.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

function Followers() {
  const { address: userAddress } = useAccount();
  const [followerUsers, setFollowerUsers] = useState([]);

  async function handleFollowerDetails() {
    const openCircleContract = {
      contractAddress: configData.MumbaiContractAddress,
      contractAbi: configData.abi,
    };

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      openCircleContract.contractAddress,
      openCircleContract.contractAbi,
      provider
    );

    const allFollowers = await contract.getFollowersAddress(userAddress);
    setFollowerUsers(allFollowers);
  }

  useEffect(() => {
    handleFollowerDetails();
  }, []);

  return (
    <>
      <div className="Rightleft">
        {followerUsers
          .slice(0)
          .reverse()
          .map((followerUsers) => {
            return <UserInfo address={followerUsers} />;
          })}
      </div>
    </>
  );
}
export default Followers;

import UserInfo from "../UserInfo";
import configData from "../../Data.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

function Following() {
  const { address: userAddress } = useAccount();
  const [followingUsers, setFollowingUsers] = useState([]);

  async function handleFollowingDetails() {
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

    const allFollowings = await contract.getFollowingAddresses(userAddress);
    setFollowingUsers(allFollowings);
  }

  useEffect(() => {
    handleFollowingDetails();
  }, []);

  return (
    <>
      <div className="Rightleft">
        {followingUsers
          .slice(0)
          .reverse()
          .map((followingUsers) => {
            return <UserInfo address={followingUsers} />;
          })}
      </div>
    </>
  );
}
export default Following;

import Post from "../Post";
import configData from "../../Data.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

function HomePostContainer() {
  const [posts, setPosts] = useState([]);
  const { address: userAddress } = useAccount();

  async function handleReadPost() {
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

    const allPost = await contract.readFollowingPosts(userAddress);
    setPosts(allPost);
  }

  useEffect(() => {
    handleReadPost();
  }, []);

  return (
    <>
      <div className="middle">
        {posts
          .slice(0)
          .reverse()
          .map((post, index) => {
            return (
              <Post
                key={index}
                id={Number(post.postId)}
                creatorAddress={post.creatorAddress}
                addressOfImage={post.imageAddress}
                postCaption={post.postCaption}
                dateCreated={post.timeCreated}
              />
            );
          })}
      </div>
    </>
  );
}
export default HomePostContainer;

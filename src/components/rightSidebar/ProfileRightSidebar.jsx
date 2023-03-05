import configData from '../../Data.json'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'

function ProfileRightSidebar() {
  const [userImage, setUserImage] = useState('')
  const [userName, setUserNmae] = useState('')
  const [userBio, setUserBio] = useState('')
  const [userFollowings, setUserFollowings] = useState('')
  const [userFollowers, setUserFollowers] = useState('')
  const [userPostsCount, setUserPostsCount] = useState('')
  const { address: userAddress } = useAccount()

  function truncateAddress(address, startLength = 6, endLength = 4) {
    if (!address) {
      return ''
    }

    const truncatedStart = address.substr(0, startLength)
    const truncatedEnd = address.substr(-endLength)

    return `${truncatedStart}...${truncatedEnd}`
  }

  async function handleReadDetails() {
    const openCircleContract = {
      contractAddress: configData.MumbaiContractAddress,
      contractAbi: configData.abi,
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(
      openCircleContract.contractAddress,
      openCircleContract.contractAbi,
      provider,
    )

    const image = await contract.getUserProfileImage(userAddress)
    const name = await contract.getUserName(userAddress)
    const bio = await contract.getUserBio(userAddress)
    const following = await contract.getFollowingsCount(userAddress)
    const follower = await contract.getFollowersCount(userAddress)
    const postsCount = await contract.getUserPostsCount(userAddress)
    setUserImage(image)
    setUserNmae(name)
    setUserBio(bio)
    setUserFollowings(following)
    setUserFollowers(follower)
    setUserPostsCount(postsCount)
  }

  useEffect(() => {
    handleReadDetails()
  }, [])

  return (
    <>
      <div className="img-info">
        <img
          className="profile-photo-bigone"
          src={
            userImage === ''
              ? 'https://gateway.pinata.cloud/ipfs/QmZoaBTva3on5hfoMcT4pm9vS4mtHy4w1RNoa7AmdkwPZ4'
              : userImage
          }
          alt="userImage"
        />
      </div>
      <div className="profileName">
        <h5>{userName === '' ? truncateAddress(userAddress) : userName}</h5>
      </div>
      <div className="profileName">
        <h5 className="user-address">{truncateAddress(userAddress)}</h5>
      </div>
      <div className="info">
        <div className="info-details">
          {Number(userPostsCount)}
          <span className="text-muted"> Posts </span>
        </div>
      </div>
      <div className="info">
        <div className="info-details">
          {Number(userFollowers)}
          <span className="text-muted"> Follower </span>
        </div>
      </div>
      <div className="info">
        <div className="info-details">
          {Number(userFollowings)}
          <span className="text-muted"> Following </span>
        </div>
      </div>

      <div className="bio-box">
        <div className="bio-text">
          {userBio === ''
            ? "Hey there, fellow human! 🙋‍♂️🤖 Tired of social media platforms that treat you like a commodity? Join me on Open Circle, where we're building a decentralized network that puts people first! 🌟🌍 No more ads, no more fake news, no more drama. Just good vibes and shared creativity! 🎨🤗 Don't believe me? Try it for yourself and thank me later! 😜 #OpenCircle #DecentralizedSocialMedia #NoMoreCatVideos 🐱🚫"
            : userBio}
        </div>
      </div>
    </>
  )
}
export default ProfileRightSidebar

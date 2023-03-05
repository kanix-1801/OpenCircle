import React, { useState, useEffect } from 'react'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'
import configData from '../Data.json'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

function Post(props) {
  const [isExpanded, setExpanded] = useState(false)

  function truncateAddress(address, startLength = 6, endLength = 4) {
    if (!address) {
      return ''
    }

    const truncatedStart = address.substr(0, startLength)
    const truncatedEnd = address.substr(-endLength)

    return `${truncatedStart}...${truncatedEnd}`
  }

  function handleReadMoreClick() {
    setExpanded(true)
  }
  function handleReadLessClick() {
    setExpanded(false)
  }

  function timeSince(date) {
    var seconds = Math.floor((Date.now() - date) / 1000)

    var interval = seconds / 31536000

    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + ' year'
      } else {
        return Math.floor(interval) + ' years'
      }
    }
    interval = seconds / 2592000
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + ' month'
      } else {
        return Math.floor(interval) + ' months'
      }
    }
    interval = seconds / 86400
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + ' day'
      } else {
        return Math.floor(interval) + ' days'
      }
    }
    interval = seconds / 3600
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + ' hr'
      } else {
        return Math.floor(interval) + ' hrs'
      }
    }
    interval = seconds / 60
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + ' min'
      } else {
        return Math.floor(interval) + ' mins'
      }
    }
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' sec'
    } else {
      return Math.floor(interval) + ' secs'
    }
  }

  const { address: userAddress } = useAccount()
  const [isFollowingStatus, setFollowingStatus] = useState(false)
  const [userImage, setUserImage] = useState('')
  const [userName, setUserNmae] = useState('')

  const openCircleContract = {
    contractAddress: configData.MumbaiContractAddress,
    contractAbi: configData.abi,
  }

  async function handleFollowingStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(
      openCircleContract.contractAddress,
      openCircleContract.contractAbi,
      provider,
    )
    const status = await contract.isFollowing(userAddress, props.creatorAddress)

    setFollowingStatus(status)
  }

  async function handleFollowUser() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const signer = provider.getSigner()

    const contract = new ethers.Contract(
      openCircleContract.contractAddress,
      openCircleContract.contractAbi,
      signer,
    )

    const tx = await contract.followUser(props.creatorAddress, {
      gasLimit: 300000,
    })
    await tx.wait()
    window.location.reload()
  }

  async function handleUnfollowUser() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const signer = provider.getSigner()

    const contract = new ethers.Contract(
      openCircleContract.contractAddress,
      openCircleContract.contractAbi,
      signer,
    )

    const tx = await contract.unfollowUser(props.creatorAddress, {
      gasLimit: 300000,
    })
    await tx.wait()
    window.location.reload()
  }

  async function handleReadDetails() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(
      openCircleContract.contractAddress,
      openCircleContract.contractAbi,
      provider,
    )

    const image = await contract.getUserProfileImage(props.creatorAddress)
    const name = await contract.getUserName(props.creatorAddress)
    setUserImage(image)
    setUserNmae(name)
  }

  useEffect(() => {
    handleFollowingStatus()
    handleReadDetails()
  }, [])

  return (
    <>
      <div className="feeds">
        <div className="feed">
          <div className="head">
            <div className="user">
              <div className="profile-photo">
                <img
                  src={
                    userImage === ''
                      ? 'https://gateway.pinata.cloud/ipfs/QmZoaBTva3on5hfoMcT4pm9vS4mtHy4w1RNoa7AmdkwPZ4'
                      : userImage
                  }
                  alt="UserImage"
                />
              </div>
              <div className="ingo">
                <h3>
                  {userName === ''
                    ? truncateAddress(props.creatorAddress)
                    : userName}
                </h3>
                <p className="time-duration">
                  {timeSince(props.dateCreated)} {'ago'}
                </p>
              </div>
            </div>
            {props.creatorAddress === userAddress ? null : isFollowingStatus ===
              true ? (
              <span className="follow-icon" onClick={handleUnfollowUser}>
                <GroupRemoveIcon />
              </span>
            ) : (
              <span className="follow-icon" onClick={handleFollowUser}>
                <GroupAddIcon />
              </span>
            )}
          </div>
          <div className="photo">
            {props.addressOfImage === '' ? null : (
              <img src={props.addressOfImage} alt="User's Post" />
            )}
          </div>
          <div className="caption">
            {props.postCaption.length > 200 ? (
              isExpanded ? (
                <p>
                  {props.postCaption}{' '}
                  <span className="read-link" onClick={handleReadLessClick}>
                    <strong className="point">less</strong>
                  </span>
                </p>
              ) : (
                <p>
                  {props.postCaption.substring(0, 200)}

                  {'... '}
                  <span className="read-link" onClick={handleReadMoreClick}>
                    <strong className="point">more</strong>
                  </span>
                </p>
              )
            ) : (
              <p>{props.postCaption}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Post

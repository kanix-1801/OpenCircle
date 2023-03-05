import axios from 'axios'
import React, { useState } from 'react'
import configData from '../../Data.json'
import { ethers } from 'ethers'
// import { useAccount } from 'wagmi'
// import { upload } from '@testing-library/user-event/dist/upload'

function Edit() {
  const [userName, setUserName] = useState()
  const [userBio, setUserBio] = useState()

  function handleNameChange(event) {
    setUserName(event.target.value)
  }

  function handleBioChange(event) {
    setUserBio(event.target.value)
  }

  const openCircleContract = {
    contractAddress: configData.MumbaiContractAddress,
    contractAbi: configData.abi,
  }

  const [image, setImage] = useState(null)
  const [displayImage, setDisplayImage] = useState(null)
  function handleImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0]
      setDisplayImage(URL.createObjectURL(img))
      setImage(event.target.files[0])
    }
  }

  async function uploadImage() {
    const data = new FormData()
    data.append('file', image)
    let imgUrl = ''

    try {
      if (image) {
        const response = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              pinata_api_key: 'd9abe1a7fb96903a8d0b',
              pinata_secret_api_key:
                '78c4e76c51d023766c626297fbb4298565b02a20952cc6488e1988c7cfc35aa3',
            },
          },
        )
        imgUrl = 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const signer = provider.getSigner()

      const contract = new ethers.Contract(
        openCircleContract.contractAddress,
        openCircleContract.contractAbi,
        signer,
      )

      const createPost = async (url) => {
        const tx = await contract.setUserProfileImage(url)
        await tx.wait()
      }

      await createPost(imgUrl, { gasLimit: 300000 })
      setImage(null)
      setDisplayImage(null)
    } catch (err) {
      console.log(err)
      alert('Unable to Upload Image')
    }
  }

  async function uploadName() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const signer = provider.getSigner()

    const contract = new ethers.Contract(
      openCircleContract.contractAddress,
      openCircleContract.contractAbi,
      signer,
    )

    const tx = await contract.setUserName(userName, {
      gasLimit: 300000,
    })
    await tx.wait()
    window.location.reload()
  }

  async function uploadBio() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const signer = provider.getSigner()

    const contract = new ethers.Contract(
      openCircleContract.contractAddress,
      openCircleContract.contractAbi,
      signer,
    )

    const tx = await contract.setUserBio(userBio, {
      gasLimit: 300000,
    })
    await tx.wait()
    window.location.reload()
  }

  return (
    <>
      <div className="image-input">
        <label
          for="upload-file"
          className="custom-file-upload profile-Edit-image"
        >
          Choose Image
        </label>
        <input
          className="itemp"
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          id="upload-file"
          // placeholder="https://gateway.pinata.cloud/ipfs/QmUNQAqzjgA9BM6jDE8EMwoHqKUM5Ah4w9dotns1qccdBY"
        />
      </div>
      <div className="img-info">
        {image && (
          <img
            // className="create-post-img post-image"
            className="profile-photo-bigone"
            src={displayImage}
            alt="user's post"
          />
        )}
        <button className="btn btn-primary" onClick={uploadImage}>
          Update Image
        </button>
      </div>
      <div className="profileName">
        <input
          onChange={handleNameChange}
          value={userName}
          placeholder="Enter your Profile Name"
          className="Input"
        ></input>
      </div>
      <button onClick={uploadName} className="btn btn-primary btn-margin">
        Update Name
      </button>
      <div className="bio-input-box">
        <textarea
          onChange={handleBioChange}
          value={userBio}
          id="style-1"
          placeholder="Here Enter Your New Bio"
          className="Input bio-input-text"
        ></textarea>
      </div>
      <button onClick={uploadBio} className="btn btn-primary btn-margin">
        Update Bio
      </button>
    </>
  )
}
export default Edit

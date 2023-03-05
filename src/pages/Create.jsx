import Header from '../components/Header'
import LeftSidebar from '../components/LeftSidebar'
import axios from 'axios'
import React, { useState } from 'react'
import configData from '../Data.json'
import { ethers } from 'ethers'
// import ProfileRightSidebar from "../components/rightSidebar/ProfileRightSidebar";

function Create() {
  const openCircleContract = {
    contractAddress: configData.MumbaiContractAddress,
    contractAbi: configData.abi,
  }

  const [image, setImage] = useState('')
  const [displayImage, setDisplayImage] = useState(null)
  function handleImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0]
      setDisplayImage(URL.createObjectURL(img))
      setImage(event.target.files[0])
    }
  }

  const [caption, setCaption] = useState('')
  function handleCaptionChange(event) {
    setCaption(event.target.value)
  }

  const now = Date.now()
  const [time, setTime] = useState(now)
  function handleTimeChange() {
    const currentTime = Date.now()
    setTime(currentTime)
  }

  async function uploadPost() {
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
              pinata_api_key: '52a084fdd2c59360dcb7',
              pinata_secret_api_key:
                '8ce0d49080a717d547482ac09191e276dd4cdbe49e67200313cd82c9cd6d7cfd',
            },
            // headers: {
            //   "Content-Type": "multipart/form-data",
            //   pinata_api_key: "d9abe1a7fb96903a8d0b",
            //   pinata_secret_api_key:
            //     "78c4e76c51d023766c626297fbb4298565b02a20952cc6488e1988c7cfc35aa3",
            // },
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

      const createPost = async (url, postCaption, postCreationTime) => {
        const tx = await contract.createPost(url, postCaption, postCreationTime)
        await tx.wait()
      }

      handleTimeChange()
      await createPost(imgUrl, caption, time.toString(), { gasLimit: 300000 })
      setCaption('')
      setImage(null)
      setDisplayImage(null)
    } catch (err) {
      console.log(err)
      alert('Unable to Upload Image')
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <LeftSidebar />
          <div className="middle">
            <div className="feeds">
              <div className="feed">
                <div className="head">
                  <input
                    className="itemp"
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                    id="upload-file"
                  />
                </div>
                <div className="tme">
                  {image && (
                    <div className="photo">
                      <img src={displayImage} alt="user's post" />
                    </div>
                  )}
                </div>
                <div className="caption">
                  <textarea
                    className="post-textarea post-header"
                    id="style-1"
                    rows="4"
                    value={caption}
                    onChange={handleCaptionChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {/* <div className="messages"> */}
            <label htmlFor="upload-file" className="custom-file-upload">
              Choose Image
            </label>
            <button
              // className="postButton"
              className="btn btn-primary postButton"
              onClick={uploadPost}
            >
              Post
            </button>
          </div>
          {/* </div> */}
        </div>
      </main>
    </>
  )
}

export default Create

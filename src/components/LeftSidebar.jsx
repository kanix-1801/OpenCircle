import { useAccount } from 'wagmi'
import React from 'react'
import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'

function LeftSidebar() {
  const { address: userAddress } = useAccount()
  return (
    <>
      <div className="left">
        <Link to={'/profile'}>
          <UserInfo address={userAddress} />
        </Link>
        <div className="sidebar">
          <Link to={'/'}>
            <span className="menu-item">
              <span>
                <i className="uil uil-home"></i>
              </span>
              <h3 className="left-sidebar-heading-text">Home</h3>
            </span>
          </Link>

          <Link to={'/explore'}>
            <span className="menu-item">
              <span>
                <i className="uil uil-compass"></i>
              </span>
              <h3 className="left-sidebar-heading-text">Explore</h3>
            </span>
          </Link>
        </div>

        <Link to={'/Create'}>
          <label for="create-post" className="btn btn-primary">
            <span>
              <i className="uil uil-edit"></i>
            </span>
            Create Post
          </label>
        </Link>
      </div>
    </>
  )
}

export default LeftSidebar

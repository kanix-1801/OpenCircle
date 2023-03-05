import LeftSidebar from "../components/LeftSidebar";
import Header from "../components/Header";
import ProfilePostContainer from "../components/PostContainers/ProfilePostContainer";
import ProfileRightSidebar from "../components/rightSidebar/ProfileRightSidebar";
import Edit from "../components/rightSidebar/Edit";
import { useState } from "react";
import Follower from "../components/rightSidebar/Followers";
import Following from "../components/rightSidebar/Following";

function Profile() {
  const [follower, following] = useState(true);

  function handlefollow() {
    following(!follower);
  }

  const [profilePage, setEditPage] = useState(true);

  function handleEditPage() {
    setEditPage(!profilePage);
  }

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <LeftSidebar />
          <ProfilePostContainer />
          <div className="right">
            <div className="messages">
              {profilePage ? (
                <>
                  <button onClick={handleEditPage}>
                    <i className="uil uil-edit"></i>
                  </button>
                  <ProfileRightSidebar />
                </>
              ) : (
                <>
                  <Edit />
                  <div className="action">
                    {/* <button className="btn btn-primary">Done</button> */}
                    <button onClick={handleEditPage} className="btn">
                      Cancle
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="outer-div">
              <div className="Rightleft">
                <div className="action" id="style-2">
                  <button onClick={handlefollow} className="btn btn-primary">
                    follower
                  </button>
                  <button onClick={handlefollow} className="btn btn-primary">
                    following
                  </button>
                </div>
                {follower ? (
                  <>
                    <Follower />
                  </>
                ) : (
                  <>
                    <Following />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Profile;

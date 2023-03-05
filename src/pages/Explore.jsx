import Header from "../components/Header";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/rightSidebar/RightSidebar";
import ExploreMiddle from "../components/PostContainers/ExplorePostContainer";

function Explore() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <LeftSidebar />
          <ExploreMiddle />
          <RightSidebar />
        </div>
      </main>
    </>
  );
}
export default Explore;

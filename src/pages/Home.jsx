import Header from '../components/Header'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/rightSidebar/RightSidebar'
import HomePostContainer from '../components/PostContainers/HomePostContainer'

function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <LeftSidebar />
          <HomePostContainer />
          <RightSidebar />
        </div>
      </main>
    </>
  )
}

export default Home

import UserInfo from "../UserInfo";

function Status() {
  return (
    <>
      <div className="Rightleft">
        <span className="text-muted Rightleftspan suggestions-text">
          Suggestions for you
        </span>
        <UserInfo address="0xA4ddE5A879428f8168Ca86Af3f6935d63ffD0BC7" />
        <UserInfo address="0x1423aaEb738D9760E83Cd2aCDB6631aaa271367d" />
        <UserInfo address="0xBb7dC56688a90A566F29e12865880da71f7d6280" />
      </div>
    </>
  );
}
export default Status;

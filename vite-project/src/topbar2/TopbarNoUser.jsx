import "./topbarnouser.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";

export default function TopbarNoUser() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Lamasocial</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABQQBAwIH/8QAMhABAAICAQIEBAMHBQAAAAAAAAECAxEEITEFEiJRMkFScRNhgSMzYnKxwdEkNEORof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwD9OAZbAAAAAAAAAFAelcOS3w47Ozx8tes47A8h2Y8veJj7uAAIAAAAAAAAAAAAAAACg7Ss3t5aw9cHHyZvh1Ee8qHF48YKamd2+rQM/H4U/Fn7fKvu2Ux1pGq1rEPsEAAcmtbRq1Ylj5HCiYm2Hp/D/htBUOYms6mNTDiryOLXNEzHS8dpTL0tS01tExMA+QEAAAAAAAAAAABQa+HxvxfXf4Pb3eGDFObJFInXzmVelK46RWkaiAK1ikarXUPoAABAAAAB4crj1zU9rx2l7gIdomtprMamO8OKXN48Xr56x669/wA4TRQBAAAAAAAAAAUbPDY3e/2UWDwyfVePyhvAAEAAAAAAAAcSeVT8PNeI6bncK6b4lH+or/JH9ZCMgCKAAAAAAAAAKNXh9tZ9e8KaNgv5M1Le0rIAAgAAAAAAAAm+Jfvq/wAn95UkvxC0W5GvpjQRmARQAAAAAAAABRo4WOuTNq0bjSqn+GfvMnv5VAQAAAAAAAAAASOX/usm/fauj8qd8jJv6gjyARQAAAAAAAABRo4NtciI+roqodZmtotWdTErOPJXJji9e0x/0D7AEAAAAAAAAcmdR17IuW3nyWt9UzKpzMn4fHtO+s9EkIAIoAAAAAAAAAA0cTk/gzNbRulus/lLOKLWPJXLSL07S+2Xw6d8fXtMtQgAAAAAAHzSuRyMk3vWtp8m+wHMzfi5ZiJ9FekM4IoAAAAAAAAAAAAAo1+HX8uWaTPS0dPupIdZms7jvHZapO6RPvAPoAQAAAB557xjw3tPt0Ruvz7qPiU/sqe3m6pwsAEAAAAAAAAAAAAAHYiZnURO1HJ69lrDH7Ku++mTi8TWsmWNfOKtwAAgAAAD4y0jJS1ZjvGkrNx8mGfVHp94WHNRMansKhijm4NbbnF6be09mTJxs1O9J+8dQeIdu/8A6AAIAAAAA7ETM6iNtGPhZb9Z1Sv8SjN+b7x4cmSfRSyli4mLH1mPPPvL31rtr9AYcfA+eS/6Q1YsGPF8ER93qAACAAAAAAAAOOgDyyYMeT4qQy5fD4/4r/pLe4CNkxZMU+uNPhcmItGpjcMHJ4cxu+LrH0isQfpqQB68fBfPb09o7zLmHHObJFI7K+OlcdIrWOkCV8YMFMMemNz87T3eoAAAAAAAAAAAAAAAAAAAAAzcrixljzUiIv8A1TLRNZmJ7wtvi+DHed2pGxX/2Q==" alt="" className="topbarImg"/>
      </div>
    </div>
  );
}
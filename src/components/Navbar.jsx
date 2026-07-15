import {
  BsSearch,
  BsBell,
  BsMoon,
  BsFunnel
} from "react-icons/bs";

function Navbar() {
  return (
    <div className="navbar">

      <div className="search-bar">
        <BsSearch />
        <input
          type="text"
          placeholder="Search courses, certifications..."
        />
      </div>

      <div className="navbar-right">

        <button className="nav-icon">
          <BsMoon />
        </button>

        <button className="nav-icon">
          <BsBell />
        </button>

        <div className="profile-info">
          <img
            src="https://i.pravatar.cc/50?img=12"
            alt="profile"
          />

          <div>
            <strong>Alex Chen</strong>
            <p>Senior Engineer</p>
          </div>
        </div>

        <button className="filter-btn">
          <BsFunnel /> Filter
        </button>

      </div>

    </div>
  );
}

export default Navbar;
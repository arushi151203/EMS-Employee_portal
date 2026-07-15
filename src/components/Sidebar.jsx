import {
  BsGrid,
  BsPerson,
  BsCalendarCheck,
  BsClipboardCheck,
  BsCashStack,
  BsCheck2Square,
  BsGraphUp,
  BsChatDots,
  BsBell,
  BsMortarboard,
  BsFileText,
  BsGear,
  BsList
} from "react-icons/bs";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo-section">
        <div className="logo-text">
          <h2>Nexus HR</h2>
          <small>Employee Portal</small>
        </div>

        <BsList size={22} />
      </div>

      <ul className="menu">

        <li><BsGrid /> Dashboard</li>
        <li><BsPerson /> Profile</li>
        <li><BsCalendarCheck /> Attendance</li>
        <li><BsClipboardCheck /> Leave</li>
        <li><BsCashStack /> Payroll</li>
        <li><BsCheck2Square /> Tasks</li>
        <li><BsGraphUp /> Performance</li>
        <li><BsChatDots /> Chat</li>
        <li><BsBell /> Notifications</li>

        <li className="active">
          <BsMortarboard />
          Training
        </li>

        <li><BsFileText /> Documents</li>
        <li><BsGear /> Settings</li>

      </ul>

      <div className="user-card">

        <img
          src="https://i.pravatar.cc/60?img=12"
          alt="user"
        />

        <div>
          <h5>Alex Chen</h5>
          <p>Senior Engineer</p>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
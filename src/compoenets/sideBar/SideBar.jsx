import { Link } from "react-router-dom";
import { MdHome, MdCalendarMonth } from "react-icons/md";
import { FiClock } from "react-icons/fi";

const SideBar = () => {
  const links = [
    { to: "/", text: "หน้าแรก", icon: <MdHome /> },
    { to: "/month", text: "เวร รายเดือน", icon: <MdCalendarMonth /> },
    { to: "/daily", text: "เวรทิ้งขยะ", icon: <FiClock /> },
  ];

  return (
    <div className="flex flex-col col-span-1 bg-slate-500 ">
      {links.map((link, index) => (
        <Link
          key={index}
          className="flex items-center py-1  pl-2 bg-slate-400 hover:bg-slate-300 border-b-2"
          to={link.to}
        >
          {link.text} {link.icon}
        </Link>
      ))}
    </div>
  );
};

export default SideBar;

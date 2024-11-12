import PageLayout from "./PageLayout";
import { Link } from "react-router-dom";
import Button from "../code/Button";
import { useEffect, useState } from "react";

const Home = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  useEffect(() => {}, []);
  return (
    <PageLayout>
      <div className="flex flex-col justify-center items-center bg-slate-50 h-full ">
        <p>
          {day}/{month}/{year}{" "}
          <span>{hours > 9 ? `${hours}` : `0${hours}`}</span>
          <span>:{minutes > 9 ? `${minutes}` : `0${minutes}`}</span>
          <span>:{seconds > 9 ? `${seconds}` : `0${seconds}`}</span>
        </p>
        <div>
          <img
            src="https://www.eupfin.com/sites/default/files/logo-eup.png"
            alt="eup logo"
          />
        </div>
        <div className="flex justify-center items-center">
          <Link to="/month">
            <Button>ทำความสะอาดรายเดือน</Button>
          </Link>

          <Link to="/daily">
            <Button>เวรทิ้งขยะ</Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;

import PageLayout from "./PageLayout";
import { Link } from "react-router-dom";
import Button from "../code/Button";

const Home = () => {
  return (
    <PageLayout>
      <div className="flex flex-col justify-center items-center bg-slate-50 h-full ">
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
            <Button>ทำความสะอาดรายวัน</Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;

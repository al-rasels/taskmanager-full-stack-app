import { useEffect } from "react";
import { SummaryRequest } from "../../APIRequest/APIRequest";
import { useSelector } from "react-redux";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const Dashboard = () => {
  useEffect(() => {
    SummaryRequest();
  }, []);
  const SummeryList = useSelector((state) => state.summery.value);
  console.log(SummeryList);

  return (
    <div className="row p-0 m-0">
      <div className="col-12 p-2">
        <div className="card justify-content-center align-items-center h-100">
          <div className="card-body m-3">recharts Radar Chart Example</div>
        </div>
      </div>
      {
        /* Summary Cards Start */
        SummeryList.map((item, i) => (
          <div key={i} className="col-12 col-lg-3 col-sm-6 col-md-3 p-2">
            <div className="card h-100">
              <div className="card-body m-3">
                <h5 className="animate__animated animate__fadeInUp text-center">
                  {item._id}
                </h5>
                <h6 className="text-secondary animate__animated animate__fadeInUp text-center text-balance">
                  {item.sum}
                </h6>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Dashboard;

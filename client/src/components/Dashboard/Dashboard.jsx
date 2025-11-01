import React from "react";

const Dashboard = () => {
  return (
    <div className="col-12 col-lg-3 col-sm-6 col-md-3 p-2">
      <div className="card h-100">
        <div className="card-body m-3">
          <h5 className="animated fadeInUp text-center">Total</h5>
          <h6 className="text-secondary animated fadeInUp text-center text-balance">
            00
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { Fragment, Suspense } from "react";
import MasterLayout from "../components/masterLayout/MasterLayout";
import LazyLoader from "../components/masterLayout/LazyLoader";
const Dashboard = React.lazy(() => import("../components/Dashboard/Dashboard"));
const DashboardPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Dashboard />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default DashboardPage;

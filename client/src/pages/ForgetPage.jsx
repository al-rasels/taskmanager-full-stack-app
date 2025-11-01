import React, { Fragment, Suspense, lazy } from "react";
import LazyLoader from "../components/masterLayout/LazyLoader";
import MasterLayout from "../components/masterLayout/MasterLayout";
const ForgetPass = lazy(() => import("../components/ForgetPass/ForgetPass"));
const ForgetPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ForgetPass />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default ForgetPage;

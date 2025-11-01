import React, { Fragment, lazy, Suspense } from "react";
import MasterLayout from "../components/masterLayout/MasterLayout";
import LazyLoader from "../components/masterLayout/LazyLoader";
const NotFound = lazy(() => import("../components/NotFound/NotFound"));
const NotFoundPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <NotFound />
      </Suspense>
    </Fragment>
  );
};

export default NotFoundPage;

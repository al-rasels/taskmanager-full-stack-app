import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/CreatePage";
import NewPage from "./pages/NewPage";
import CanceledPage from "./pages/CanceledPage";
import ProgressPage from "./pages/ProgressPage";
import CompletedPage from "./pages/CompletedPage";
import ForgetPage from "./pages/ForgetPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import FullScreenLoader from "./components/masterLayout/FullScreenLoader";
import { getToken } from "./helper/SessionHelper";

const App = () => {
  if (getToken()) {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<DashboardPage />} />
            <Route exact path="/create" element={<CreatePage />} />
            <Route exact path="/all" element={<NewPage />} />
            <Route exact path="/canceled" element={<CanceledPage />} />
            <Route exact path="/progress" element={<ProgressPage />} />
            <Route exact path="/completed" element={<CompletedPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Navigate to="/login" replace />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/forget" element={<ForgetPage />} />
            <Route exact path="/register" element={<RegistrationPage />} />
            <Route exact path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </Fragment>
    );
  }
};

export default App;

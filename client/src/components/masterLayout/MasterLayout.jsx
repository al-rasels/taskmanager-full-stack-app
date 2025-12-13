// Imports
import React, { Fragment, useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// Icons
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineMenuUnfold,
  AiOutlineUser,
} from "react-icons/ai";
import { BsHourglass, BsListNested } from "react-icons/bs";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineCancelPresentation } from "react-icons/md";

// Assets + Helpers
import logo from "../../assets/images/tasklogo.webp";
import FormHelper from "../../helper/FormHelper";
import { getUserData, removeUserData } from "../../helper/SessionHelper";

const MasterLayout = ({ children }) => {
  const sideNavRef = useRef(null);
  const contentRef = useRef(null);

  const userData = getUserData();

  const toggleSidebar = () => {
    const sideNav = sideNavRef.current;
    const content = contentRef.current;

    sideNav.classList.toggle("collapsed");
    content.classList.toggle("expanded");
  };

  const onLogout = () => {
    removeUserData();
    FormHelper.successToast("Logout successful!");
  };

  return (
    <Fragment>
      {/* NAVBAR */}
      <Navbar className="fixed-top px-0 shadow-sm master-navbar">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center">
            <button className="menu-btn" onClick={toggleSidebar}>
              <AiOutlineMenuUnfold size={24} />
            </button>

            <img src={logo} alt="logo" className="nav-logo mx-2" />
            <span className="brand-text">Task Master</span>
          </Navbar.Brand>

          {/* USER DROPDOWN */}
          {userData && (
            <div className="user-dropdown">
              <img src={userData?.photo} alt="user" className="icon-nav-img" />
              <div className="user-dropdown-content">
                <div className="mt-4 text-center">
                  <img
                    src={userData?.photo}
                    alt={userData?.firstName}
                    className="icon-nav-img"
                  />
                  <h6 className="mb-0">
                    Hi {userData?.firstName} {userData?.lastName}
                  </h6>
                  <hr className="user-dropdown-divider" />
                </div>

                <NavLink to="/profile" className="side-bar-item">
                  <AiOutlineUser className="side-bar-item-icon" />
                  <span>Profile</span>
                </NavLink>

                <a onClick={onLogout} className="side-bar-item">
                  <AiOutlineUser className="side-bar-item-icon" />
                  <span>Logout</span>
                </a>
              </div>
            </div>
          )}
        </Container>
      </Navbar>

      {/* SIDEBAR */}
      <div className="side-nav" ref={sideNavRef}>
        <NavLink to="/" className="side-bar-item mt-3">
          <RiDashboardLine className="side-bar-item-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/create" className="side-bar-item mt-2">
          <AiOutlineEdit className="side-bar-item-icon" />
          <span>Create New</span>
        </NavLink>

        <NavLink to="/all" className="side-bar-item mt-2">
          <BsListNested className="side-bar-item-icon" />
          <span>New Tasks</span>
        </NavLink>

        <NavLink to="/progress" className="side-bar-item mt-2">
          <BsHourglass className="side-bar-item-icon" />
          <span>In Progress</span>
        </NavLink>

        <NavLink to="/completed" className="side-bar-item mt-2">
          <AiOutlineCheckCircle className="side-bar-item-icon" />
          <span>Completed</span>
        </NavLink>

        <NavLink to="/canceled" className="side-bar-item mt-2">
          <MdOutlineCancelPresentation className="side-bar-item-icon" />
          <span>Canceled</span>
        </NavLink>
      </div>

      {/* MAIN CONTENT */}
      <div className="content-area" ref={contentRef}>
        {children}
      </div>
    </Fragment>
  );
};

export default MasterLayout;

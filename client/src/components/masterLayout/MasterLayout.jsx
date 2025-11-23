// lib Imports
import React, { Fragment } from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// icon Imports
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineMenuUnfold,
  AiOutlineUser,
} from "react-icons/ai";
import { BsHourglass, BsListNested } from "react-icons/bs";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineCancelPresentation } from "react-icons/md";
// Component Imports
import logo from "../../assets/images/tasklogo.webp";

import FormHelper from "../../helper/FormHelper";
import { getUserData, removeUserData } from "../../helper/SessionHelper";

const MasterLayout = ({ children }) => {
  const sideNavRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const onLogout = () => {
    removeUserData();
    FormHelper.successToast("Logout successful!");
  };
  const userData = getUserData();
  const MenuBarClickedHandler = () => {
    let sideNav = sideNavRef.current;
    let content = contentRef.current;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expanded");
      content.classList.add("content");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expanded");
      content.classList.add("content");
    }
  };

  return (
    <Fragment>
      <Navbar className="fixed-top px-0 shadow-sm ">
        <Container fluid={true} style={{ maxWidth: "100%" }}>
          <Navbar.Brand>
            <a className="icon-nav m-0 h5" onClick={MenuBarClickedHandler}>
              <img src={logo} alt="logo" className="nav-logo mx-2" />{" "}
              <span>Task Master</span>
            </a>
          </Navbar.Brand>

          <div className={userData ? "float-right h-auto d-flex" : "d-none"}>
            <div className="user-dropdown">
              <img
                src={userData?.photo}
                alt={"user"}
                className="icon-nav-img icon-nav"
              />
              <div className="user-dropdown-content">
                <div className="mt-4 text-center">
                  <img
                    src={userData?.photo}
                    alt={userData?.firstName}
                    className="icon-nav-img icon-nav"
                  />
                  <h6 className="mb-0">
                    Hi {userData?.firstName} {userData?.lastName}
                  </h6>
                  <hr className="user-dropdown-divider p-0" />
                </div>
                <NavLink to="/profile" className="side-bar-item">
                  <AiOutlineUser className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Profile</span>
                </NavLink>
                <a onClick={onLogout} className="side-bar-item">
                  <AiOutlineUser className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
      <div
        ref={(div) => {
          sideNavRef.current = div;
        }}
        className="side-nav-open ">
        {/* Side Navigation content goes here */}
        <NavLink
          to="/"
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }>
          <RiDashboardLine className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Dashboard</span>
        </NavLink>

        <NavLink
          to="/create"
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }>
          <AiOutlineEdit className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Create New</span>
        </NavLink>
        <NavLink
          to="/all"
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }>
          <BsListNested className="side-bar-item-icon" />
          <span className="side-bar-item-caption">New Tasks</span>
        </NavLink>
        <NavLink
          to="/progress"
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }>
          <BsHourglass className="side-bar-item-icon" />
          <span className="side-bar-item-caption">In Progress</span>
        </NavLink>
        <NavLink
          to="/completed"
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }>
          <AiOutlineCheckCircle className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Completed</span>
        </NavLink>
        <NavLink
          to="/canceled"
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }>
          <MdOutlineCancelPresentation className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Canceled</span>
        </NavLink>
      </div>
      <div
        className="content"
        ref={(div) => {
          contentRef.current = div;
        }}>
        {children}
      </div>
    </Fragment>
  );
};

export default MasterLayout;

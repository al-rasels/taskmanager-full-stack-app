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

const MasterLayout = ({ children }) => {
  const sideNavRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const onLogout = () => {
    console.log("Logout clicked");
  };
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
      <Navbar className="fixed-top px-0 shadow-sm">
        <Container fluid={true}>
          <Navbar.Brand>
            <a className="icon-nav m-0 h5" onClick={MenuBarClickedHandler}>
              <AiOutlineMenuUnfold />
            </a>
            <img src={logo} alt="logo" className="nav-logo mx-2" />{" "}
            <span>Task Manager</span>
          </Navbar.Brand>
          <div className="float-right h-auto d-flex">
            <div className="user-dropdown">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                className="icon-nav-img icon-nav"
              />
              <div className="user-dropdown-content">
                <div className="mt-4 text-center">
                  <h6 className="mb-0">John Doe</h6>
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
          to="/new-task"
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

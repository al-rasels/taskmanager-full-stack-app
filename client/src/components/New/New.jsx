import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import {
  AiOutlineCalendar,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
const New = () => {
  return (
    <Fragment>
      <Container fluid={true} className="content-body ">
        <div className="row p-0 m-0">
          <div className="col-12 col-md-6 col-lg-8 px-3">
            <h5>New Tasks</h5>
          </div>
          <div className="col-12 col-md-6 col-lg-4 px-2 float-end">
            <div className="row">
              <div className="col-8">
                <input className="form-control w-100" />
              </div>
              <div className="col-4">
                <button className="custom-btn-primary w-100 rounded-2 m-0 btn">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row p-0 m-0">
          <div className="col-12 col-lg-4 col-md-4 col-sm-6">
            <div className="card h-100">
              <div className="card-body ">
                <h6 className="animated fadeInUp">Title</h6>
                <p className="animated fadeInUp">Description</p>
                <p className="m-0 animated fadeInUp p-0">
                  <AiOutlineCalendar /> 12/07/25
                  <a href="" className="icon-nav text-primary mx-1">
                    <AiOutlineEdit />
                  </a>
                  <a href="" className="icon-nav text-danger mx-1">
                    <AiOutlineDelete />
                  </a>
                  <a href="" className="badge float-end bg-info  p-2">
                    status
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default New;

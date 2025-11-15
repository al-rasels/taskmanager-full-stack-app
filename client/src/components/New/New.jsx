import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";

import {
  AiOutlineCalendar,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { TaskListByStatus } from "../../APIRequest/APIRequest";
import { useSelector } from "react-redux";
import { DeleteToDo } from "../../helper/DeleteAlert";
import FormHelper from "../../helper/FormHelper";
import { UpdateToDo } from "../../helper/UpdateAlert";
const New = () => {
  useEffect(() => {
    TaskListByStatus("New");
  }, []);

  const NewTasks = useSelector((state) => state.task.New);
  const DeleteItem = (id) => {
    DeleteToDo(id).then((result) => {
      if (result) {
        FormHelper.successToast("Task deleted successfully!");
        TaskListByStatus("New");
      }
    });
  };
  const StartusChangeItem = (id, status) => {
    UpdateToDo(id, status).then((result) => {
      if (result) {
        FormHelper.successToast("Task updated successfully!");
        TaskListByStatus("New");
      }
    });
  };

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
          {NewTasks.map((item, i) => (
            <div
              key={i}
              className="col-12 col-lg-3 col-md-4 col-sm-6 my-2 mx-1 shadow-sm">
              <div className="card h-100 p-2 ">
                <div className="card-body ">
                  <h6 className="animate__animated animate__fadeInUp fs-5 lh-1">
                    {item.title}
                  </h6>
                  <p className="animate__animated animate__fadeInUp mt-3">
                    {item.description}
                  </p>
                  <p className="m-0 animate__animated animate__fadeInUp  p-1 ">
                    <span className="bg-secondary bg-opacity-10 rounded-2 p-2 text-muted">
                      <AiOutlineCalendar /> {item.createdDate}
                      <a
                        onClick={() => {
                          StartusChangeItem.bind(this, item._id, item.status)();
                        }}
                        className="icon-nav text-primary badge ms-4 bg-info mx-1">
                        <AiOutlineEdit size={14} />
                      </a>
                      <a
                        onClick={() => {
                          DeleteItem.bind(this, item._id)();
                        }}
                        className="icon-nav text-white badge bg-danger mx-1">
                        <AiOutlineDelete size={14} />
                      </a>
                    </span>
                    <a className="badge float-end bg-primary  p-2">
                      {item.status}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Fragment>
  );
};

export default New;

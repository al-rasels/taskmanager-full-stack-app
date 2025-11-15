import React, { Fragment, useEffect } from "react";
import { Container, Form, Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  AiOutlineCalendar,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { TaskListByStatus } from "../../APIRequest/APIRequest";
import { DeleteToDo } from "../../helper/DeleteAlert";
import FormHelper from "../../helper/FormHelper";
import { UpdateToDo } from "../../helper/UpdateAlert";

const Canceled = () => {
  useEffect(() => {
    TaskListByStatus("Canceled");
  }, []);
  const DeleteItem = (id) => {
    DeleteToDo(id).then((result) => {
      if (result) {
        FormHelper.successToast("Task deleted successfully!");
        TaskListByStatus("Canceled");
      }
    });
  };
 const StartusChangeItem = (id, status) => {
   UpdateToDo(id, status).then((result) => {
     if (result) {
       FormHelper.successToast("Task updated successfully!");
       TaskListByStatus("Canceled");
     }
   });
 };
  const CanceledTasks = useSelector((state) => state.task.Canceled);
  return (
    <Fragment>
      <Container fluid={true} className="content-body ">
        <div className="row p-0 m-0">
          <div className="col-12 col-md-6 col-lg-8 px-3">
            <h5>Task Canceled</h5>
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
          {CanceledTasks.map((item, i) => (
            <div
              key={i}
              className="col-12 col-lg-3 col-md-4 col-sm-6 my-2 mx-1 shadow-sm">
              <div className="card h-100 p-2 rounded-3">
                <div className="card-body ">
                  <h6 className="animate__animated animate__fadeInUp fs-5 lh-1">
                    {item.title}
                  </h6>
                  <p className="animate__animated animate__fadeInUp mt-3">
                    {item.description}
                  </p>
                  <p className="m-0 animate__animated animate__fadeInUp p-0">
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
                    <a href="" className="badge float-end bg-danger  p-2">
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

export default Canceled;

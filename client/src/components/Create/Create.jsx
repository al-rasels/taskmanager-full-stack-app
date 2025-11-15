import React, { useRef } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormHelper from "../../helper/FormHelper";
import { NewTaskRequest } from "../../APIRequest/APIRequest";

const Create = () => {
  const navigate = useNavigate();
  const createRefs = {
    title: useRef(),
    description: useRef(),
  };

  const handleCreateNewTask = () => {
    const createData = {
      title: createRefs.title.current.value,
      description: createRefs.description.current.value,
    };
    if (FormHelper.isEmpty(createData.title)) {
      FormHelper.errorToast("Task title is required");
    } else if (FormHelper.isEmpty(createData.description)) {
      FormHelper.errorToast("Task description is required");
    } else {
      NewTaskRequest(createData).then((result) => {
        if (result === true) {
          FormHelper.successToast("Task created successfully");
          navigate("/all");
        }
      });
    }
  };
  return (
    <Container fluid="true" className="content-body">
      <Row className="d-flex justify-content-center ">
        <div className="col-12 col-lg-6 col-sm-12 col-md-6 p-2">
          <div className="card px-lg-4 py-lg-5">
            <div className="card-body ">
              <h4 className="text-center animate__animated animate__fadeInUp">
                Create New
              </h4>
              <br />

              <input
                ref={(input) => (createRefs.title.current = input)}
                name="title"
                type="text"
                className="form-control animate__animated animate__fadeInUp"
                placeholder="Task Title"
              />
              <br />
              <textarea
                ref={(input) => (createRefs.description.current = input)}
                name="description"
                row={6}
                placeholder="Task Description"
                type="text"
                className="form-control animate__animated animate__fadeInUp"></textarea>
              <br />
              <button
                onClick={handleCreateNewTask}
                className="btn float-end custom-btn-primary animate__animated animate__fadeInUp">
                Create
              </button>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Create;

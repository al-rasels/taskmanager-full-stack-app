import React from "react";
import { Container, Row } from "react-bootstrap";

const Create = () => {
  return (
    <Container fluid="true" className="content-body">
      <Row className="d-flex justify-content-center ">
        <div className="col-12 col-lg-6 col-sm-12 col-md-6 p-2">
          <div className="card px-lg-4 py-lg-5">
            <div className="card-body">
              <h4 className="text-center">Create New</h4>
              <br />

              <input
                type="text"
                className="form-control animated fadeInUp"
                placeholder="Task Name"
              />
              <br />
              <textarea
                name="des"
                row={6}
                placeholder="Task Description"
                type="text"
                className="form-control animated fadeInUp"></textarea>
              <br />
              <button className="btn float-end custom-btn-primary">
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

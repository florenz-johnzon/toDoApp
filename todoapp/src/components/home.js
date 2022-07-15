import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Row, Col, Checkbox } from "antd";
import DeleteTask from "./deleteTask";
import EditTask from "./editTask";

const _ = require("lodash");

const Home = () => {
  const [toDos, setTodos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [editId, setEditId] = useState();

  useEffect(() => {
    getTaskList();
  }, []);

  const onChangeToDo = (e) => {
    setToDo(e.target.value);
  };

  const getTaskList = () => {
    var taskList = JSON.parse(localStorage.getItem("Tasks"));
    if (taskList !== []) {
      setTodos(taskList);
    }
  };

  //--------------- DELETE MODEL ---------------
  const showModal = (obj) => {
    let delId = obj.id;
    setDeleteID(delId);
    setIsDeleteModalVisible(true);
  };

  //--------------- DELETE MODEL -----------------------

  const showEditModal = (obj) => {
    let edId = obj.id;
    setEditId(edId);
    setIsEditModalVisible(true);
  };

  //---------------- CLEAR FORMDATA -----------------------

  const clear = () => {
    document.getElementById("basic").reset();
  };

  //------------------- ADD NEW TASK ------------------

  const onSubmit = (e) => {
    let newData = {
      taskName: toDo,
      id: Date.now(),
      status: false,
    };
    let newTask = localStorage.getItem("Tasks");
    if (newTask === null) {
      localStorage.setItem("Tasks", JSON.stringify([newData]));
      success();
      getTaskList();
    } else {
      let taskArray = JSON.parse(newTask);
      let duplicateTask = _.find(taskArray, function(obj) {
        //Check if taskname already taken
        if (obj.taskName === e.toDo) {
          return true;
        }
      });
      if (!duplicateTask) {
        taskArray.push(newData);
        localStorage.setItem("Tasks", JSON.stringify(taskArray));
        getTaskList();
        success();
        clear();
      } else {
        error();
      }
    }
  };

  //--------------- SUCCESS MESSAGE ---------------

  const success = () => {
    message.success("Congrats, new task added successfully!!");
  };
  const error = () => {
    message.error("Task Already added, please try another task name!");
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Hey Welcome, Keep adding your Tasks 🌝 </h2>
      </div>

      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 30 }}
        onFinish={onSubmit}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
        autoComplete="off"
      >
        <Form.Item
          name="toDo"
          value={toDo}
          onChange={onChangeToDo}
          rules={[
            {
              required: true,
              message: "Please enter your toDo task",
            },
            { whitespace: true },
            {
              min: 3,
              message: "ToDo task must contain min 3 characters",
              style: {
                marginTop: "20vh",
              },
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your Task here..." />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add +
        </Button>
      </Form>

      {toDos?.length > 0 ? <h2>Tasks List</h2> : <h2>Please Add Tasks here</h2>}

      {toDos?.map((obj, index) => {
        return (
          <div key={index}>
            <Row>
              <Col xs={{ span: 2, offset: 1 }} lg={{ span: 2, offset: 2 }}>
                <Checkbox checked={obj.status}></Checkbox>
              </Col>
              <Col xs={{ span: 4, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <p>{obj.taskName}</p>
              </Col>
              <Col xs={{ span: 2, offset: 1 }} lg={{ span: 2, offset: 2 }}>
                <Button type="primary" ghost onClick={() => showEditModal(obj)}>
                  Edit
                </Button>{" "}
              </Col>
              <Col xs={{ span: 2, offset: 1 }} lg={{ span: 2, offset: 2 }}>
                <Button type="primary" danger onClick={() => showModal(obj)}>
                  Delete
                </Button>
              </Col>
            </Row>
          </div>
        );
      })}

      {isDeleteModalVisible && (
        <DeleteTask
          deleteId={deleteId}
          show={isDeleteModalVisible}
          onHide={() => setIsDeleteModalVisible(false)}
          getTaskList={getTaskList}
        />
      )}

      {isEditModalVisible && (
        <EditTask
          editId={editId}
          show={isEditModalVisible}
          onHide={() => setIsEditModalVisible(false)}
          getTaskList={getTaskList}
        />
      )}
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Modal, message, Checkbox, Button } from "antd";

const EditTask = ({ editId, show, onHide, getTaskList, ...props }) => {
  const [currentTask, setCurrentTask] = useState([]);
  const [taskEditName, setEditTaskName] = useState("");
  const [checkStatus, setCheckStatus] = useState("");

  useEffect(() => {
    getEditTask(editId);
  }, []);

  const handleCancel = () => {
    onHide();
  };

  //--------------- GET CURRENT USER DETAILS ---------------
  
  const getEditTask = (id) => {
    let list = localStorage.getItem("Tasks");
    if (list != null) {
      let data = JSON.parse(list);
      let editItem = data.filter((item) => item.id === id);
      setCurrentTask(editItem);
      setEditTaskName(editItem[0]?.taskName);
      setCheckStatus(editItem[0]?.status);
    }
  };

  //--------------- EDIT TASK ---------------
  const editTask = (Name, CheckedStatus) => {
    if (!Name) message.error("Display Name cannot be empty");
    else {
      let list = localStorage.getItem("Tasks");
      if (list !== null) {
        let data = JSON.parse(list);
        var objIndex = data.findIndex((x) => x.id === editId); //find Index of the current user
        data[objIndex].taskName = Name;
        data[objIndex].status = CheckedStatus;
        localStorage.setItem("Tasks", JSON.stringify(data));
        message.success("Task details Updated, please Login!");
        onHide();
        getTaskList();
      }
    }
  };

  return (
    <Modal
      show={show}
      title="Edit Task"
      visible={show}
      onOk={handleCancel}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div className="row">
        <div className="col-25">
          <label>
            <h3> Task Name</h3>
          </label>
        </div>
        <div className="col-45">
          <input
            type="text"
            placeholder="Task Name"
            defaultValue={taskEditName}
            onChange={(e) => setEditTaskName(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-45">
          <label>
            <h3>Work Status</h3>
          </label>
        </div>
        <div className="col-45">
          <Checkbox
            checked={checkStatus}
            onChange={(e) => setCheckStatus(e.target.checked)}
          />
        </div>
      </div>
      <div className="row">
        <Button
          type="primary"
          onClick={() => editTask(taskEditName, checkStatus)}
        >
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default EditTask;

import React from "react";
import { Modal, message } from "antd";

const DeleteTask = ({ deleteId, getTaskList, onHide, show }) => {
  
  const handleOk = () => {
    deleteTask(deleteId);
  };

  const handleCancel = () => {
    onHide();
  };

  //--------------- DELETE TASK ---------------

  const deleteTask = (id) => {
    let taskArr = localStorage.getItem("Tasks")
      ? JSON.parse(localStorage.getItem("Tasks"))
      : [];
    var taskIndex = taskArr.findIndex((x) => x.id === id); //find index of current task
    taskArr.splice(taskIndex, 1);
    localStorage.setItem("Tasks", JSON.stringify(taskArr)); //set updated task data
    message.success("Task has been deleted. Add new anytime.");
    onHide();
    getTaskList();
  };
  return (
    <Modal
      show={show}
      okType="danger"
      title="Delete Task"
      visible={show}
      onOk={handleOk}
      okText="Delete"
      onCancel={handleCancel}
    >
      <p>Are you sure you want to delete the task?</p>
    </Modal>
  );
};

export default DeleteTask;

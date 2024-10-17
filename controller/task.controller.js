const Task = require("../model/Task");

const taskController = {};

// C
taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete });
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

// R
taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id).select("-__v");
    res.status(200).json({ status: "ok", data: task });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

// U
taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isComplete } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, isComplete },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not found" });
    }

    res.status(200).json({ status: "ok", data: updatedTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

// U 다른 버전
// taskController.updateTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       throw new Error("App can not find the task");
//     }
//     const fields = Object.keys(req.body);
//     fields.map((item) => (task[item] = req.body[item]));
//     await task.save();
//     res.status(200).json({ status: "success", data: task });
//   } catch (error) {
//     res.status(400).json({ status: "fail", error });
//   }
// };

// D
taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json({ status: "ok", data: deletedTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = taskController;

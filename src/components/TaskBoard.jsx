import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { io } from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000"; // Change this when deploying

const taskStages = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({ title: "", description: "", status: "To-Do" });
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const socket = io(API_URL);
    socket.on("task-updated", fetchTasks);
    return () => socket.disconnect();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/tasks`);
      setTasks(data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch tasks", "error");
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.find((task) => task._id === result.draggableId);
    if (!movedTask) return;

    movedTask.status = destination.droppableId;
    setTasks([...updatedTasks]);

    try {
      await axios.put(`${API_URL}/tasks/${movedTask._id}`, { status: movedTask.status });
      Swal.fire("Success", "Task updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update task", "error");
      console.error("Error updating task:", error);
    }
  };

  const handleInput = (e) => setTaskInput({ ...taskInput, [e.target.name]: e.target.value });

  const addOrUpdateTask = async () => {
    if (!taskInput.title.trim()) return;

    try {
      if (editingTask) {
        // ✅ Fix: Ensure correct task ID is used when updating
        await axios.put(`${API_URL}/tasks/${editingTask._id}`, {
          title: taskInput.title,
          description: taskInput.description,
          status: taskInput.status,
        });
        Swal.fire("Updated!", "Task updated successfully!", "success");
      } else {
        await axios.post(`${API_URL}/tasks`, taskInput);
        Swal.fire("Success!", "Task added successfully!", "success");
      }

      setTaskInput({ title: "", description: "", status: "To-Do" });
      setShowForm(false);
      setEditingTask(null);
      fetchTasks(); // ✅ Fix: Refresh the task list after update
    } catch (error) {
      Swal.fire("Error", "Failed to save task", "error");
      console.error("Error saving task:", error);
    }
  };

  const editTask = (task) => {
    setTaskInput({ title: task.title, description: task.description, status: task.status });
    setEditingTask(task);
    setShowForm(true);
  };

  const deleteTask = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/tasks/${id}`);
        Swal.fire("Deleted!", "Task has been deleted.", "success");
        fetchTasks(); // ✅ Fix: Refresh tasks after delete
      } catch (error) {
        Swal.fire("Error", "Failed to delete task", "error");
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      {/* Add Task Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            setTaskInput({ title: "", description: "", status: "To-Do" });
            setEditingTask(null);
            setShowForm(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* New Task Form */}
      {showForm && (
        <div className="p-6 mb-6 bg-gray-50 border rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">{editingTask ? "Edit Task" : "Add New Task"}</h2>
          <input type="text" name="title" placeholder="Task Title" value={taskInput.title} onChange={handleInput} className="p-2 border rounded-md shadow-sm w-full mb-3" />
          <input type="text" name="description" placeholder="Task Details" value={taskInput.description} onChange={handleInput} className="p-2 border rounded-md shadow-sm w-full mb-3" />

          <select name="status" value={taskInput.status} onChange={handleInput} className="p-2 border rounded-md shadow-sm w-full mb-3">
            {taskStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <button onClick={addOrUpdateTask} className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600">
              {editingTask ? "Update Task" : "Add Task"}
            </button>
            <button onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {taskStages.map((stage) => (
            <Droppable key={stage} droppableId={stage}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-50 border p-4 rounded-lg shadow-md min-h-[300px]">
                  <h2 className="text-xl font-bold mb-3 text-center">{stage}</h2>
                  {tasks.filter(task => task.status === stage).map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white border mb-2 p-3 rounded-md shadow-sm flex justify-between items-center">
                          <div>
                            <h3 className="font-bold">{task.title}</h3>
                            <p>{task.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <FaEdit onClick={() => editTask(task)} className="text-blue-500 cursor-pointer" />
                            <FaTrash onClick={() => deleteTask(task._id)} className="text-red-500 cursor-pointer" />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;

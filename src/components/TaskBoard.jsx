import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as generateId } from "uuid";

// Sample Task Data
const defaultTasks = [
  { id: generateId(), title: "Initialize Repo", details: "Setup GitHub", status: "To-Do" },
  { id: generateId(), title: "Fix UI Bugs", details: "Resolve alignment issues", status: "To-Do" },
  { id: generateId(), title: "Update Documentation", details: "Write API guides", status: "In Progress" },
  { id: generateId(), title: "Deploy Application", details: "Push to production", status: "Done" },
];

// Task categories
const taskStages = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
  const [taskList, setTaskList] = useState(defaultTasks);
  const [taskInput, setTaskInput] = useState({ title: "", details: "", status: "To-Do" });

  // Handle Drag and Drop logic
  const onDragComplete = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedTasks = [...taskList];
    const movedItem = updatedTasks.splice(source.index, 1)[0];
    movedItem.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedItem);

    setTaskList(updatedTasks);
  };

  // Input Change Handler
  const handleInput = (event) => {
    setTaskInput({ ...taskInput, [event.target.name]: event.target.value });
  };

  // Add Task to List
  const addNewTask = () => {
    if (!taskInput.title.trim()) return;
    const newEntry = { id: generateId(), ...taskInput };
    setTaskList([...taskList, newEntry]);
    setTaskInput({ title: "", details: "", status: "To-Do" });
  };

  return (
    <div className="container mx-auto">
      {/* New Task Input */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Enter Task Title"
          value={taskInput.title}
          onChange={handleInput}
          className="p-2 border rounded-md shadow-sm"
        />
        <input
          type="text"
          name="details"
          placeholder="Task Details"
          value={taskInput.details}
          onChange={handleInput}
          className="p-2 border rounded-md shadow-sm"
        />
        <select
          name="status"
          value={taskInput.status}
          onChange={handleInput}
          className="p-2 border rounded-md shadow-sm"
        >
          {taskStages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
        <button
          onClick={addNewTask}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
        >
          Add Task
        </button>
      </div>

      {/* Task Management Board */}
      <DragDropContext onDragEnd={onDragComplete}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {taskStages.map((stage) => (
            <Droppable key={stage} droppableId={stage}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 border p-4 rounded-lg shadow-md min-h-[300px]"
                >
                  <h2 className="text-lg font-bold mb-3">{stage}</h2>
                  {taskList
                    .filter((task) => task.status === stage)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-3 mb-2 border rounded-md shadow-md"
                          >
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.details}</p>
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

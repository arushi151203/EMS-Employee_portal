import { useState } from "react";
import { List, KanbanSquare, Plus } from "lucide-react";

import TaskList from "../components/TaskList";
import KanbanBoard from "../components/KanbanBoard";
import NewTaskModal from "../components/NewTaskModal";
import tasksData from "../data/tasks";

function Tasks() {
  const [tasks, setTasks] = useState(tasksData);
  const [view, setView] = useState("list");
  const [filter, setFilter] = useState("all");
  // NOTE: page-level search input removed (duplicated navbar search).
  // Wire this to the navbar's search value/context when that's available.
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // Search + Filter
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" || task.status === filter;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Toggle Complete
  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              status: !task.completed ? "done" : "todo",
            }
          : task
      )
    );
  };

  // Add Task
  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white px-10 pt-10 pb-10">

      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

        <div>
          <h1 className="text-[28px] leading-tight font-bold">Tasks</h1>

          <p className="mt-1.5 text-sm text-gray-400">
            Manage employee assignments and project progress.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* View Toggle */}
          <div className="flex rounded-lg bg-[#1A2333] p-1">

            <button
              onClick={() => setView("list")}
              className={`rounded-md p-2 ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List size={18} />
            </button>

            <button
              onClick={() => setView("kanban")}
              className={`rounded-md p-2 ${
                view === "kanban"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <KanbanSquare size={18} />
            </button>

          </div>

          {/* New Task */}
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold hover:bg-blue-700"
          >
            <Plus size={16} />
            New Task
          </button>

        </div>

      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">

        {[
          { label: "All", value: "all" },
          { label: "Todo", value: "todo" },
          { label: "In Progress", value: "in-progress" },
          { label: "Done", value: "done" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === item.value
                ? "bg-blue-600 text-white"
                : "bg-[#1A2333] text-gray-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}

      </div>

      {/* Content */}
      <div className="mt-6">
        {view === "list" ? (
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <KanbanBoard tasks={filteredTasks} 
           onToggleComplete={handleToggleComplete}/>
        )}
      </div>

      {/* Modal */}
      <NewTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddTask={handleAddTask}
      />

    </div>
  );
}

export default Tasks;
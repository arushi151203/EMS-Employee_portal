import { useState } from "react";
import { Search, List, KanbanSquare, Plus } from "lucide-react";

import TaskList from "../components/TaskList";
import KanbanBoard from "../components/KanbanBoard";
import NewTaskModal from "../components/NewTaskModal";
import tasksData from "../data/tasks";

function Tasks() {
  const [tasks, setTasks] = useState(tasksData);
  const [view, setView] = useState("list");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" || task.status === filter;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

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

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-8">

      {/* Search */}
      <div className="mb-8">
        <div className="flex w-80 items-center rounded-xl bg-[#1A2333] px-4 py-3">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-3 w-full bg-transparent text-white outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

        <div>
          <h1 className="text-5xl font-bold">Tasks</h1>

          <p className="mt-2 text-gray-400">
            Manage employee assignments and project progress.
          </p>
        </div>

        <div className="flex items-center gap-4">

          {/* View Toggle */}
          <div className="flex rounded-xl bg-[#1A2333] p-1">

            <button
              onClick={() => setView("list")}
              className={`rounded-lg p-3 transition ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List size={20} />
            </button>

            <button
              onClick={() => setView("kanban")}
              className={`rounded-lg p-3 transition ${
                view === "kanban"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <KanbanSquare size={20} />
            </button>

          </div>

          {/* New Task */}
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
          >
            <Plus size={18} />
            New Task
          </button>

        </div>

      </div>

      {/* Filter Buttons */}
      <div className="mt-8 flex flex-wrap gap-3">

        {[
          { label: "All", value: "all" },
          { label: "Todo", value: "todo" },
          { label: "In Progress", value: "in-progress" },
          { label: "Done", value: "done" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`rounded-lg px-5 py-2 font-medium transition ${
              filter === item.value
                ? "bg-blue-600 text-white"
                : "bg-[#1A2333] text-gray-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}

      </div>

      {/* Task Content */}
      <div className="mt-8">

        {view === "list" ? (
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
          />
        ) : (
          <KanbanBoard tasks={filteredTasks} />
        )}

      </div>

      {/* New Task Modal */}
      <NewTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddTask={handleAddTask}
      />

    </div>
  );
}

export default Tasks;
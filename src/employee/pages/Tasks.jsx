import { useState } from "react";
import { List, KanbanSquare, Plus } from "lucide-react";

import TaskList from "../components/TaskList";
import KanbanBoard from "../components/KanbanBoard";
import NewTaskModal from "../components/NewTaskModal";
import tasksData from "../data/tasks";
import { Button } from "@/components/ui/button";

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
    <div>

      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

        <div>
          <h1 className="text-2xl font-bold leading-tight">Tasks</h1>

          <p className="mt-1.5 text-sm text-muted-foreground">
            Manage employee assignments and project progress.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* View Toggle */}
          <div className="flex rounded-lg bg-muted p-1">

            <button
              onClick={() => setView("list")}
              className={`rounded-md p-2 ${
                view === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List size={18} />
            </button>

            <button
              onClick={() => setView("kanban")}
              className={`rounded-md p-2 ${
                view === "kanban"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <KanbanSquare size={18} />
            </button>

          </div>

          {/* New Task */}
          <Button onClick={() => setOpenModal(true)}>
            <Plus size={16} />
            New Task
          </Button>

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
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
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
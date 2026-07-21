import { X } from "lucide-react";
import { useState } from "react";

function NewTaskModal({ open, onClose, onAddTask }) {
  const [task, setTask] = useState({
    title: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title || !task.dueDate) {
      alert("Please fill all required fields.");
      return;
    }

    onAddTask({
      id: Date.now(),
      ...task,
      completed: false,
    });

    setTask({
      title: "",
      priority: "medium",
      status: "todo",
      dueDate: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

      <div className="w-[450px] rounded-xl bg-slate-900 p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            New Task
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Task Title"
            className="w-full rounded-lg bg-slate-800 p-3 outline-none"
            value={task.title}
            onChange={(e) =>
              setTask({ ...task, title: e.target.value })
            }
          />

          <select
            className="w-full rounded-lg bg-slate-800 p-3"
            value={task.priority}
            onChange={(e) =>
              setTask({ ...task, priority: e.target.value })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          <select
            className="w-full rounded-lg bg-slate-800 p-3"
            value={task.status}
            onChange={(e) =>
              setTask({ ...task, status: e.target.value })
            }
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <input
            type="date"
            className="w-full rounded-lg bg-slate-800 p-3"
            value={task.dueDate}
            onChange={(e) =>
              setTask({ ...task, dueDate: e.target.value })
            }
          />

          <button
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
          >
            Add Task
          </button>

        </form>

      </div>

    </div>
  );
}

export default NewTaskModal;
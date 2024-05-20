import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, status: "pending", id: Date.now() };
    console.log(newItem);

    handleAddItems(newItem);
    setDescription("");
  }

  return (
    <div>
      <Input
        onAddItems={handleAddItems}
        onSubmit={handleSubmit}
        setDescription={setDescription}
      />
      <TodoList
        description={description}
        items={items}
        onAddItems={handleAddItems}
        onDeleteItems={handleDeleteItems}
      />
    </div>
  );
}

function Input({ onSubmit, description, setDescription }) {
  return (
    <div className="container">
      <div className="input-bg">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="What would you like to do?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="add-button">Add</button>
        </form>
      </div>
    </div>
  );
}

function TodoList({ items, description, status, onDeleteItems }) {
  return (
    <div className="container">
      <div className="todo-bg">
        <h2 className="todo-title">Todo List</h2>
        <div className="type-bar">
          <div className="task-type">List</div>
          <div className="task-type">Status</div>
          <div className="task-type">Close</div>
        </div>
        {items.map((item) => (
          <ListItem
            item={item}
            description={description}
            status={status}
            key={item.id}
            onDeleteItems={onDeleteItems}
          />
        ))}
      </div>
    </div>
  );
}

function ListItem({ item, onDeleteItems }) {
  const [status, setStatus] = useState("pending");
  function handleStatus() {
    if (status === "pending") {
      setStatus("Completed");
    } else {
      setStatus("pending");
    }
  }

  const { description } = item;

  return (
    <div className="container">
      <div className="list-item">
        <div className="list-text">{description}</div>
        <div
          className={status === "pending" ? "list-status" : "list-completed"}
          onClick={handleStatus}
        >
          {status}
        </div>
        <div className="list-close" onClick={() => onDeleteItems(item.id)}>
          ❌
        </div>
      </div>
    </div>
  );
}

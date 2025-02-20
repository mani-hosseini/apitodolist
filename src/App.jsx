import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [idCounter, setIdCounter] = useState(1);
    const [editingTodo, setEditingTodo] = useState(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        axios
            .get("https://dummyjson.com/todos")
            .then((response) => {
                setTodos(response.data.todos);
            })
            .catch((error) => {
                console.error("Error fetching todos:", error);
            });
    }, []);

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const addTodo = (e) => {
        e.preventDefault();

        if (!newTodo.trim()) return;

        const newTodoItem = {
            id: idCounter,
            todo: newTodo,
            completed: false,
        };

        setTodos([...todos, newTodoItem]);
        setIdCounter(idCounter + 1);
        setNewTodo("");
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const startEditing = (todo) => {
        setEditingTodo(todo.id);
        setEditText(todo.todo);
    };

    const saveEdit = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, todo: editText } : todo
            )
        );
        setEditingTodo(null);
        setEditText("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">
                Todo <span className="text-teal-400">List</span>
            </h1>

            <form onSubmit={addTodo} className="mt-5 flex gap-3">
                <input
                    type="text"
                    placeholder="Add a new task"
                    className="w-64 h-11 px-3 border border-black rounded-3xl outline-none"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-10 h-10 bg-black text-white text-xl rounded-full"
                >
                    +
                </button>
            </form>

            <section className="mt-7 flex flex-col items-center gap-3">
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className={`flex items-center justify-between w-80 h-16 px-4 border border-black rounded-lg ${
                            todo.completed ? "bg-[#B6DBE3]" : "bg-[#F5D1D4]"
                        }`}
                    >
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                                className="mr-3"
                            />
                            {editingTodo === todo.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="text-sm border-b border-black"
                                />
                            ) : (
                                <p className="text-sm">{todo.todo}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {editingTodo === todo.id ? (
                                <button
                                    onClick={() => saveEdit(todo.id)}
                                    className="text-blue-500"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => startEditing(todo)}
                                    className="text-blue-500 cursor-pointer"
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-red-500"
                            >
                                ❌
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default App;

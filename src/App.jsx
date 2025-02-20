import {useState, useEffect} from "react";
import axios from "axios";

const App = () => {
    const [todos, setTodos] = useState([]);

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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">
                Todo <span className="text-teal-400">List</span>
            </h1>
            <section className="mt-7 flex flex-col items-center gap-3">
                {todos.map((todo) => (
                    <div key={todo.id}
                         className="flex items-center justify-between w-80 h-16 px-4 border border-black rounded-lg bg-[#F5D1D4]">
                        <p className="text-sm">{todo.todo}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default App;

import axios from "axios";
import { BASEURL } from "../../config";

export default function TodoComponent({ todos, fetchData, setFetchData }) {

  const handleDelete = async (title, description) => {
    try {
      const tok = localStorage.getItem("token");
      await axios.delete(`${BASEURL}/delete-todo`, {
        headers: {
          token : tok
        },
        data: {
          title,
          description
        }
      });
      setFetchData(!fetchData);
      alert("Todo deleted successfully..");
    } catch (error) {
      alert("server busy");
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black mb-2">Your Todos</h2>
        <p className="text-gray-600">Manage your tasks efficiently</p>
      </div>
      {todos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No todos available.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-lg font-semibold text-black mb-3">{todo.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{todo.description}</p>
              <button
                onClick={() => handleDelete(todo.title, todo.description)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

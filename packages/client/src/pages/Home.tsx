import { useState } from "react";
import Todos from "../components/Todos";
import { trpc } from "../utils/trpc";

interface Props {}
export default function Home({}: Props) {
  const [formData, setFormData] = useState({ title: "" });
  const { data, isLoading } = trpc.todo.list.useQuery();
  const mutation = trpc.todo.create.useMutation();
  const trpcContext = trpc.useContext();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.title.length <= 0) {
      alert("Please enter something !");
      return;
    }

    mutation.mutate(
      { title: formData.title },
      {
        onSuccess: () => {
          alert("Todo Created !");
          trpcContext.todo.list.invalidate();
        },
      }
    );
    setFormData({ title: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center ">
      <div className=" font-bold text-center mb-10">
        <p className="text-6xl">TODO APP</p>
        <p className="text-xl opacity-50"> React | Express | tRPC | Prisma</p>
      </div>
      {/* Display Todos */}
      {isLoading && <p>Loading todos ...</p>}
      {data?.todos && <Todos todos={data?.todos} />}
      {/* Insert Todo */}
      <form onSubmit={handleSubmit} className="mt-10 flex">
        <input
          className="p-2 outline-none border border-gray-200 transition-all duration-300  rounded-lg focus:border-gray-500"
          placeholder="Code ..."
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mx-2  rounded-lg "
        >
          Add todo
        </button>
      </form>
    </div>
  );
}

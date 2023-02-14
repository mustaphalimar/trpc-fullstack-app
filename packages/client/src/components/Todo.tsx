import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Todo as TodoType } from "../types/Todo";
import { FaTrash, FaEdit } from "react-icons/fa";
import { trpc } from "../utils/trpc";

interface Props {
  todo: TodoType;
}

export default function Todo({ todo }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [todoText, setTodoText] = useState(todo.title);
  const [todoCompleted, setTodoCompleted] = useState(todo.isCompleted);

  const updateMutation = trpc.todo.update.useMutation();
  const deleteMutation = trpc.todo.delete.useMutation();
  const trpcContext = trpc.useContext();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
    setCanSave(true);
  };

  const handleChangeCompleted = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoCompleted(e.target.checked);
    setCanSave(true);
  };

  const handleUpdate = () => {
    updateMutation.mutate(
      {
        id: todo.id,
        title: todoText,
        isCompleted: todoCompleted,
      },
      {
        onSuccess: () => trpcContext.todo.list.invalidate(),
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(
      {
        id: todo.id,
      },
      {
        onSuccess: () => trpcContext.todo.list.invalidate(),
      }
    );
  };

  return (
    <li
      className="border-2 m-2 w-full rounded-lg p-4 flex justify-between"
      key={todo.id}
    >
      <div className="flex">
        {isEditing ? (
          <input
            className="border-2  border-blue-400 rounded p-2"
            value={todoText}
            onChange={handleChangeTitle}
          />
        ) : (
          <p
            className={`${
              todoCompleted ? "opacity-60 line-through" : "opacity-100"
            } `}
          >
            {todo.title}
          </p>
        )}
        {isEditing ? (
          <div className="mx-6 flex items-center">
            <input
              type="checkbox"
              checked={todoCompleted}
              onChange={handleChangeCompleted}
            />
            <p className="mx-4">
              {todoCompleted ? "Completed" : "Not Completed"}
            </p>
          </div>
        ) : (
          <div className="mx-6 flex items-center">
            <input type="checkbox" checked={todoCompleted} />
            <p className="mx-4">
              {todoCompleted ? "Completed" : "Not Completed"}
            </p>
          </div>
        )}
      </div>
      <div>
        {isEditing && (
          <button
            className={`p-2 mx-2 bg-gray-400 text-white rounded`}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        )}
        {isEditing && (
          <button
            className={`${
              canSave ? "opacity-100" : "opacity-60"
            } p-2 mx-2 bg-green-500 text-white rounded`}
            disabled={!canSave}
            onClick={handleUpdate}
          >
            Save
          </button>
        )}
      </div>
      <div className="mx-4">
        <button className="mx-2" onClick={handleDelete}>
          <FaTrash size={25} color="#f0324f" />
        </button>
        <button className="mx-2" onClick={handleUpdate}>
          <FaEdit size={25} color="blue" onClick={() => setIsEditing(true)} />
        </button>
      </div>
    </li>
  );
}

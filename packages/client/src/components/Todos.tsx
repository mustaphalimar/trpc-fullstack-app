import { Todo as TodoType } from "../types/Todo";
import Todo from "./Todo";

interface Props {
  todos: TodoType[];
}
export default function Todos({ todos }: Props) {
  return (
    <ul className="mt-4 flex flex-col w-full ">
      {todos.length &&
        todos.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
    </ul>
  );
}

import { GetServerSideProps, NextPage } from "next";
import TodoList from "../components/TodoList";
import { getTodosAPI } from "../lib/api/todo";
import { wrapper } from "../store";
import { todoAction } from "../store/todo";

const index: NextPage = () => {
    return <TodoList todos={[]} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store }) => {
        console.log(store);
        try {
            const { data } = await getTodosAPI();
            store.dispatch(todoAction.setTodo(data));
            return { props: { todos: data } };
        } catch(e) {
            console.log(e);
            return { props: { todos: [] } };
        }
    }
);

export default index;
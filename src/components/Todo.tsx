import { Card, HStack, Text, IconButton, Button, Checkbox } from '@chakra-ui/react';
import { selectAllDeletingTodosId, setDeleteStatus } from '../store/reducers/delete';
import { useAppDispatch, useAppSelector } from '../types/store';
import { createNewTodo, setDeletedTodos } from '../store/reducers/todos';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import ITodo from '../types/todo';
import { useState } from 'react';

interface ITodoElem {
    item: ITodo
}

export default function Todo({ item }: ITodoElem) {
    const { select_all, deleting_todos } = useAppSelector(state => state.delete);
    const { todos } = useAppSelector(state => state.todos);
    const dispatch = useAppDispatch();

    const deleteTodo = () => {
        try {
            const filteredTodos = todos?.filter(todoItem => todoItem.id !== item.id);
            dispatch(setDeletedTodos(filteredTodos));
        } catch (error) {
            console.error(error);
        };
    };

    const confirmToDelete = () => {
        const choosenOne = deleting_todos?.filter(id => id === item.id)[0];
        if (choosenOne) return true
        else return false
    };

    const removeFromDeletingList = () => {
        const filteredId = deleting_todos?.filter(id => id !== item.id)
        dispatch(selectAllDeletingTodosId(filteredId));
        if (deleting_todos?.length === 1) dispatch(setDeleteStatus(false))
    };

    const addToDeletingList = () => {
        const newDeletetingIdOfTodos = deleting_todos ?
            [...deleting_todos, item.id] : deleting_todos
        dispatch(selectAllDeletingTodosId(newDeletetingIdOfTodos));
    };

    const compliteTodo = () => {
        const updatedTodo = todos?.map(todo => {
            if (todo.id === item.id) {
                return { ...todo, complited: true };
            }
            return todo;
        });
        dispatch(createNewTodo(updatedTodo));
    };

    return (
        <Card
            w={'100%'}
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            p={2}
            mb={5}
            paddingTop={5}
            paddingBottom={5}
            transition={'.2s'}
            _hover={{ boxShadow: '2px 2px 10px #ccc' }}
        >
            <HStack>
                <Checkbox
                    defaultChecked={item.complited}
                    onChange={() => compliteTodo()}
                    disabled={item.complited}
                />
                <Text
                    fontSize={'xl'}
                    fontWeight={'600'}
                    textTransform={'capitalize'}
                    textDecoration={item.complited ? 'line-through' : ''}
                >{item.title}</Text>
            </HStack>

            <HStack>
                {!select_all && <Link to={`/todos/${item.id}`}>
                    <Button>читать далее</Button>
                </Link>}

                {!select_all && !item.complited && <Link to={`/todos/edit/${item.id}`}>
                    <IconButton
                        aria-label='Search database'
                        icon={<MdEdit color='blue' />}
                    />
                </Link>}

                {!select_all && <IconButton
                    aria-label='Search database'
                    onClick={deleteTodo}
                    icon={<MdDelete color='red' />}
                />}

                {select_all && <Checkbox
                    marginRight={5}
                    onChange={confirmToDelete() === true ? () => removeFromDeletingList() : () => addToDeletingList()}
                    defaultChecked={confirmToDelete()}
                />}
            </HStack>
        </Card >
    );
};

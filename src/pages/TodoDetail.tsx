import { Box, Button, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../types/store';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from "react-icons/md";
import { setDeletedTodos } from '../store/reducers/todos';
import ITodo from '../types/todo';

export default function TodoDetail() {
    const [todo, setTodo] = useState<ITodo>()
    const { id } = useParams();
    const { todos } = useAppSelector(state => state.todos);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const todoFilter = todos?.filter(item => item.id === Number(id))[0];
        setTodo(todoFilter);
    }, [id]);


    const deleteTodo = () => {
        const updatedTodos = todos?.filter(item => item.id !== todo?.id);
        dispatch(setDeletedTodos(updatedTodos));
        navigate('/');
    };

    return (
        <Flex p={5} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={5}>
                <Button onClick={() => navigate('/')}>
                    <IoMdArrowBack style={{ marginRight: 5, display: 'flex', alignItems: 'center' }} />
                    назад
                </Button>
                <Box>
                    {!todo?.complited && <Link to={`/todos/edit/${id}`}>
                        <IconButton
                            colorScheme='blue'
                            aria-label='Search database'
                            icon={<MdEdit />}
                            mr={2}
                        />
                    </Link>}
                    <IconButton
                        colorScheme='red'
                        aria-label='Search database'
                        icon={<MdDelete />}
                        onClick={deleteTodo}
                    />
                </Box>
            </Box>
            <Heading mb={5}>{todo?.title}</Heading>
            <Text>{todo?.desc}</Text>

        </Flex>
    );
};
import { Button, Flex, Input, Text, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';
import { FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../types/store';
import { createNewTodo } from '../store/reducers/todos';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

export default function CreateTodo() {
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [time, setTime] = useState<boolean>(false);
    const { todos } = useAppSelector(state => state.todos);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'title') setTitle(value)
        else if (name === 'desc') setDesc(value)
    };


    const createTodo = (event: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (title && desc) {
            setTime(true);
            setTimeout(() => {
                const newTodo = { id: Number(todos?.length) + 1, title, desc, complited: false };
                const updatedTodos = todos ? [...todos, newTodo] : todos;
                dispatch(createNewTodo(updatedTodos));
                setError(false);
                setTime(false);
                return navigate('/')
            }, 500)
        } else {
            setError(true);
        };
    };



    return (
        <Flex flexDirection={'column'} p={5}>
            <Button onClick={() => navigate('/')} w={100} mb={5}>
                <IoMdArrowBack style={{ marginRight: 5, display: 'flex', alignItems: 'center' }} />
                назад
            </Button>
            <Text fontSize={'2xl'} fontWeight={'500'} mb={7}>Создать todo</Text>

            <form onSubmit={createTodo}>
                <FormControl>
                    <FormLabel>название</FormLabel>
                    <Input
                        type='text'
                        mb={5}
                        name='title'
                        value={title}
                        onChange={onChange}
                    />

                    <FormLabel>описание</FormLabel>
                    <Textarea
                        mb={5}
                        name='desc'
                        value={desc}
                        onChange={onChange}
                    />

                    <FormLabel>дата</FormLabel>

                    {error && (
                        <Alert status='error' mb={5}>
                            <AlertIcon />
                            <AlertTitle>Пожалуйста, заполните форму</AlertTitle>
                        </Alert>
                    )}

                    {!time && <Button onClick={createTodo}>Создать</Button>}
                    {time && <Button disabled>Cоздание...</Button>}

                </FormControl>
            </form>

        </Flex>
    );
};
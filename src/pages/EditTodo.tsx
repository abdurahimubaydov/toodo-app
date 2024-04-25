import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../types/store';
import ITodo from '../types/todo';
import { Button, Flex, Input, Text, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { IoMdArrowBack } from 'react-icons/io';
import { createNewTodo } from '../store/reducers/todos';

export default function EditTodo() {
    const [title, setTitle] = useState<string | undefined>('');
    const [desc, setDesc] = useState<string | undefined>('');
    const [time, setTime] = useState<boolean>(false);
    const [todo, setTodo] = useState<ITodo>()
    const { id } = useParams();
    const { todos } = useAppSelector(state => state.todos);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    useEffect(() => {
        const todoFilter = todos?.filter(item => item.id === Number(id))[0];
        setTodo(todoFilter);
        setTitle(todoFilter?.title);
        setDesc(todoFilter?.desc)
    }, [id]);


    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'title') setTitle(value)
        else if (name === 'desc') setDesc(value)
    };

    const editTodo = (event: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setTime(true);
        setTimeout(() => {
            const updatedTodo = todos?.map(item => {
                if (todo?.id === item.id) {
                    return { ...item, title: title, desc: desc };
                };
                return item;
            });
            dispatch(createNewTodo(updatedTodo));
            setTime(false);
        }, 500)

        navigate('/')
    }

    return (
        <Flex flexDirection={'column'} p={5}>
            <Button onClick={() => navigate('/')} w={100} mb={5}>
                <IoMdArrowBack style={{ marginRight: 5, display: 'flex', alignItems: 'center' }} />
                назад
            </Button>
            <Text fontSize={'2xl'} fontWeight={'500'} mb={7}>Редактировать todo</Text>

            <form onSubmit={editTodo}>
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

                    {!time && <Button onClick={editTodo}>Редактировать</Button>}
                    {time && <Button disabled>редактирование...</Button>}

                </FormControl>
            </form>

        </Flex>
    );
};
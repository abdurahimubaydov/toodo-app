import { Text, CardHeader as Header, Button, HStack, CloseButton, useDisclosure } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../types/store';
import { IoAddOutline } from "react-icons/io5";
import { setDeleteStatus, selectAllDeletingTodosId } from '../store/reducers/delete';
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useRef } from 'react';
import { setDeletedTodos } from '../store/reducers/todos';
import DeleteAlert from './DeleteAlert';

export default function CardHeader() {
    const dispatch = useAppDispatch();
    const { select_all, deleting_todos } = useAppSelector(state => state.delete);
    const { pathname } = useLocation();
    const { todos } = useAppSelector(state => state.todos);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    const selectAllTodos = () => {
        dispatch(selectAllDeletingTodosId(todos?.map(item => item.id)));
    };

    const removeChoosenElements = () => {
        const newArray = todos?.filter(item => !deleting_todos?.includes(item.id));
        dispatch(setDeletedTodos(newArray));
    };

    useEffect(() => {
        if (todos?.length === 0) dispatch(setDeleteStatus(false))
    }, [todos])

    return (
        <Header display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Link to={'/'}>
                <Text
                    fontFamily={'inherit'}
                    fontSize={'2xl'}
                    fontWeight={'500'}
                > Todo App</Text>
            </Link>

            <HStack>
                {!select_all && pathname === '/' && <Link to={'/create-todo'}>
                    <IconButton
                        aria-label='Search database'
                        icon={<IoAddOutline />}
                        colorScheme='blue'
                    />
                </Link>}

                {!select_all &&
                    pathname === '/' &&
                    todos?.length !== 0 &&
                    <Button onClick={() => {
                        dispatch(setDeleteStatus(true))
                        selectAllTodos()
                    }}>выбрать все</Button>
                }
                {select_all && pathname === '/' && (
                    <HStack>
                        <CloseButton
                            onClick={() => {
                                dispatch(setDeleteStatus(false))
                                dispatch(selectAllDeletingTodosId([]))
                            }}
                        />

                        <FaCheckCircle
                            fontSize={17}
                        />
                        <Text>{deleting_todos?.length}</Text>
                        <Button onClick={onOpen}>
                            <MdDelete style={{ marginRight: 5 }} />удалить
                        </Button>
                    </HStack>
                )}
                <DeleteAlert
                    isOpen={isOpen}
                    cancelRef={cancelRef}
                    onClose={onClose}
                    removeChoosenElements={removeChoosenElements}
                />
            </HStack>
        </Header>
    );
};

import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateTodo from './CreateTodo';
import TodoDetail from './TodoDetail';
import EditTodo from './EditTodo';

export default function CardBody() {
    return (
        <Box w={'100%'}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/todos/:id' element={<TodoDetail />} />
                <Route path='/todos/edit/:id' element={<EditTodo />} />
                <Route path='/create-todo' element={<CreateTodo />} />
            </Routes>
        </Box>
    );
};

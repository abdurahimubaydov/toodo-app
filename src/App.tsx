import { useEffect } from 'react';
import { Box, Card, Center, Divider } from '@chakra-ui/react';
import CardHeader from './components/CardHeader';
import CardBody from './pages/CardBody';
import { getTodosFromStorage } from './helpers/storage';
import { useAppDispatch } from './types/store';
import { setTodos } from './store/reducers/todos';


export default function App() {
  const getItems = getTodosFromStorage('todos');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getItems !== null)
      dispatch(setTodos(JSON.parse(getItems)));
  }, [getItems]);


  return (
    <Center w={'100%'} h={'100vh'}>
      <Card
        w={{ base: '100%', md: '50%', lg: '35%' }}
        height={{ base: '100vh', md: '85vh' }}
        boxShadow={'2px 2px 10px #ccc'}
        overflowX={'scroll'}
      >
        <CardHeader />
        <Divider />
        <Box>
          <CardBody />
        </Box>
      </Card>
    </Center>
  );
};

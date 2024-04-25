import { Box } from '@chakra-ui/react';
import Todos from '../components/Todos';

export default function Home() {
    return (
        <Box w={'100%'}>
            <Todos />
        </Box>
    );
};
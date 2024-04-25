import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Todo from './Todo';
import { useAppSelector } from '../types/store';

export default function Todos() {

    const { todos } = useAppSelector(state => state.todos);

    return (
        <Flex w={'100%'} flexDirection={'column'} p={3}>
            {todos?.length === 0 && <Text fontSize={'2xl'} p={2} color={'red'} fontWeight={'500'}> ой, никаких дел</Text>}
            {todos?.map(item => (
                <Todo
                    item={item}
                    key={item.id}
                />
            ))}
        </Flex>
    );
};

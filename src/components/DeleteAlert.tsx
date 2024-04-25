import React from 'react';
import {
    AlertDialog,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
} from '@chakra-ui/react'
import todos from '../store/reducers/todos';
import { useAppSelector } from '../types/store';

interface IDeleteAlert {
    isOpen: any,
    cancelRef: any,
    onClose: any,
    removeChoosenElements: () => void
}

export default function DeleteAlert({
    isOpen, cancelRef, onClose, removeChoosenElements
}: IDeleteAlert) {
    const { deleting_todos } = useAppSelector(state => state.delete);
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Вы хотите удалить все задачи?
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Отменить
                        </Button>
                        <Button colorScheme='red' onClick={() => {
                            removeChoosenElements()
                            onClose();
                        }} ml={3}>
                            {deleting_todos?.length === 1 ? 'Удалить' : 'Удалить все'}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

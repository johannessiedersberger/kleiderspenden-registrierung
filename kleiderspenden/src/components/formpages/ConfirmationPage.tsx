import React from "react";
import Header from "../frontpages/Header";
import Footer from "../frontpages/Footer";

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Select,
    RadioGroup,
    Radio, FormHelperText, FormErrorMessage, useToast,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';
import { useStore } from '../../App';
import { useNavigate } from 'react-router-dom';


const ConfirmationPage = () => {

    const donation: any = useStore((state) => state.donation);

    const deleteDonation = useStore((state) => state.removeDonation);

    const navigate = useNavigate();

    const reSubmitDonation = () => {
        navigate("/spenden");
        deleteDonation();
    }

    return (
        <div>
            <Header />
            <Flex
                minH={'90vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} >
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Vielen Dank</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            für Ihre Spende
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>

                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Angabe</Th>
                                        <Th>Wert</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        Object.keys(donation)?.map((value: string, index: number, array: string[]) => {
                                            return (
                                                <Tr key={value}>
                                                    <Td>{value}</Td>
                                                    <Td>{Object.values(donation)[index]!.toString()}</Td>
                                                </Tr>)
                                        })
                                    }
                                </Tbody>

                            </Table>
                        </TableContainer>
                        <Stack spacing={4}>
                            <Stack spacing={10}>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={reSubmitDonation}
                                >
                                    Erneut Spenden
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex >
            <Footer />
        </div >
    )

}

export default ConfirmationPage;
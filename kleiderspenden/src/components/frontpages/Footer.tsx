import React from "react";
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    Link
} from '@chakra-ui/react'
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {

    return (<div>
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Text>© 2023 Kleiderspenden e.V. All rights reserved</Text>
                <Stack direction={'row'} spacing={4}>
                    <RouterLink to="/impressum">
                        <Link>
                            Impressum / Datenschutz
                        </Link>
                    </RouterLink>
                </Stack>
            </Container>
        </Box>

    </div >)
};


export default Footer;
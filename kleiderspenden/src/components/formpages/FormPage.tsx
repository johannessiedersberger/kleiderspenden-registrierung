import React, { useEffect, useRef, useState, createRef } from "react";
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
    Radio, FormHelperText, FormErrorMessage, useToast
} from '@chakra-ui/react';
import { useStore } from '../../App';
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const FormPage = () => {

    const [clothing, setClothing] = useState('');
    const [region, setRegion] = useState('');
    const [delivery, SetDelivery] = useState('Abholung');
    const [street, setStreet] = useState('');
    const [plz, setPlz] = useState<any>(undefined);
    const [city, setCity] = useState('');

    const toast = useToast();

    const navigate = useNavigate();

    const addDonation = useStore(state => state.setDonation);

    const handleInputChangeClothing = (e: any) => {
        setClothing(e.target.value);
    }

    const handleInputChangeRegion = (e: any) => {
        setRegion(e.target.value);
    }

    const handleDeliveryChange = (e: any) => {
        SetDelivery(e);
    }

    const handleStreetChange = (e: any) => {
        setStreet(e.target.value);
    }

    const handlePlzChange = (e: any) => {
        setPlz(e.target.value);
    }

    const handleCityChange = (e: any) => {
        setCity(e.target.value);
    }

    const isPlzError = !(plz === undefined) && !(plz !== undefined && plz.toString().startsWith('82'));

    const submitDonation = () => {
        if (clothing == "" || region == "" || delivery == "") {
            toast({
                title: 'Falsche Eingabe',
                description: "Angaben unvollständig",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            })
        }
        else if (delivery == "Abholung" && (street == "" || plz == null || city == "")) {
            toast({
                title: 'Falsche Eingabe',
                description: "Adresse unvollständig",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            })
        } else if (isPlzError) {
            toast({
                title: 'Falsche Eingabe',
                description: "Falsche PLZ",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            })
        } else {
            // Success

            toast({
                title: 'Eingabe erfolgreich',
                description: "Daten erfolgreich übermittelt",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top'
            });

            let donationValues: any = {
                "Art der Kleidung": clothing,
                "Region": region,
                "Abgabe": delivery,
                "Datum": new Date().toISOString()
            }

            if (delivery == 'Abholung') {
                donationValues["Strasse"] = street;
                donationValues["PLZ"] = plz;
                donationValues["Ort"] = city;
            }

            addDonation(donationValues);

            navigate("/bestaetigung");

        }
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
                        <Heading fontSize={'4xl'}>Daten für Spende eintragen</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            und unterstützen
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>Art der Kleidung</FormLabel>
                                <Select onChange={handleInputChangeClothing} placeholder='Kleidung auswählen'>
                                    <option value='Schuhe'>Schuhe</option>
                                    <option value='Shirts'>Shirts</option>
                                    <option value='Jacken'>Jacken</option>
                                    <option value='Hosen'>Hosen</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Krisengebiet</FormLabel>
                                <Select onChange={handleInputChangeRegion} placeholder='Region auswählen'>
                                    <option value='Albanien'>Albanien</option>
                                    <option value='Brasilien'>Brasilien</option>
                                    <option value='Moldau'>Moldau</option>
                                    <option value='Syrien'>Syrien</option>
                                    <option value='Togo'>Togo</option>
                                    <option value='Ukraine'>Ukraine</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Abgabe</FormLabel>
                                <RadioGroup onChange={handleDeliveryChange} defaultValue='Abholung'>
                                    <Stack spacing={4} direction='row'>
                                        <Radio value='Abholung'>Abholung</Radio>
                                        <Radio value='Abgabe Geschäftsstelle'>Abgabe Geschäftsstelle</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            {
                                delivery == 'Abgabe Geschäftsstelle' ? (<div></div>) : (
                                    <FormControl>
                                        <FormLabel>Adresse</FormLabel>
                                        <Stack spacing={4}>
                                            <Input
                                                errorBorderColor='crimson'
                                                placeholder='Straße, Hausnummer'
                                                type="text"
                                                onChange={handleStreetChange}
                                            />
                                            <FormControl isInvalid={isPlzError}>
                                                <Input
                                                    errorBorderColor='crimson'
                                                    placeholder='PLZ'
                                                    type="number"
                                                    onChange={handlePlzChange}
                                                    value={plz}

                                                />
                                                {isPlzError ? (
                                                    <FormErrorMessage>PLZ nicht für Abholung verfügbar.</FormErrorMessage>
                                                ) : (
                                                    <div></div>
                                                )}
                                            </FormControl>
                                            <Input
                                                errorBorderColor='crimson'
                                                placeholder='Ort'
                                                onChange={handleCityChange}
                                            />
                                        </Stack>
                                    </FormControl>
                                )
                            }
                            <Stack spacing={10}>

                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={submitDonation}
                                >
                                    Spende Bestätigen
                                </Button>

                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <Footer />
        </div>
    )
}

export default FormPage;
import { Box, Button, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleMobileNumberChange = (event) => {
        const inputMobileNumber = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

        if (inputMobileNumber.length === 10) {
            setMobileNumber(inputMobileNumber);
            setErrorMessage('');
        } else if (inputMobileNumber.length < 10) {
            setMobileNumber(inputMobileNumber);
            setErrorMessage('Mobile number should be 10 digits');
        } else {
            setErrorMessage('Mobile number cannot exceed 10 digits');
        }
    };

    const handleSendCode = () => {
        if (mobileNumber.length !== 10) {
            setErrorMessage('Mobile number should be 10 digits');
            return;
        }

        axios.post('https://staging.fastor.in/v1/pwa/user/register', {
            phone: mobileNumber,
            dial_code: '+91'
        })
        .then(response => {
            console.log('Mobile-response:', response)
            // Handle success response
            localStorage.setItem("mobile",mobileNumber)
            navigate('/verify');
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh">
            <Box id="home" w={["100%", "60%", "60%", "30%"]} m="auto" p="1rem">
                <Text color="#1E232C" fontFamily="Urbanist" fontWeight={700} fontSize="1.625rem" lineHeight="2.113rem" letterSpacing="-1%">
                    Enter Your Mobile Number
                </Text>

                <Text color="#8391A1" fontFamily="Urbanist" fontSize="1rem" lineHeight="1.5rem">
                    We will send you the 4 digit verification code
                </Text>

                <Input
                    type="tel" // Use "tel" type for better mobile keyboard support
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    placeholder="Enter Your Mobile"
                    _placeholder={{ fontSize: "0.85rem", color: "#718096" }}
                    fontSize="1rem"
                    w="100%"
                    border="1px solid #A0AEC0"
                    bgColor="#DADADA"
                    mt="1.5rem"
                    _focus={{
                        color: '#1E232C',
                        border: "1px solid #A0AEC0"
                    }}
                />

                {errorMessage && (
                    <Text color="red" mt="0.5rem" fontSize="0.85rem" fontFamily="Urbanist">
                        {errorMessage}
                    </Text>
                )}

                <Button mt="1.5rem" w="100%" bgColor="#FF6D6A" color="white" fontSize="0.938rem" fontFamily="Urbanist" fontWeight={600} lineHeight="1.125rem" onClick={handleSendCode}>
                    Send Code
                </Button>
            </Box>
        </Box>
    );
};

export default Register;

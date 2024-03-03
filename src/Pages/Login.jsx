import {
  Box,
  Button,
  Input,
  Text,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import { IoIosArrowBack } from "react-icons/io";

import { json, useNavigate } from "react-router-dom";


const Login = () => {
    const mobileNumber = localStorage.getItem('mobile');
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const buttonRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        buttonRef.current.focus();
        buttonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);


  const verifyOTP = () => {
    const completeOTP = otp.join("");

    if (completeOTP === "123456") {
      setErrorMessage("");
      axios.post('https://staging.fastor.in/v1/pwa/user/login', {
        phone: mobileNumber,
        otp: completeOTP,
        dial_code: '+91'
        })
        .then(response => {
            localStorage.setItem('USER', JSON.stringify(response.data.data));
            // Handle success response
            navigate("/home");
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
      
    } else {
      setErrorMessage("Please Check the code again");
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={'5px'}
      h={["90vh","100vh","100vh","90vh"]}
    >
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} w={'2.5rem'}
       bgColor={"#FFFFFF"} p="0.5rem" border={"1px solid #E8ECF4"} borderRadius={'0.75rem'} m={'1rem'} mt={'1.5rem'} cursor={'pointer'} onClick={()=>{
        navigate('/')
       }}>
        <IoIosArrowBack color="#1E232C" fontSize={'1.5rem'}/>
     </Box>
     
      <Box id="login" w={["100%", "60%", "60%", "30%"]} m="auto"  p="1rem">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          textAlign={"left"}
        >
          <Text
            color="#1E232C"
            fontFamily="Urbanist"
            fontWeight={700}
            fontSize="1.625rem"
            lineHeight="2.113rem"
            letterSpacing="-1%"
          >
            OTP Verification
          </Text>

          <Text
            
            fontFamily="Urbanist"
            fontSize="1rem"
            color="#8391A1"
            lineHeight="1.5rem"
          >
            Enter the verification code we just sent on your Mobile Number.
          </Text>
        </Box>

        <HStack w="100%" mt="1.5rem">
          <PinInput otp>
            {otp.map((value, index) => (
              <PinInputField
                key={index}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </PinInput>
        </HStack>
        {errorMessage && (
          <Text
            color="red"
            mt="0.5rem"
            fontSize="0.85rem"
            fontFamily="Urbanist"
          >
            {errorMessage}
          </Text>
        )}

        <Button
          ref={buttonRef}
          mt="1.5rem"
          w="100%"
          bgColor="#FF6D6A"
          color="white"
          fontSize="0.938rem"
          fontFamily="Urbanist"
          fontWeight={600}
          lineHeight="1.125rem"
          _hover={{ bgColor: "#FF6D6A", color: "white" }} // Override hover styles
          onClick={verifyOTP}
        >
          Verify
        </Button>

        <Text
          color="#1E232C"
          fontFamily="Urbanist"
          fontWeight={500}
          fontSize="1rem"
          lineHeight="1.5rem"
          mt={"0.8rem"}
        >
          Didn’t received code?{" "}
          <Text as={"span"} fontWeight={700} color={"#5e7bc9"}>
            Resend
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;

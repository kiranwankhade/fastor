import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Image,
  IconButton,
  Text,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { RiUserLocationLine } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";

import { MdKeyboardArrowRight } from "react-icons/md";

import { GiWallet } from "react-icons/gi";

import "../Style/Home.css";
import ImageCarousal from "./ImageCarousal";

import image1 from "../Assets/fastor1.jpg";
import image2 from "../Assets/fastor2.jpg";
import image3 from "../Assets/fastor3.jpg";
import image4 from "../Assets/fastor4.jpg";
import { Link } from "react-router-dom";

import { Bars } from "react-loader-spinner";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const [greeting, setGreeting] = useState("");

  const cards = [image1, image2, image3, image4];

  const fetchRestaurants = async () => {
    try {
      const storedData = localStorage.getItem("USER");

      if (storedData) {
        // Parse the stored string back into an object
        const parsedData = JSON.parse(storedData);

        const response = await axios.get(
          `https://staging.fastor.in/v1/m/restaurant?city_id=${118}`,
          {
            headers: {
              Authorization: `Bearer ${parsedData?.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("response.data:", response.data);
        setRestaurants(response.data);
        setLoading(false);
        setUserData(parsedData);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      setLoading(false);
    }
  };

  const containerRef = useRef(null);

  const scrollToLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 100, // Adjust the scroll distance as needed
        behavior: "smooth", // Smooth scrolling animation
      });
    }
  };
  useEffect(() => {
    // Retrieve data from localStorage
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("afternoon");
    } else {
      setGreeting("evening");
    }

    fetchRestaurants();
  }, []);

  return (
    <Box>
      {loading ? (
        <Box display={"flex"} justifyContent={"center"} margin={"5rem"}>
        <Bars
          height="100"
          width="100"
          color="#208080"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </Box>
      ) : (
        <>
          <Box
            position={"absolute"}
            w={"full"}
            display="flex"
            flexDirection={["column", "row", "row", "row"]}
            justifyContent="flex-start"
            alignItems={"flex-start"}
            p={"1rem"}
            gap={["0rem", "0.5rem", "0.5rem", "0.5rem"]}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            zIndex={7}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"flex-start"}
              alignItems={"center"}
              gap={"0.5rem"}
            >
              <Text
                fontSize="1rem"
                color="#8391A1"
                lineHeight="1.5rem"
                fontWeight={700}
              >
                Pre Order From{" "}
              </Text>
              <RiUserLocationLine fontSize="1rem" />
            </Box>
            <Text color="#1E232C" fontSize={"1.2rem"} fontWeight={700}>
              Connaught Place
            </Text>
          </Box>
          <Box
            position={"relative"}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap={"5px"}
            fontFamily="Urbanist"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems={"center"}
              m={"1.25rem"}
              gap={"5px"}
              mt={["5.2rem", "3.45rem", "3.5rem", "3.65rem"]}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems={"flex-start"}
                p={"1rem"}
                gap={"5px"}
                w={"fit-content"}
                bgColor={"#fafafa"}
                borderRadius={"10px"}
              >
                <Text
                  fontSize="1.5rem"
                  color="#8391A1"
                  lineHeight="1.5rem"
                  fontWeight={700}
                  mt={["1.5rem", "1rem", "1rem", "1rem"]}
                >
                  {userData.user_name}
                </Text>
                <Text
                  color="#1E232C"
                  fontSize={"1.10rem"}
                  textAlign={"justify"}
                >
                  Let's explore this {greeting}
                </Text>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignItems={"flex-end"}
                w={"full"}
                gap={"1rem"}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-around"
                  alignItems={"center"}
                  //   p={"1rem"}
                >
                  <Box className="offer" p={2}>
                    <BiSolidOffer color="white" fontSize={"2rem"} />
                  </Box>
                  <Text color="#8391A1">Offers</Text>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-around"
                  alignItems={"center"}
                  //   p={"1rem"}
                >
                  <Box className="wallet" p={2}>
                    <GiWallet color="white" fontSize={"2rem"} />
                  </Box>
                  <Text color="#8391A1">Wallet</Text>
                </Box>
              </Box>
            </Box>

            <Box
              className="yourTaste"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems={"center"}
              w={"95%"}
              m="auto"
              p={2}
            >
              <Text color="#1E232C" fontSize={"1.5rem"}>
                Your taste
              </Text>
              <Button
                color="#8391A1"
                bgColor={"white"}
                fontSize={"1rem"}
                onClick={scrollToLeft}
                _hover={{
                  bgColor: "white",
                }}
              >
                see all{" "}
                <Text
                  bgColor={"#fafafa"}
                  borderRadius={"50%"}
                  p={0.5}
                  marginLeft={"0.8rem"}
                >
                  <MdKeyboardArrowRight color="#1E232C" />
                </Text>
              </Button>
            </Box>

            <Box
              w={"100%"}
              id="dataScroll"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              overflowX="auto"
              whiteSpace="wrap"
              ref={containerRef}
              css={{ "-ms-overflow-style": "none", "scrollbar-width": "none" }}
              sx={{ "&::-webkit-scrollbar": { display: "none" } }}
              p={2}
              gap={2}
            >
              {restaurants.map((item, index) => (
               
                  <Box key={index} minWidth={["50%", "30%", "30%", "20%"]}>
                     <Link to={`./${item.restaurant_id}`}>
                    <Box
                      key={item.restaurant_id}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      boxShadow="md"
                      // p={2}
                      borderRadius="15px"
                      borderTopLeftRadius={"15px"}
                      borderTopRightRadius={"15px"}
                      border="1px solid #E2E8F0"
                      bgColor={'#8DCAB4'}
                    >
                      <Image
                        w={"100%"}
                        borderTopLeftRadius={"15px"}
                        borderTopRightRadius={"15px"}
                        src={item.images[0].url}
                      />
                      <Text>{item.restaurant_name}</Text>
                      <Text>
                        {item.location !== null
                          ? item.location?.location_locality
                          : "Delhi"}
                      </Text>
                      <Text>
                        {item.location?.state_name
                          ? item.location?.state_name
                          : "Delhi"}
                      </Text>
                    </Box>
                    </Link>
                  </Box>
                
              ))}
            </Box>

            <ImageCarousal data={cards} />

            <Box p={2} mt={2}>
              <Heading color="#1E232C" fontSize={"1.5rem"} textAlign={"left"}>
                Popular Ones
              </Heading>

              <Box
                display="grid"
                gridTemplateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(3, 1fr)",
                  "repeat(3, 1fr)",
                  "repeat(4, 1fr)",
                ]}
                gap={"1.8rem"}
                mt={3}
              >
                {restaurants.map((item, index) => (
                  <Link to={`./${item.restaurant_id}`}>
                    <Box
                      key={item.restaurant_id}
                      display="flex"
                      flexDirection={["row", "column", "column", "column"]}
                      alignItems="center"
                      gap={2}
                      boxShadow={[
                        "",
                        "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      ]}
                      borderRadius={"15px"}
                    >
                      <Box width={["60%", "80%", "80%", "100%"]}>
                        <Image
                          src={item.images[0].url}
                          alt="Restaurant Image"
                          borderRadius="md"
                        />
                      </Box>
                      <Box width="100%" p={3} textAlign={"justify"}>
                        <Text
                          fontSize="1.5rem"
                          color={"#1E232C"}
                          lineHeight="1.5rem"
                          fontWeight="bold"
                        >
                          {item.restaurant_name}
                        </Text>
                        <Text color="#8391A1" fontSize={"1rem"}>
                          Cakes,Pastry,Pastas
                        </Text>
                        <Text color="#8391A1">
                          {item.location !== null ? item.location.location_locality : "Delhi"},
                          {item.location !== null ? item.location?.state_name : "Delhi"}
                        </Text>
                        <Box
                          color={"#D39171"}
                          display={"flex"}
                          alignItems={"center"}
                          gap={1}
                          fontSize={"0.8rem"}
                        >
                          <BiSolidOffer /> <Text>4 Offers trending</Text>
                        </Box>
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Box
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"flex-start"}
                          >
                            <Text fontSize={"1rem"} color="#1E232C">
                              ★ {item.rating?.restaurant_avg_rating}
                            </Text>
                            <Text color="#8391A1" fontSize={"0.7rem"}>
                              Popularity
                            </Text>
                          </Box>
                          <Box
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"flex-start"}
                          >
                            <Text fontSize={"1rem"} color="#1E232C">
                              {item.currency.symbol} {item.avg_cost_for_two}
                            </Text>
                            <Text color="#8391A1" fontSize={"0.7rem"}>
                              Cost fot two
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;

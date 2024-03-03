import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Image, Text, IconButton } from "@chakra-ui/react";

import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";

const SinglePage = () => {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState({});

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchRestaurant = async () => {
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

        const itemDetailFromData = response.data.find((item) => {
          return item.restaurant_id === id;
        });
        setItemDetail(itemDetailFromData);
        setLoading(false);
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

  useEffect(() => {
    fetchRestaurant();
  }, []);

  console.log("id", id);
  console.log("itemDetails", itemDetail);
  return (
    <Box>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Box display="flex" flexDirection="column">
      
            <Box
              position="relative"
              height={["50vh", "60vh", "60vh", "70vh"]}
              w={"100%"}
            >
              {/* Back Button */}
              <IconButton
                position="absolute"
                top="1rem"
                left="1rem"
                aria-label="Go Back"
                color="white"
                fontSize={"2rem"}
                icon={<IoIosArrowBack />}
                onClick={() => navigate("/home")}
                variant="ghost"
              />
              {/* Restaurant Image */}
              <Image
                src={itemDetail.images[0].url}
                alt="Restaurant Image"
                objectFit="cover"
                height="100%"
                width="100%"
              />
              {/* Fastor Logo */}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              >
                <Image
                  src="https://www.fastor.ai/_next/static/media/Logo.5a0cac78.png"
                  alt="Fastor Logo"
                />
              </Box>
            </Box>

            {/* Restaurant Details */}
            <Box
              borderTopLeftRadius="20px"
              borderTopRightRadius="20px"
              position="relative"
              top="-3vh"
              background="white"
            >
              <Box
                p={5}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                  textAlign={"left"}
                  gap={"5px"}
                >
                  <Text color={"#1E232C"} fontSize="1.5rem" fontWeight={700}>
                    {itemDetail.restaurant_name}
                  </Text>
                  <Text color={"#515151"}>
                    {itemDetail.location?.location_locality
                      ? itemDetail.location?.location_locality
                      : "Delhi"}
                    ,{" "}
                    {itemDetail.location?.state_name
                      ? itemDetail.location?.state_name
                      : "Delhi"}
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
                </Box>

                <Box
                  p={2}
                  color={"#515151"}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={2}
                >
                  <FaRegStar fontSize={"1rem"} />
                  <Text fontSize={"1.2rem"} color="#1E232C">
                    {itemDetail.rating?.restaurant_avg_rating}
                  </Text>
                </Box>
              </Box>

              <Box p={4}>
                <Text
                  color={"#515151"}
                  fontSize={"0.875rem"}
                  textAlign={"justify"}
                >
                  Our delicate vanilla cake swirled with chocolate and filled
                  with mocha chocolate chip cream and a layer of dark chocolate
                  ganache
                </Text>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SinglePage;

import React, { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  HStack,
  useColorModeValue,
  Image,
  useToast
} from "@chakra-ui/react";
import {useAccountStore} from "../store/account"



const AuthScreen = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup forms

  const toast = useToast();
  const [loginUser, setloginUser] = useState({
    email: "",
    password: ""
  })

  const { login } = useAccountStore();


  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSignup) {


      console.log("Signup form submitted");
    } else {
      const {success, message } = await login(loginUser);
      if (!success) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: message,
          status: "success",
          isClosable: true,
        });
      }

      setloginUser({ email: "", password: "" });
    }
  };

  return (
    <Flex
      // minH="100vh"
      direction={{ base: "column", md: "row" }}
      // minH="100vh"
      bg={useColorModeValue("gray.50", "gray.900")}
      align="center"
      justify="center"
      px={4}
    >
      {/* Left Side - Image */}
      <Box
        // flex={1}
        flex={{ base: "1", md: "1" }} 
        bg={useColorModeValue("white", "gray.800")}
        display="flex"
        justifyContent="center"
        //display={{ base: "none", md: "block" }} // Hide image on small screens
        // overflow="hidden"
      >
        <Image
          src="/images/userLoginImage.jpg"
          alt="Login Illustration"
          // objectFit="cover"
          // height="100%"
          // width="100%"
          overflow={"hidden"}
        />
      </Box>

      {/* Right Side - Form */}
      <Box
        flex={{ base: "0", md: "1" }} 
        // flex={1}
        p={8}
        m={8}
        // maxW="md"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="lg"
        borderRadius="md"
      >
        <Heading textAlign="center" mb={6}>
          {isSignup ? "Sign Up" : "Login"}
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {/* Signup-specific fields */}
            {isSignup && (
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input placeholder="Enter your name" />
              </FormControl>
            )}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input 
                type="email" 
                placeholder="Enter your email"
                value={loginUser.email}
							  onChange={(e) => setloginUser({ ...loginUser, email: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input 
                type="password" placeholder="Enter your password" value={loginUser.password}
							  onChange={(e) => setloginUser({ ...loginUser, password: e.target.value })} />
            </FormControl>
            {isSignup && (
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" placeholder="Confirm your password" />
              </FormControl>
            )}
            <Button type="submit" colorScheme="teal" w="full">
              {isSignup ? "Sign Up" : "Login"}
            </Button>
          </VStack>
        </form>
        <HStack justify="center" mt={4}>
          <Text>
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}
          </Text>
          <Button
            variant="link"
            colorScheme="teal"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default AuthScreen;

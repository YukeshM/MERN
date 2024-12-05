import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { MdMovieEdit } from "react-icons/md";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
					bgClip={"text"}
				>
					<Link to={"/"}>Movie Store 🎥</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							{/* <PlusSquareIcon  /> */}
              <MdMovieEdit fontSize={20} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>
				</HStack>
			</Flex>
		</Container>
  )
}

export default Navbar

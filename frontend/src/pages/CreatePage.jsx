import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useMovieStore } from "../store/movies";

const CreatePage = () => {
	const [newMovie, setNewMovie] = useState({
		name: "",
		rating: "",
		image: "",
        platform: ""
	});
	const toast = useToast();

	const { createMovie } = useMovieStore();

	const handleAddMovie = async () => {
        console.warn("add ", newMovie)
		const { success, message } = await createMovie(newMovie);
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
		setNewMovie({ name: "", rating: "", image: "", platform: "" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Movie
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Movie Name'
							name='name'
							value={newMovie.name}
							onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
						/>
						<Input
							placeholder='Rating'
							name='rating'
							type='number'
							value={newMovie.rating}
							onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
						/>
                        <Input
							placeholder='Platform'
							name='platform'
							value={newMovie.platform}
							onChange={(e) => setNewMovie({ ...newMovie, platform: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newMovie.image}
							onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddMovie} w='full'>
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;
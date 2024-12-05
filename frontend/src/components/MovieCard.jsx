import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useMovieStore } from "../store/movies";
import { useState } from "react";

const MovieCard = ({ movie }) => {
	const [updatedMovie, setUpdatedMovie] = useState(movie);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteMovie, updateMovie } = useMovieStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteMovie = async (pid) => {
		const { success, message } = await deleteMovie(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateMovie = async (pid, updatedMovie) => {
		const { success, message } = await updateMovie(pid, updatedMovie);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Movie updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={movie.image} alt={movie.name} h={48} w='full' objectFit='contain' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					Movie name: {movie.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					Rating: {movie.rating}
				</Text>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					Platform: {movie.platform}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteMovie(movie._id)}
						colorScheme='red'
					/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Movie</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Movie Name'
								name='name'
								value={updatedMovie.name}
								onChange={(e) => setUpdatedMovie({ ...updatedMovie, name: e.target.value })}
							/>
							<Input
								placeholder='Rating'
								name='rating'
								type='number'
								value={updatedMovie.rating}
								onChange={(e) => setUpdatedMovie({ ...updatedMovie, rating: e.target.value })}
							/>
							<Input
								placeholder='Platform'
								name='platform'
								value={updatedMovie.platform}
								onChange={(e) => setUpdatedMovie({ ...updatedMovie, platform: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedMovie.image}
								onChange={(e) => setUpdatedMovie({ ...updatedMovie, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateMovie(movie._id, updatedMovie)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default MovieCard;
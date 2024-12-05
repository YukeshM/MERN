import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMovieStore } from "../store/movies";
import MovieCard from "../components/MovieCard";

const HomePage = () => {
	const { fetchMovies, movies } = useMovieStore();

	useEffect(() => {
		fetchMovies();
	}, [fetchMovies]);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current movies 🚀
				</Text>

				{movies != undefined && movies.length > 0 ? <SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{movies.map((movie) => (
						// console.warn('movie :', movie)
						<MovieCard key={movie._id} movie={movie} />
					))}
				</SimpleGrid>
				: null}
				

				{movies != undefined &&  movies.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No movies found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Movie
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;
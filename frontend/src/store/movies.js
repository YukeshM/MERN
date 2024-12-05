import { create } from "zustand";

export const useMovieStore = create((set) => ({
	movies: [],
	setMovies: (movies) => set({ movies }),
	createMovie: async (newMovie) => {

		console.error("new movie: ", newMovie);
		if (!newMovie.name || !newMovie.image || !newMovie.rating || !newMovie.platform) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/movies", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newMovie),
		});
		const data = await res.json();
        console.log("data: ", data)
		set((state) => ({ movies: [...state.movies, data.data] }));
		return { success: true, message: "Movie created successfully" };
	},

	fetchMovies: async () => {

        const res = await fetch("/api/movies");
		const data = await res.json();
		set({ movies: data.data });
	},

	deleteMovie: async (pid) => {
		const res = await fetch(`/api/movies/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ movies: state.movies.filter((Movie) => Movie._id !== pid) }));
		return { success: true, message: data.message };
	},

	updateMovie: async (pid, updatedMovie) => {
		const res = await fetch(`/api/movies/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedMovie),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			movies: state.movies.map((Movie) => (Movie._id === pid ? data.data : Movie)),
		}));

		return { success: true, message: data.message };
	},
}));
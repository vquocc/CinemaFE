	
import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api"

export const getAllMovieShowtime = async ({ id }) => {
	const response = await api.get(`/show-time/by-movie/${id}`)
	return response;
}

export const getAllMovieShowtimeOptions = ({ id }) => {
	return queryOptions({
		queryKey: id ? ["movie-st", id] : ["movies-st"],
		queryFn: () => getAllMovieShowtime({ id })
	})
}

export const useAllMovieShowtime = ({ queryConfig, id }) => {
	return useQuery({
		...getAllMovieShowtimeOptions({  id }),
		...queryConfig,
	})
}

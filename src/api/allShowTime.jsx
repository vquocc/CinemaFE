	
import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api"

export const getShowtime = async ({ id }) => {
	const response = await api.get(`/show-time/${id}`)
	return response;
}

export const getShowtimeOptions = ({ id }) => {
	return queryOptions({
		queryKey: id ? ["st", id] : ["st"],
		queryFn: () => getShowtime({ id })
	})
}

export const useMovieShowtime = ({ queryConfig, id }) => {
	return useQuery({
		...getShowtimeOptions({  id }),
		...queryConfig,
	})
}

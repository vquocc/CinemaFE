	
import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api"

export const getAllMovie = async ({ pageNo, pageSize, id }) => {
    const response = await api.get('/movies', {
        params: {
            pageNo,
            pageSize,
            id
        }
    })
    return response;
}

export const getAllMovieOptions = ({ pageNo, pageSize, id }) => {
    return queryOptions({
        queryKey: id ? ["movie", id] : ["movies"],
        queryFn: () => getAllMovie({ pageNo, pageSize, id })
    })
}

export const useAllMovies = ({ queryConfig, pageNo, pageSize, id }) => {
    return useQuery({
        ...getAllMovieOptions({ pageNo, pageSize, id }),
        ...queryConfig,
    })
}

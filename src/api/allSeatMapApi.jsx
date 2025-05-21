	
import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api"

export const getSeatMapById = async ({ id }) => {
	const response = await api.get(`/seat-map/${id}`)
	return response;
}

export const getSeatMapByIdOptions = ({ id }) => {
	return queryOptions({
		queryKey: id ? ["st", id] : ["st"],
		queryFn: () => getSeatMapById({ id })
	})
}

export const useSeatMapById = ({ queryConfig, id }) => {
	return useQuery({
		...getSeatMapByIdOptions({  id }),
		...queryConfig,
	})
}

import HorizontalLayout from "~/layouts/AdminLayout/HorizontalLayout";
import UserLayout from "~/layouts/UserLayout/UserLayout";
import BookingMovie from "~/pages/BookingMovie";
import { MoviePage } from "~/pages/MoviePage";
import { PreBookingMoviePage } from "~/pages/PreBookingMoviePage";

export const MovieRouter = {
	children: [
		{
			path: "",
			element: <UserLayout />,
			children: [
				{
					path: "",
					element: <MoviePage />
				},
				{
					path: "datve/:slug",
					element: <PreBookingMoviePage />
				},
				{
					path: "booking/:slug",
					element: <BookingMovie />
				},
			]
		}
	]
}
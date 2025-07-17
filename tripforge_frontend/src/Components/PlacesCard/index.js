import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Chip,
} from "@material-tailwind/react";

const PlacesCard = ({ place, selected }) => {
    const defaultResturant = "https://media.istockphoto.com/id/1018141890/photo/two-empty-wine-glasses-sitting-in-a-restaurant-on-a-warm-sunny-afternoon.jpg?s=612x612&w=0&k=20&c=OccJv1oKWSTDqJ6Irw7iW1NEbL0muU2ylqP3EOhOyEg=";


    if (selected) {
        // console.log("card this: ", document.getElementById(place.location_id));
        // ref?.current?.scrollIntoView({ behaviour: "smooth", block: "start" });
        document.getElementById(place?.location_id)?.scrollIntoView({ block: "start", behaviour: "smooth" });
    }


    return (
        <div id={place.location_id}  className="m-1 p-1">
            <Card className="w-full max-w-[33rem] shadow-lg p-2">
                <CardHeader floated={false} color="blue-gray">
                    <img
                        src={place.photo ? place.photo.images.large.url : defaultResturant}
                        alt="No img"
                        className="max-h-96 w-full "
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                    <div
                        className="!absolute top-4 right-4"
                    >
                        {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6"
                        >
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        <Button variant="outlined" className="rounded-full" color={isAdded ? "red" : "light-green"} onClick={() => setIsAdded(!isAdded)}>{isAdded ? "remove" : "add"}</Button> */}
                    </div>
                </CardHeader>
                <CardBody className="pb-0">
                    <div className="mb-3 flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="font-medium">
                            {place?.name}
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="-mt-0.5 h-5 w-5 text-yellow-700"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {place.rating}
                        </Typography>
                    </div>


                    <div className="flex place-content-between mb-2">
                        <Typography>Price</Typography>
                        <Typography>{place.price_level ? place.price_level : "$"}</Typography>
                    </div>

                    <div className="flex gap-2 flex-wrap mb-2">
                        {place?.cuisine?.map(({ name }) => (
                            <Chip className="rounded-full" size="sm" variant="outlined" value={name} />
                        ))}
                    </div>

                    {/* address */}
                    <div className="flex place-content-between mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                        </svg>

                        <Typography variant="small">{place.address}</Typography>
                    </div>

                    {/* phone */}
                    <div className="flex place-content-between mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                        </svg>


                        <Typography variant="small">{place.phone}</Typography>
                    </div>



                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="text" onClick={() => window.open(place.web_url, "_blank")}>
                        Trip Adviser
                    </Button>

                    <Button variant="text" onClick={() => window.open(place.website, "_blank")}>
                        Website
                    </Button>
                </CardFooter>
            </Card>
        </div >
    );
}


export default PlacesCard;
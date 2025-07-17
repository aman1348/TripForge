import { Spinner, Typography,} from "@material-tailwind/react";
import PlacesCard from "../../Components/PlacesCard";
import { MenuCustomList } from "../../Components/MenuCustomList";




const menuItems = [
    // "All",
    "Restaurants",
    "Hotels",
    "Attractions",
];

const ratingItens = [
    "All",
    "Above 3.0",
    "Above 4.0",
    "Above 4.5"
];

export default function PlacesList({
    places,
    childClicked,
    isLoading,
    type,
    setType,
    rating,
    setRating

}) {


    // console.log("places : ", places);
    // console.log("child clicked : ", childClicked);
    // console.log("checking first card : ", document.getElementById(places[0]?.location_id));


    return (
        <>
            <div className="column-2 w-full md:w-5/12 h-full max-h-screen">
            {/* Restaurants, Hotels & Attractions */}
                <Typography variant="h3">{type} around you.</Typography>
                {/* loading spinners : */}
                {/* <Spinner className="h-16 w-16 text-gray-900/50"></Spinner> */}
                {/* <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" /> */}
                {
                    isLoading ? (
                        <Spinner className="h-16 w-16 text-gray-900/50"></Spinner>
                    ) :
                        (
                            <>
                                <div className="flex flex-row mt-2 mb-2">
                                    <MenuCustomList
                                        menuItems={menuItems}
                                        heading={"Type"}
                                        selectedItem={type}
                                        setSelectedItem={setType}
                                    ></MenuCustomList>
                                    <MenuCustomList
                                        menuItems={ratingItens}
                                        heading={"Rating"}
                                        selectedItem={rating}
                                        setSelectedItem={setRating}
                                    ></MenuCustomList>
                                </div>
                                <div className="overflow-y-auto pl-3" style={{ maxHeight: "calc(100% - 80px)" }}>
                                    <div className="flex flex-col">                                 
                                        {places?.map((place, i) => (
                                                <PlacesCard
                                                    key={i}
                                                    place={place}
                                                    selected={Number(childClicked) === i}
                                                ></PlacesCard>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
            </div>
        </>
    );
}








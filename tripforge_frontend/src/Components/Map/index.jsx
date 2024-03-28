import React from "react";
import GoogleMapReact from "google-map-react";
import {
  Card,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { setTripCoordinates } from "../../redux/Slices/TripCoordinateSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Map({
  setBounds,
  places,
  setChildClicked,
  weatherData,
}) {
  const dispatch = useDispatch();
  const defaultCoordinates = { lat: 20, lng: 78 };

  // console.log("places in map : ", places);

  // const apiKey = "AIzaSyB71R_KQJRoRR4Ear6QPuKA5VbpTZgdfdE";
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultCoordinates}
        center={useSelector(
          (state) => state.TripCoordinateReducer.tripCoordinate
        )}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          dispatch(
            setTripCoordinates({ lat: e.center.lat, lng: e.center.lng })
          );
          // setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {places.map((place, index) => (
          <div
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={index}
          >
            <Tooltip
              content={
                <Card className="w-20 z-10">
                  <CardHeader>
                    <img
                      src={
                        place.photo
                          ? place.photo.images.large.url
                          : "https://media.istockphoto.com/id/1018141890/photo/two-empty-wine-glasses-sitting-in-a-restaurant-on-a-warm-sunny-afternoon.jpg?s=612x612&w=0&k=20&c=OccJv1oKWSTDqJ6Irw7iW1NEbL0muU2ylqP3EOhOyEg="
                      }
                      alt="ui/ux review check"
                    />
                  </CardHeader>
                  <Typography variant="small">{place.name}</Typography>
                </Card>
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
            </Tooltip>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}

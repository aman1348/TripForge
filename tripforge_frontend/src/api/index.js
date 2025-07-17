import axios from 'axios';


        
        export const getPlaces = async (type, bounds) => {
            const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
            try {
        const response = await axios.get(URL, {
            params: {
                bl_latitude: bounds.sw.lat,
                tr_latitude: bounds.ne.lat,
                bl_longitude: bounds.sw.lng,
                tr_longitude: bounds.ne.lng,

            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });
        // console.log("response data type : ", type);
        // console.log("response data : ", response.data);
        
        return response.data

    } catch (error) {
        console.error(error);
    }
}

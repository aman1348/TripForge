# TripForge

TripForge is a MERN (MongoDB, Express.js, React.js, Node.js) stack project aimed at providing users with a platform to search for places around the world and discover various restaurants, hotels, and attractions. It utilizes the Rapid API for travel information and the Google Maps API for location services. Additionally, TripForge includes user authentication functionality, allowing users to create accounts and securely log in.

## Features

- **Search**: Users can search for places around the world.
- **Explore**: Users can explore restaurants, hotels, and attractions of any place.
- **User Authentication**: Secure user authentication and login functionality.
- **API Integration**: Utilizes Rapid API for travel information and Google Maps API for location services.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TripForge/Trip_Forge.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Trip_Forge
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   npm run build
   ```

## Environment Variables

### Frontend

- **REACT_APP_RAPIDAPI_TRAVEL_API_KEY**: API key for Rapid API.
- **REACT_APP_GOOGLE_MAPS_API_KEY**: API key for Google Maps API.

### Backend

- **PORT**: Port number for the Node.js server.
- **MONGODB_URI**: MongoDB URI for database connection.
- **NODE_ENV**: (production/uat/sit)
- **NODEMAILER_EMAIL**: email used to send OTP for verification
- **NODEMAILER_PASS**: Application-specific Password for the e-mail

## Usage

1. Start the backend server:

   ```bash
   npm run start
   ```

2. Access the backend in your web browser at `http://localhost:{PORT}`.

## API References

- **Rapid API - Travel Adviser**: [https://rapidapi.com/apidojo/api/travel-advisor](https://rapidapi.com/apidojo/api/travel-advisor)
- **Google Maps API**: [https://developers.google.com/maps](https://developers.google.com/maps)

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

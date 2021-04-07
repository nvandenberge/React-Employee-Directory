import axios from "axios";

// API request to generate 100 random users from the United States
const BASE_URL = "https://randomuser.me/api/?results=100&nat=us"

export default {
    getRandomUsers: () => {
        return axios.get(BASE_URL)
    }
}
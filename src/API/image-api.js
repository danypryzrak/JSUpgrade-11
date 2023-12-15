import axios from "axios"

const BASE_URL = 'https://pixabay.com/api/?key=33168858-09b17812fdd05775e42993a92&image_type=photu&orientation=horizontal&perPgae=40&q='

export async function fetchImages(params, page) {

    const response = await axios(`${BASE_URL}${params}&page=${page}`)
    if (!response.status === 200) {
        throw new Error(response.status)
    }
    return response.data
}  
const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://neptune.crocodic.net/covid19/public/api/posts'

export default {
    list: () => fetch(BASE_URL + '/list'),
    create: (requestParams = {latitude: 0, longitude: 0, instagram_post_url: ''}) => (
        fetch(
            BASE_URL + '/create',
            {
                method: 'POST',
                headers: {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(requestParams)
            }
        )
    )
}
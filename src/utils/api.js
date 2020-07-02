const id = "1f41f8cac4df61a8ac5b"
const sec = "3661b3c1b7c0c5e0115370282e78f17162de3224"
const params = `?client_id=${id}&client_secret=${sec}`


export function fetchPopularRepos (language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
        .then(res => res.json())
        .then(data => {
            if (!data.items) {
                throw new Error(data.message)
            }

            return data.items
        })
}
const autocannon = require('autocannon')

const usernames = ['Magdalena', 'Victor', 'Kate', 'Vohid', 'Nozim', 'John', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank']

let counter = 0

function urlGenerator() {
    const username = usernames[counter % usernames.length]
    counter++
    return `/search-bloom?username=${username}`
}

const instance = autocannon({
    url: 'http://localhost:3000',
    connections: 10,
    duration: 10,
    requests: [
        {
            method: 'GET',
            setupRequest: (req) => {
                req.path = urlGenerator()
                return req
            }
        }
    ]
})

autocannon.track(instance);
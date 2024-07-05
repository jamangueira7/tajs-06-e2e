import server from "./server.js"

if (process.env.NODE_ENV !== 'test') {
    server.listen(process.env.PORT, () => {
        const serverInfo = server.address()
        console.log(`server is runnig at ${serverInfo.address}:${serverInfo.port}`)
    })
}

export default server
/*
    curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "joao mangueira","cpf": "123.456.789-00"}' http://localhost:3000/persons
    curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "joao mangueira","cpf": ""}' http://localhost:3000/persons
*/
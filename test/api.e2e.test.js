import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals'
import fs from 'node:fs/promises'

function waitForServerStatus(server) {
    return new Promise((resolve, reject) => {
        server.once('error', (err) => reject(err))
        server.once('listening', () => resolve())
    })
}

describe('E2E Teste Suite', () => {
    describe('E2E Test for Server in a not-test ENV', () => {
        it('should start server with PORT 4000', async () => {
            const PORT = 4000
            process.env.NODE_ENV = 'production'
            process.env.PORT = PORT

            jest.spyOn(
                console,
                console.log.name
            )
            
            const { default: server } = await import('../src/index.js')
              
            await waitForServerStatus(server)
            const serverInfo = server.address()

            //console.log(`server is runnig at ${serverInfo.address}:${serverInfo.port}`)

            expect(serverInfo.port).toBe(4000)
            expect(console.log).toHaveBeenCalledWith(
                `server is runnig at ${serverInfo.address}:${serverInfo.port}`
            )

            return new Promise(resolve => server.close(resolve))
        })

    })
    describe('E2E Test for Server', () => {
        let _testServer
        let _testServerAddress

        beforeAll(async () => {
            process.env.NODE_ENV = 'test'
            const { default: server } = await import('../src/index.js')
            _testServer = server.listen()
            
            await waitForServerStatus(_testServer)
            const serverInfo = _testServer.address()
            _testServerAddress = `http://localhost:${serverInfo.port}`
        })

        afterAll(() => _testServer.close())

        it('should return 404 for unsupported routes', async () => {
            const response = await fetch(`${_testServerAddress}/unsupported`, {
                method: 'POST'
            })

            expect(response.status).toBe(404)
        })

        it('should return 404 for unsupported routes type', async () => {
            const response = await fetch(`${_testServerAddress}/persons`, {
                method: 'GET'
            })

            expect(response.status).toBe(404)
        })

        it('should return 400 and missing file message when body is invalid', async () => {
            const invalidPerson = { name: 'Fulano da Silva'}
            const response = await fetch(`${_testServerAddress}/persons`, {
                method: 'POST',
                body: JSON.stringify(invalidPerson)
            })

            expect(response.status).toBe(400)
            const data = await response.json()
            expect(data.validationError).toEqual('cpf is required')
        })

        it('should saved person', async () => {
            const validPerson = { 
                name: 'Fulano da Silva',
                cpf: '123.456.789-00',
            }
            const response = await fetch(`${_testServerAddress}/persons`, {
                method: 'POST',
                body: JSON.stringify(validPerson)
            })

            expect(response.status).toBe(200)
            const data = await response.json()
            expect(data).toEqual({"result": "ok"})
        })

        it('should return 500', async () => {
            const validPerson = { 
                name: 'Xuxa da Silva',
                cpf: '123.456.789-00',
            }
            
            jest.spyOn(
                fs,
                'appendFile'
            ).mockImplementation(Promise.resolve(new Error('Async error message')));

            jest.spyOn(
                console,
                console.error.name
            )

            const response = await fetch(`${_testServerAddress}/persons`, {
                method: 'POST',
                body: JSON.stringify(validPerson)
            })

            expect(response.status).toBe(500)
            expect(console.error).toHaveBeenCalledWith(
                `deu ruim`
            )
        })

    })    
})


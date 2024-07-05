import { describe, it, expect, beforeAll, jest } from '@jest/globals'
import { mapPerson } from '../src/person'

function waitForServerStatus(server) {
    return new Promise((resolvee, reject) => {
        server.once('error', (err) => reject(err))
        server.once('listening', () => resolve())
    })
}

describe('E2E Teste Suite', () => {
    describe('E2E Teest for Server', () => {
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

        it('should return 404 for unsupported routes', async () => {
            const personStr = '{"name": "joao", "age":37}'
            const personObj = mapPerson(personStr)
    
            expect(personObj).toEqual({
                name: 'joao',
                age: 37,
                createdAt: expect.any(Date)
            })
        })

        it.todo('should return 400 and missing file message when body is invalid', async () => {
            const personStr = '{"name": "joao", "age":37}'
            const personObj = mapPerson(personStr)
    
            expect(personObj).toEqual({
                name: 'joao',
                age: 37,
                createdAt: expect.any(Date)
            })
        })
    })    
})


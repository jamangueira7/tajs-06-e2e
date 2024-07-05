import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { mapPerson } from '../src/person'

describe('Person Test Suite', () => {
    describe('happy path', () => {
        it('should map person', async () => {
            const personStr = '{"name": "joao", "age":37}'
            const personObj = mapPerson(personStr)
    
            expect(personObj).toEqual({
                name: 'joao',
                age: 37,
                createdAt: expect.any(Date)
            })
        })
    })

    describe('what converge doesnt tell you', () => {
        it('should not map person given invalid JSON string', async () => {
            const personStr = '{"name":'

            expect(() => mapPerson(personStr)).toThrow('Unexpected end of JSON input')
        })

        it('should not map person given invalid JSON data', async () => {
            const personStr = '{}'

            const personObj = mapPerson(personStr)
    
            expect(personObj).toEqual({
                name: undefined,
                age: undefined,
                createdAt: expect.any(Date)
            })
        })
    })

    
})


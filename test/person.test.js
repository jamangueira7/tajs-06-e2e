import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals'
import Person from '../src/person.js'

describe('Person Teste Suite', () => {
    let _person

    beforeAll(async () => {
        _person = new Person()
    })

    describe('#validate', () => {
        

        it('should return error if person dont have a name', async () => {
            const invalidPerson = {
                cpf: "123.456.789-00"
            }

            expect(() => Person.validate(invalidPerson)).toThrow('name is required')
        })

        it('should return error if person dont have a cpf', async () => {
            const invalidPerson = {
                name: "Xuxa da Silva"
            }

            expect(() => Person.validate(invalidPerson)).toThrow('cpf is required')
        })
    }) 
    
    describe('#format', () => {
        

        it('should return person format', async () => {
            const validPerson = {
                name: "Xuxa da Silva",
                cpf: "123.456.789-00"
            }

            const expected = {
                name: "Xuxa",
                lastName: "da Silva",
                cpf: "12345678900"
            }

           
            expect(Person.format(validPerson)).toEqual(expected)
        })
    }) 


    describe('#save', () => {
        

        it('should to save person', async () => {
            const validPerson = {
                name: "Xuxa",
                lastName: "da Silva",
                cpf: "12345678900"
            }

            jest.spyOn(
                console,
                console.log.name
            )

            await Person.save(validPerson)
           
            
            expect(console.log).toHaveBeenCalledWith(
                'registrado com sucesso!!',
                validPerson
            )
        })


        it('shouldnt save a person because their name is missing', async () => {
            const invalidPerson = {
                lastName: "da Silva",
                cpf: "12345678900"
            }
           
            expect(() => Person.save(invalidPerson))
            .toThrow(`cannot save invalid person: ${JSON.stringify(invalidPerson)}`)

        })

        it('shouldnt save a person because their lastName is missing', async () => {
            const invalidPerson = {
                name: "Xuxa",
                cpf: "12345678900"
            }
           
            expect(() => Person.save(invalidPerson))
            .toThrow(`cannot save invalid person: ${JSON.stringify(invalidPerson)}`)

        })

        it('shouldnt save a person because their cpf is missing', async () => {
            const invalidPerson = {
                name: "Xuxa",
                lastName: "da Silva"
            }
           
            expect(() => Person.save(invalidPerson))
            .toThrow(`cannot save invalid person: ${JSON.stringify(invalidPerson)}`)

        })
    }) 


     describe('#process', () => {
        
        it('should a process', async () => {
            const person = {
                name: "Xuxa da Silva",
                cpf: "123.456.789-00"
            }
                
            expect(Person.process(person)).toBe('ok')
        })
    })
})

import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import crypto from 'node:crypto'
import fsSync from 'node:fs'
import fs from 'node:fs/promises'
import Service from '../src/service.js'

describe('Service Test Suite', () => {
    let _service
    const filename = 'testfile.ndjson'
    const MOCKED_HASH_PWD = 'senhaencriptada'
    beforeEach(() => {
        _service = new Service({filename})
    })

    describe('#read', () => {
        
        it('#should return an empty array if the file is not exist', async () => {
            jest.spyOn(
                fsSync,
                'existsSync'
            ).mockReturnValue(false)

            const result = await _service.read()
            expect(result).toEqual([])
        })

        
        it('#should return an empty array if the file is empty', async () => {
            jest.spyOn(
                fsSync,
                "existsSync"
            ).mockReturnValue(true)

            jest.spyOn(
                fs,
                "readFile"
            ).mockResolvedValue('')

            const result = await _service.read()
            expect(result).toEqual([])
        })

        it('#should return users without password if file contains users', async () => {
            const dbData = [
                {
                    username:'user1',
                    password:'pass1',
                    createdAt: new Date().toISOString()
                },
                {
                    username:'user2',
                    password:'pass2',
                    createdAt: new Date().toISOString()
                }
            ]

            const fileContents = dbData
                .map(item => JSON.stringify(item).concat('\n'))
                .join('')

            jest.spyOn(
                fsSync,
                "existsSync"
            ).mockReturnValue(true)

            jest.spyOn(
                fs,
                "readFile"
            ).mockResolvedValue(fileContents)

            const result = await _service.read()
            const expected = dbData .map(({ password, ...rest }) => ({ ...rest }))
            expect(result).toEqual(expected)
        })
    })

    describe('#create - spies', () => {
        beforeEach(() => {
            _service = new Service({filename})
            jest.spyOn(
                crypto,
                crypto.createHash.name
            ).mockReturnValue({
                update: jest.fn().mockReturnThis(),
                digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD)
            })

            jest.spyOn(
                fs,
                fs.appendFile.name
            ).mockResolvedValue()
        })

        it('#should call appendFile with right params', async () => {
            const expectedCreateAt = new Date().toDateString()

            const input = {
                username:'user1',
                password:'pass1',
            }

            jest.spyOn(
                Date.prototype,
                Date.prototype.toISOString.name
            ).mockReturnValue(expectedCreateAt)

            await _service.create(input)
            expect(crypto.createHash).toHaveBeenCalledTimes(1)
            expect(crypto.createHash).toHaveBeenCalledWith('sha256')

            const hash = crypto.createHash('sha256')
            expect(hash.update).toHaveBeenCalledWith(input.password)
            expect(hash.digest).toHaveBeenCalledWith('hex')

            const expected = JSON.stringify({
                ...input,
                createdAt: expectedCreateAt,
                password: MOCKED_HASH_PWD

            }).concat('\n')

            expect(fs.appendFile).toHaveBeenCalledWith(
                filename,
                expected
            )
        })

    })
})


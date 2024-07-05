import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import Task from '../src/task.js'
import { setTimeout } from 'node:timers/promises'

describe('Service Test Suite', () => {
    let _logMock = 'testfile.ndjson'
    let _task = 'testfile.ndjson'
    beforeEach(() => {
        _task = new Task()
        jest.spyOn(
            console,
            console.log.name
        ).mockImplementation()
    })

    describe('#read', () => {
        
        it.skip('#should only run task that are due without fake times(slow)', async () => {
            const tasks = [
                {
                    name: 'Task-Will-Run-In-5-Secs',
                    dueAt: new Date(Date.now() + 5000),
                    fn: jest.fn()
                },
                {
                    name: 'Task-Will-Run-In-10-Secs',
                    dueAt: new Date(Date.now() + 10000),
                    fn: jest.fn()
                }
            ]

            _task.save(tasks.at(0))
            _task.save(tasks.at(1))

            _task.run(200)

            await setTimeout(11000) //11_000

            expect(tasks.at(0).fn).toHaveBeenCalled()
            expect(tasks.at(1).fn).toHaveBeenCalled()
        }, 15000)

        it('#should only run task that are due with fake times(fast)', async () => {
            jest.useFakeTimers()

            const tasks = [
                {
                    name: 'Task-Will-Run-In-5-Secs',
                    dueAt: new Date(Date.now() + 5000),
                    fn: jest.fn()
                },
                {
                    name: 'Task-Will-Run-In-10-Secs',
                    dueAt: new Date(Date.now() + 10000),
                    fn: jest.fn()
                }
            ]

            _task.save(tasks.at(0))
            _task.save(tasks.at(1))

            _task.run(200)

            jest.advanceTimersByTime(4000)

            //ninguem deve ser executado ainda
            expect(tasks.at(0).fn).not.toHaveBeenCalled()
            expect(tasks.at(1).fn).not.toHaveBeenCalled()

            jest.advanceTimersByTime(2000)
            //so a primeira deve ser chamada
            expect(tasks.at(0).fn).toHaveBeenCalled()
            expect(tasks.at(1).fn).not.toHaveBeenCalled()

            jest.advanceTimersByTime(4000)
            //a segunda tarefa deve ser executado
            expect(tasks.at(1).fn).toHaveBeenCalled()
        })

    })
})


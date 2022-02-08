import {
    expect,
    describe,
    test,
    jest,
    beforeEach
} from '@jest/globals'
import Util from '../../src/util'

describe('#Util - Strings', () => {
    
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('#upperCaseFirstLetter should transform the firts letter in upperCase', () => {
        const data = 'hello'
        const expected = 'Hello'
        const result = Util.upperCaseFistLetter(data)
        expect(result).toStrictEqual(expected)
    })
    test('#lowerCaseFirstLetter should transform the firts letter in lowerCase', () => {
        const data = 'Hello'
        const expected = 'hello'
        const result = Util.lowerCaseFistLetter(data)
        expect(result).toStrictEqual(expected)
    })
    test('#lowerCaseFirstLetter given an empty string it should return empty', () => {
        const data = ''
        const expected = ''
        const result = Util.lowerCaseFistLetter(data)
        expect(result).toStrictEqual(expected)
    })
    test('#upperCaseFirstLetter given an empty string it should return empty', () => {
        const data = ''
        const expected = ''
        const result = Util.upperCaseFistLetter(data)
        expect(result).toStrictEqual(expected)
    })

})
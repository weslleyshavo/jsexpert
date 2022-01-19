const { expect } = require('chai')
const { describe, it } = require('mocha')
const { productValidator } = require('./../src')
const ProductDataBuiler = require('./model/productDataBuilder')

describe('Test Data Builder', () => {
    it('shouldn\'t return error with valid product', () => {
        const product = ProductDataBuiler.aProduct().build()
        const result = productValidator(product)

        const expected = {
            errors: [],
            result: true
        }

        expect(result).to.be.deep.equal(expected)
    })

    describe('Product Validation Rules', () => {
        it('should return an object error when creating a Product with invalid id', () => {
            const product = ProductDataBuiler.aProduct().withInvalidId().build()
            const result = productValidator(product)

            const expected = {
                errors: [
                    "id: invalid length, current [1] expected to be between 2 and 20"
                ],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })
        it('should return an object error when creating a Product with invalid name', () => {
            const product = ProductDataBuiler.aProduct().withInvalidName().build()
            const result = productValidator(product)

            const expected = {
                errors: [
                    "name: invalid value, current [1Berto] expected to have only words"
                ],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })
        it('should return an object error when creating a Product with invalid price', () => {
            const product = ProductDataBuiler.aProduct().withInvalidPrice().build()
            const result = productValidator(product)

            const expected = {
                errors: [
                    "price: invalid value, current [2000] expected to be between 1 and 1000"
                ],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })
        it('should return an object error when creating a Product with invalid category', () => {
            const product = ProductDataBuiler.aProduct().withInvalidCategory().build()
            const result = productValidator(product)

            const expected = {
                errors: [
                    "category: invalid value, current [mecanic] expected to be either electronic or organic"
                ],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })
    })
})
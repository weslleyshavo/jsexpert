const Product = require("../../src/entities/product");

class ProductDataBuiler {
    constructor() {
        // o default são os dados corretos
        // o caso de sucesso!
        this.productData = {
            id: '000001',
            name: 'computer',
            price: 1000,
            category: 'eletronic'
        }
    }

    static aProduct() {
        return new ProductDataBuiler()
    }

    withInvalidId() {
        this.productData.id = '1'
        
        return this
    }

    withInvalidName() {
        this.productData.name = '1Berto'
        
        return this
    }

    withInvalidPrice() {
        this.productData.price = 2000
        
        return this
    }

    withInvalidCategory() {
        this.productData.category = 'mecanic'
        
        return this
    }

    build() {
        const product = new Product(this.productData)
        return product
    }
}

module.exports = ProductDataBuiler
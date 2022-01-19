const UserFactory = require("./factory/userFactory");

;(async function() {
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find({ name: 'Weslley*' })
    console.log('result', result)
})()
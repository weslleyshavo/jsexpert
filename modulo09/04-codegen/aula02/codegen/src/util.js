export default class Util {
    // weslleyshavo => [0] => w
    // first = w, rest = eslleyshavo
    static #transform({ str: [first, ...rest], upperCase = true }) {
        if(!first) return ''
        
        const firstLetter = upperCase ?
            first.toUpperCase() :
            first.toLowerCase()

        return [firstLetter, ...rest].join('')
    }
    static upperCaseFistLetter(str) {
        return Util.#transform({ str })
    }
    static lowerCaseFistLetter(str) {
        return Util.#transform({ str, upperCase: false })
    }
}
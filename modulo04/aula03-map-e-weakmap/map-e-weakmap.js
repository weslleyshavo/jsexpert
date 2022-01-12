const assert = require('assert')

const myMap = new Map();

// pode ter qualquer coisa como chave
myMap
    .set(1, 'One')
    .set('Shavo', { text: 'two' })
    .set(true, () => 'hello')

// usando um construtor
const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1'],
])

// console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))
assert.deepStrictEqual(myMap.get(1), 'One')
assert.deepStrictEqual(myMap.get('Shavo'), { text: 'two'})
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em Objects a chave só pode ser string ou symbol (number é coergido para string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'WeslleyShavo'})

assert.deepStrictEqual(myMap.get({ id: 1}), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'WeslleyShavo' })

// utilitarios
// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4)

// para verificar se item existe no objeto
// item.key = se não existe = undefined
// if() = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({ name: 'WeslleyShavo'}).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.id
// imperformático para o JavaScript !!!
assert.ok(myMap.delete(onlyReferenceWorks))

// Não dá pra iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), '[[1,"One"],["Shavo",{"text":"two"}],[true,null]]')

// for (const [key, value] of myMap) {
//     console.log({ key, value })
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrão
// ({ }).toString() === '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// qualquer chave pode colidir, com as propriedades herdadas objeto, como
// constructor, toString, valueOf e etc.

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

// não tem restrição de nome de chave
myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Não dá para limpar um Obj sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// ---- WeakMap

// Pode ser coletado após perder as referencias
// usado em casos beeem específicos

// tem a maioria dos benefícios do Map
// MAS: não é iterável
// Só chaves de referencia e que você já conheça
// mais leve e preve leak de memória, pq depois que as instancias saem da memória, tudo é limpo

const weakMap = new WeakMap()

const hero = { name: 'Flash'}

weakMap.set(hero)
weakMap.get(hero)
weakMap.delete(hero)
weakMap.has(hero)

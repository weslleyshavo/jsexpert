import fsPromises from 'fs/promises'
import fs from 'fs'
import templates from './templates/index.js'
import Util from './util.js'

const defaultDependencies = (layer, componentName) => {
    const dependecies = {
        repository: [],
        service: [
            `${componentName}Repository`
        ],
        factory: [
            `${componentName}Repository`,
            `${componentName}Service`
        ]
    }

    return dependecies[layer]
        // Pode ser que venha Product
        // Quero que retorne: product
        .map(Util.lowerCaseFistLetter)
}

async function executeWrites(pendingFilesToWrite) {
    return Promise.all(pendingFilesToWrite
        .map(
            ({ fileName, txtFile }) => fsPromises.writeFile(fileName, txtFile)
        )
    )
}

export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {

    const keys = Object.keys(templates)
    const pendingFilesToWrite = []
    for (const layer of layers) {
        /*
        keys = [
            factoryTemplate,
            serviceTemplate,
            repositoryTemplate
        ]

        layers = ['inexistent']
        */
        const chosenTemplate = keys.find(key => key.includes(layer))
        if (!chosenTemplate) {
            return { error: 'the chosen layer doesnt hava a template' }
        }

        const template = templates[chosenTemplate]

        // só o exemplo de baixo /home/shavo/Documents/estudos/jsexpert/codegen/src/factory
        const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`
        const dependencies = defaultDependencies(layer, componentName)
        const { fileName: className, template: txtFile } = template(componentName, ...dependencies)

        // só o exemplo de baixo /home/shavo/Documents/estudos/jsexpert/codegen/src/factory/heroes.js
        const fileName = `${targetFolder}/${Util.lowerCaseFistLetter(className)}.js`
        pendingFilesToWrite.push({ fileName, txtFile })
    }

    await executeWrites(pendingFilesToWrite)

    return { success: true }
}
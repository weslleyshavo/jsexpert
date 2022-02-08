import Util from '../util.js'

const serviceNameAnchor = '$$serviceName'
const repositoryNameAnchor = '$$repositoryName'

const serviceNameDepAnchor = '$$serviceNameDep'
const repositoryNameDepAnchor = '$$repositoryNameDep'

const componentNameAnchor = '$$componentName'

const template = `
import $$serviceName from '../service/$$serviceNameDep.js'
import $$repositoryName from '../repository/$$repositoryNameDep.js'

export default class $$componentNameFactory {
    static getInstance() {
        const repository = new $$repositoryName()
        const service = new $$serviceName({ repository })
        return service
    }
}`

export function factoryTemplate(componentName, repositoryName, serviceName) {
    
    const txtFile = template
        .replaceAll(componentNameAnchor, Util.upperCaseFistLetter(componentName))
        
        .replaceAll(serviceNameDepAnchor, Util.lowerCaseFistLetter(serviceName))
        .replaceAll(repositoryNameDepAnchor, Util.lowerCaseFistLetter(repositoryName))

        .replaceAll(serviceNameAnchor, Util.upperCaseFistLetter(serviceName))
        .replaceAll(repositoryNameAnchor, Util.upperCaseFistLetter(repositoryName))

    return {
        fileName: `${componentName}Factory`,
        template: txtFile
    }
}
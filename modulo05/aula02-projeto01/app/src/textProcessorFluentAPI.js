'use strict';
// o objetivo do Fluent API é executar tarefas
// como um pipeline, step by step
// e no fim, chama o build. MUITO similar ao padrão Builder
// a diferença que aqui é sobre processos, o Builder sobre construção
// de objetos

class TextProcessorFluentAPI {
    // propriedade privada!
    #content
    constructor(content) {
        this.#content = content
    }
    extractPeopleData() {
        // ?<= fala que vai extrair os dados que virão depois desse grupo
        // [contratante|contratada] ou um ou outro, (e tem a flg no fim da expressão para pegar maiúsculo e minúsculo)
        // :\s{1} vai procurar o caracter literal do dois pontos seguindo de um espaço
        // tudo acima fica dentro de um parenteses para falar "vamos pegar daí pra frente"

        // (?!\s) negative look around, vai ignorar os contratantes do fim do documento (que tem só espaço a frente deles)
        // .*\n pega qualquer coisa até o primeiro \n
        // .*? non greety, esse ? faz com que ele pare na primeira recorrência, assim ele evita ficar em loop

        // $ informar que a pesquisa acaba no fim da linha
        // g -> global
        // m -> multiline
        // i -> case insensitive

        const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi
        
        // faz o match para encontrar a string inteira que contém os dados que precisamos
        const onlyPerson = this.#content.match(matchPerson)
        // console.log('onlyPerson', onlyPerson)
        this.#content = onlyPerson

        return this
    }
    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI
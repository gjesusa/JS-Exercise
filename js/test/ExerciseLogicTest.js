/**
 * Classe para realizar Testes unitários, possuíndo 3 métodos
 * 1- metodo de teste geral do exercício
 * 2- método de teste de chamada ao endpoint de usuários
 * 3- método de teste de chamada ao endpoint de posts
 * 
 * Todos os métodos retornam a imprimem na tela a resposta esperada e o tempo de execução 
 * de seus respectivos processos
 * 
 */
class ExerciseLogicTest {
    constructor(){
        this._logic = new ExerciseLogic()
    }

   /**
   * Método de teste geral do exercício
   * @returns {String} String HTML para ser exibida em tela com a resposta do exercício e 
   * o tempo de execução do mesmo
   */   
    async testExercise(){
        const startTime = new Date()
        var result = await this._logic.doExercise()
        const execTime = (new Date() - startTime)

        if (result !== 'No Users'){
            var noPostList = result.filter((item) => item.posts.length === 0)
            var resultHasNoPosts = noPostList.length === result.length

            if (resultHasNoPosts){
                console.log("Users retrieved, but without posts.")
            } else {
                console.log("Success - All Users retrieved, with associated posts.")
            }
            result = JSON.stringify(result, null, 2) 
        } else {
            console.log("Error - No Users retrieved.")
        }

        var innerHTML = "<p><b>Tempo Geral de execução: </b>"+execTime+" ms.</p>"
        innerHTML+= "<p><b>Resultado da execução: </b>"
        innerHTML+= result
        return innerHTML
    }


   /**
   * Método de teste de chamada ao endpoint de usuários
   * @returns {String} String HTML para ser exibida em tela com a resposta da chamada ao
   * endpoint de usuários e o tempo de execução do mesmo
   */
    async testUserCall(){
        const startTime = new Date()
        var result = await this._logic.getUsers()
        const execTime = (new Date() - startTime)

        if (result !== undefined){
            console.log("Success - All Users retrieved")
            result = JSON.stringify(result, null, 2) 
        } else {
            console.log("Error - No Users retrieved.")
        }

        var innerHTML = "<p><b>Tempo de execução de Listagem de Usuários: </b>"+execTime+" ms.</p>"
        innerHTML+= "<p><b>Resultado da execução: </b>"
        innerHTML+= result
        return innerHTML
    }


   /**
   * Método de teste de chamada ao endpoint de posts
   * @returns {String} String HTML para ser exibida em tela com a resposta da chamada ao
   * endpoint de posts e o tempo de execução do mesmo
   */
    async testPostCall(){
        const startTime = new Date()
        var result = await this._logic.getPosts()
        const execTime = (new Date() - startTime)

        if (result !== undefined){
            console.log("Success - All Posts retrieved.")
            result = JSON.stringify(result, null, 2) 
        } else {
            console.log("Error - No Posts retrieved.")
        }

        var innerHTML = "<p><b>Tempo de execução de Listagem de Posts: </b>"+execTime+" ms.</p>"
        innerHTML+= "<p><b>Resultado da execução: </b>"
        innerHTML+= result
        return innerHTML
    }
}

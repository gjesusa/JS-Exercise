class ExerciseLogicTest {
    constructor(){
        this._logic = new ExerciseLogic()
    }

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

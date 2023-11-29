/**
 * Classe para realizar exercicio requisitado.
 * O exercício em questão pede que seja realizada uma requisição a 
 * dois endpoints (/users e /post), associe cada post a seu respectivo usuário e formatar 
 * a resposta para exibição.
 * 
 */
class ExerciseLogic {

    constructor(){
        this._httpCaller = new HttpCaller()
    }

   /**
   * Método principal para realizar exercício requisitado
   * @returns {Array} Array de objetos de usuários com posts associados formatado para exibição
   */   
    async doExercise(){
        let users = await this.getUsers();
        if (users === undefined || users.length == 0){
            return 'No Users'
        } else {
            users = users.map ((user) => this._formatUser(user))
        }
        
    
        const posts = await this.getPosts();
        if (posts === undefined || posts.length == 0){
            return users
        }
    
        users.map((user) => {
            const userposts = posts.filter((post) => post.userId === user.id)
            .map ((post) => this._formatPost(post))
            .filter((post) => post)
            user.posts = userposts
        });
        return users
    }


   // ====== MÉTODOS DE CHAMADA ======

   /**
   * Método para realizar chamada a endpoint de listagem de usuários 
   * @returns {Array} Array de objetos de usuários
   */    
    async getUsers (){
        return await this._httpCaller.makeHttpCall(
            "GET", 
            "https://jsonplaceholder.typicode.com/users"
            ).catch(() => undefined)
    }

   /**
   * Método para realizar chamada a endpoint de listagem de posts 
   * @returns {Array} Array de objetos de posts
   */
    async getPosts (){
        return await this._httpCaller.makeHttpCall(
            "GET", 
            "https://jsonplaceholder.typicode.com/posts"
            ).catch(() => undefined)
    }



   // ====== MÉTODOS DE FORMATAÇÃO ======

   /**
   * Método para formatar objeto JSON de usuário para exibição no exercício
   * @param {Object} user objeto JSON de usuário bruto recebido na chamada
   * @returns {Object} objeto de usuário formatado para exibição
   */
    _formatUser(user) {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            address: this._formatAdress(user.address),
            phone: user.phone,
            website: user.website,
            company: user.company.name,
            posts: []
        }
    }


   /**
   * Método que recebe o objeto de endereço e o formata para apenas exibir informações 
   * requisitadas pelo exercício em uma String
   * @param {Object} address objeto JSON de endereço bruto recebido na chamada
   * @returns {String} String de endereço contendo apenas as informações requeridas
   */
    _formatAdress(address){
        let formatedAdress = address.street

        if (address.suite) {
            formatedAdress += ', '+ address.suite
        }

        if (address.city) {
            formatedAdress += ' '+ address.city
        }
        return formatedAdress
    }


   /**
    * Método para formatar objeto JSON de post para exibição no exercício
   * @param {Object} post objeto JSON de post bruto recebido na chamada
   * @returns {Object} objeto de post formatado para exibição
   */
    _formatPost(post){
        return {
            id: post.id,
            title: post.title,
            body: post.body,
        }
    }
}
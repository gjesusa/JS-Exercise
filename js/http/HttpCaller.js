/**
 * Classe para realizar chamadas HTTP.
 * Para esta classe foi feita uma implementação basica de chamadas utilizando XMLHttpRequest,
 * retornando uma Promise, com tratamento de sucesso e erro
 * 
 */
class HttpCaller {
    makeHttpCall(method, url){
        var xhr = new XMLHttpRequest()
        return new Promise(function(resolve, reject) {
			xhr.open(method, url, true);
            xhr.onload = function() {
                if (xhr.status < 200 || xhr.status > 299) {
                    console.log('Reject of URL Call to '+url)
                    console.log('Error Status: '+ xhr.status)
                    reject(xhr.statusText)

                  } else if (xhr.status === 204) {
                    console.log('Resolve of URL Call to '+url+ ' - Status '+xhr.status)
                    reject(xhr.statusText)
                    
                  } else {
                    let isJSON = xhr.getResponseHeader('content-type').includes('json')
                    const response =  isJSON ? JSON.parse(xhr.response) : xhr.responseText

                    console.log('Resolve of URL Call to '+url)
                    console.log('Response Body: '+ isJSON ? JSON.stringify(response) : response)
                    resolve(response)
                  }

                
            }
            xhr.onerror = function() {
                console.log('Reject of URL Call to '+url)
                console.log('Error Status: '+ xhr.statusText)
                reject(xhr.statusText)
            }
            xhr.send()
		})
    }
}
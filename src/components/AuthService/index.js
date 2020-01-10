export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://127.0.0.1:8000'
        this.call = this.call.bind(this)
        this.login = this.login.bind(this)
    }

    login(username, password) {
        return this.call(`${this.domain}/api/v1/rest-auth/login/`, {
            method: 'POST',
            body: `password=${password}&username=${username}`
        }, 'application/x-www-form-urlencoded')
        .then(res => {
            this.setToken(res.key)
            return Promise.resolve(res);
        }).catch(e => {
          console.log(e)
        });
    }

    update(restaurant){
      let body = []
      for (let [key, value] of Object.entries(restaurant)) {
        body.push(`${key}=${value}`);
      }
      return this.call(`${this.domain}/api/v1/restaurants/${restaurant.id}/`, {
          method: 'PUT',
          body: body.join('&')
      }, 'application/x-www-form-urlencoded')
      .then(res => {
          return Promise.resolve(res);
      }).catch(e => {
        console.log(e)
      });
    }

    loggedIn() {
        const token = this.getToken()
        return !!token
    }

    setToken(idToken) {
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    logout() {
      return this.call(`${this.domain}/api/v1/rest-auth/logout/`, {
          method: 'POST'
      }).then(res => {
          localStorage.removeItem('id_token');
          return Promise.resolve(res);
      })
    }

    async call(url, options, content_type='application/json') {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': content_type
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Token ' + this.getToken()
        }

        return await fetch(url, {
            headers,
            ...options
        }).then(this.response_status)
        .then(response => response.json())
    }

    response_status(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}

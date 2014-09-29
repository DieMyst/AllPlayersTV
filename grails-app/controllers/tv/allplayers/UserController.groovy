package tv.allplayers

import groovy.json.JsonSlurper

class UserController {

    def login() {
        render 'hello'
    }

    def authenticate = {
        def result = request.JSON
        if (result.size() != 0) {
            def hashPass = result.password.encodeAsHash();
            def user = User.findByLoginAndPassword(result.login, hashPass)
            if (user) {
                session.user = user
                render status: 200
                return
            }
        }
        render status: 401
    }

    def logout = {
        session.user = null
        render status: 200
    }
}

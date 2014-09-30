package tv.allplayers

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

    def register = {
        def result = request.JSON
        if (result.size() != 0) {
            def hashPass = result.password.encodeAsHash();
            def user = User.findByLogin(result.login)
            if (!user) {
                user = new User(login: result.login, password: hashPass).save(flush: true)
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

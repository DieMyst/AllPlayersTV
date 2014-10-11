package tv.allplayers

import javax.servlet.http.Cookie

class UserController {

    def login() {
        render 'hello'
    }

    def started = {
        if (session.user) { //если есть сессия с юзером
            render status: 200
            return
        } else if (g.cookie(name: 'login')) { //если в кукисах есть параметры юзера
            def login = g.cookie(name: 'login').toString();
            def hashPass = g.cookie(name: 'hashPass').toString();
            def user = User.findByUsernameAndPassword(login, hashPass)
            if (user) { //если подходят параметры
                session.user = user
                render status: 200
                return
            } else { //если не подходят
                render status: 401
            }
        } else { //в остальных случаях страница аутентификации
            render status: 401
        }
    }

    def authenticate = {
        def result = request.JSON
        if (result.size() != 0) {
            def hashPass = result.password.encodeAsHash();
            User user = User.findByUsernameAndPassword(result.login, hashPass)
            if (user) {
                session.user = user
                saveCookie(user)
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
            def user = User.findByUsername(result.login)
            if (!user) {
                user = new User(username: result.login, password: hashPass).save(flush: true)
                session.user = user
                saveCookie(user)
                render status: 200
                return
            }
        }
        render status: 401
    }

    def logout = {
        delCookie((User)session.user)
        session.user = null
        render status: 200
    }

    void saveCookie(User user) {
        Cookie loginCookie = new Cookie("login", user.username)
        loginCookie.maxAge = 2629743
        loginCookie.domain = "allPlayersTv"
        response.addCookie(loginCookie)

        Cookie passCookie = new Cookie("hashPass", user.password)
        passCookie.maxAge = 2629743
        passCookie.domain = "allPlayersTv"
        response.addCookie(passCookie)
    }

    void delCookie(User user) {
        Cookie loginCookie = new Cookie("login", user.username)
        loginCookie.path = "/"
        loginCookie.maxAge = 0
        loginCookie.domain = "allPlayersTv"
        response.addCookie(loginCookie)

        Cookie passCookie = new Cookie("hashPass", user.password)
        passCookie.path = "/"
        passCookie.maxAge = 0
        passCookie.domain = "allPlayersTv"
        response.addCookie(passCookie)
    }
}

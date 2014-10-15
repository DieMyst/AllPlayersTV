package tv.allplayers

import grails.plugin.springsecurity.annotation.Secured
import org.codehaus.groovy.grails.commons.GrailsStringUtils

class UserController {

    def springSecurityService

    def login() {
        render 'hello'
    }

    def started = {
        if (springSecurityService.isLoggedIn()) { //если есть сессия с юзером
            render status: 200
            return
        } else { //в остальных случаях страница аутентификации
            render status: 401
        }
    }

    @Secured(['PERMIT_ALL'])
    def register() {
        def result = request.JSON
        if (result.size() != 0 && !GrailsStringUtils.isBlank(result.login) && !GrailsStringUtils.isBlank(result.password)) {
            def user = User.findByUsername(result.login)
            if (!user) {
                user = new User(username: result.login, password: result.password).save(flush: true)
                UserRole.create user, Role.findByAuthority('ROLE_USER')
                render status: 200
                return
            }
        }
        render status: 401
    }
}

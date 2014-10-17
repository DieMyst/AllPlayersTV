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

    def register() {
        def result = request.JSON
        if (result.size() != 0 && !GrailsStringUtils.isBlank(result.userName) && !GrailsStringUtils.isBlank(result.password)
                && !GrailsStringUtils.isBlank(result.confirmPassword)) {
            if (!result.confirmPassword.equals(result.password)) {
                render(status: 400, text: 'Password and confirm are not equals.')
            } else {
                def user = User.findByUsername(result.userName)
                if (!user) {
                    user = new User(username: result.userName, password: result.password).save(flush: true)
                    UserRole.create user, Role.findByAuthority('ROLE_USER'), true

                    render status: 200
                } else {
                    render(status: 400, text: 'User with same name registered earlier.')
                }
            }
        } else {
            render(status: 400, text: 'Fill all fields.')
        }
    }
}

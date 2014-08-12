package tv.allplayers

import grails.converters.JSON

class PlayerController {

    def index() {
        def json = User.list() as JSON
        render json
    }

    def showUser() {
        def json = User.findByLogin(params.login) as JSON
        render json
    }
}

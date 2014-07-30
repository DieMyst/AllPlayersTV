package tv.allplayers

import grails.rest.Resource

@Resource(uri = '/users')
class User {
    static hasMany = [frames: Frame]

    String login
    String password

    static constraints = {
    }
}

package tv.allplayers

import grails.converters.JSON
import org.codehaus.groovy.grails.web.json.JSONObject

class PlayerController {

    def index() {
        def json = User.list() as JSON
        render json
    }

    def showUser() {
        JSONObject combined = new JSONObject();
        def userJson = User.findByLogin(params.login)
        def sourcesJson = Sources.getSources();
        combined.put("user", userJson)
        combined.put("sources", sourcesJson)
        println(combined)
        render combined as JSON
    }
}

package tv.allplayers

import grails.converters.JSON
import org.codehaus.groovy.grails.web.json.JSONObject

class PlayerController {

    def index() {
        def json = User.list() as JSON
        render json
    }

    def rest() {
        switch (request.method) {
            case "GET":
                JSONObject combined = new JSONObject();
                def userJson = User.findByLogin(params.login)
                def sourcesJson = Sources.getSources();
                combined.put("user", userJson)
                combined.put("sources", sourcesJson)
                println(combined)
                println("GET request")
                render combined as JSON
                break
            case "POST":
                JSONObject savingJson = JSON.parse(request) as JSONObject
                break
            default:
                println "def"
                break
        }

    }
}

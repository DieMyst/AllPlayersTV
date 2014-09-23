package tv.allplayers

import grails.converters.JSON
import groovy.json.JsonSlurper
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
                def slurper = new JsonSlurper()
                def result = slurper.parse(request.reader)
                def user = User.findByLogin(result.user.login)
                user.save()
                println result.toString()
                break
            default:
                println "def"
                break
        }

    }
}

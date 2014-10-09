package tv.allplayers

import grails.converters.JSON
import groovy.json.JsonSlurper
import org.codehaus.groovy.grails.web.json.JSONObject

class PlayerController {

    def springSecurityService

    def index() {
        def json = User.list() as JSON
        render json
    }

    def rest() {
        if (springSecurityService.isLoggedIn()) {
            switch (request.method) {
                case "GET":
                    JSONObject combined = new JSONObject();
                    def userJson = User.findByLogin(params.login)
                    def sourcesJson = Sources.getSources();
                    def img = [arrowleft : "${asset.assetPath(src: 'arrowleft.png')}",
                               arrowright: "${asset.assetPath(src: 'arrowright.png')}"
                    ]
                    combined.put("user", userJson)
                    combined.put("sources", sourcesJson)
                    combined.put("menuarrow", img)
                    render combined as JSON
                    break
                case "POST":
                    def result = request.JSON
                    def newCompositions = []
                    result.user.compositions.each { newCompositions.add(new Composition(it)) }
                    def user = User.findByLogin(params.login)
                    user.compositions.clear()

                    newCompositions.each { comp ->
                        comp.frames.each { frame ->
                            if (frame != null) {
                                comp.addToFrames(frame)
                            }
                        }
                        user.addToCompositions(comp)
                    }

                    user.save(flush: true)
                    response.status = 200
                    render response
                    break
                default:
                    println "def"
                    break
            }
        }
    }
}

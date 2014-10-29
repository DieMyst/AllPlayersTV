package tv.allplayers

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import org.codehaus.groovy.grails.web.json.JSONObject

class PlayerController {

    def springSecurityService

    def index() {
        def json = User.list() as JSON
        render json
    }

    @Secured(['ROLE_USER'])
    def edit() {
        response.setContentType("application/json")
        if (springSecurityService.isLoggedIn() && springSecurityService.principal.username.equals(params.login)) {
            def result = request.JSON
            def newCompositions = []
            result.user.compositions.each { newCompositions.add(new Composition(it)) }
            def user = User.findByUsername(params.login)
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
        } else {
           render "{ error: 'No rights to edit compositions' }";
        }
    }

    @Secured(['permitAll'])
    def get() {
        response.setContentType("application/json")
        JSONObject combined = new JSONObject();
        def userJson = User.findByUsername(params.login)
        if (userJson) {
            boolean isLoggedIn = springSecurityService.isLoggedIn();
            boolean isThisUser = springSecurityService.principal.username.equals(params.login);
            def sourcesJson = Sources.getSources();
            def img = [arrowleft : "${asset.assetPath(src: 'arrowleft.png')}",
                       arrowright: "${asset.assetPath(src: 'arrowright.png')}"
            ]
            combined.put("user", userJson)
            combined.put("sources", sourcesJson)
            combined.put("menuarrow", img)
            combined.put("canEdit", isLoggedIn && isThisUser)
            combined.put("isLogged", isLoggedIn)
            render combined as JSON
        } else {
            combined.put("error", "No such user.")
        }
    }
}

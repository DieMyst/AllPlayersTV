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
        if (springSecurityService.isLoggedIn() && springSecurityService.principal.username.equals(params.login)) {
            def result = request.JSON
            def newCompositions = []
            result.user.compositions.each { newCompositions.add(new Composition(it)) }
            def user = User.findByUsername(params.login)
            user.compositions.clear()

            user.autoSave = result.user.autoSave;

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
            response.setContentType("application/json")
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
            def img = [arrowup  : "${asset.assetPath(src: 'arrowup.png')}",
                       arrowdown: "${asset.assetPath(src: 'arrowdown.png')}"
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

    @Secured(['ROLE_USER'])
    def copyComp() {
        if (springSecurityService.isLoggedIn()) {
            def result = request.JSON
            Composition comp = new Composition(result)
            comp.frames.each { frame ->
                if (frame != null) {
                    comp.addToFrames(frame)
                }
            }
            User user = User.findByUsername(springSecurityService.principal.username)
            user.addToCompositions(comp)
            user.save(flush: true)
            response.status = 200
            render response
        }
    }

}

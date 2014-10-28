class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        "/"(view: "/index")
        "500"(view: '/error')

        "/frames"(resources: 'frame')
        "/api/user/$login"(controller: 'player',
                action: 'get')
        "/api/user/$login/edit"(controller: 'player',
                action: 'edit')
        "/register"(controller: 'user', action: 'register')
        "/logout"(controller: 'user', action: 'logout')
    }
}

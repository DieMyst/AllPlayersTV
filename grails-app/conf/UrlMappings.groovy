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
        "/user/$login"(controller: 'player',
                action: 'showUser')
    }
}

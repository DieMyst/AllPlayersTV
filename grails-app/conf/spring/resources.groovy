import tv.allplayers.service.MyUserDetailsService
import tv.allplayers.util.UserSaltSource

beans = {
    userDetailsService(MyUserDetailsService) {
        grailsApplication = ref('grailsApplication')
    }

    saltSource(UserSaltSource) {
        userPropertyToUse = application.config.grails.plugin.springsecurity.dao.reflectionSaltSourceProperty
    }
}

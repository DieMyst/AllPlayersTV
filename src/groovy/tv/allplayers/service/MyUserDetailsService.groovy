package tv.allplayers.service

import grails.plugin.springsecurity.userdetails.GormUserDetailsService
import grails.plugin.springsecurity.userdetails.GrailsUser
import tv.allplayers.User

class MyUserDetailsService extends GormUserDetailsService {

    protected MyUserDetails createUserDetails(User user, Collection authorities) {
        new MyUserDetails((GrailsUser) super.createUserDetails(user, authorities), user.salt)
    }
}

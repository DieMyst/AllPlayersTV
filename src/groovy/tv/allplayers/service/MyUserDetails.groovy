package tv.allplayers.service

import grails.plugin.springsecurity.userdetails.GrailsUser

class MyUserDetails extends GrailsUser {

    public final String salt

    MyUserDetails(GrailsUser base, String salt) {
        super(
                base.username,
                base.password,
                base.enabled,
                base.accountNonExpired,
                base.credentialsNonExpired,
                base.accountNonLocked,
                base.authorities,
                base.id)

        this.salt = salt;
    }
}

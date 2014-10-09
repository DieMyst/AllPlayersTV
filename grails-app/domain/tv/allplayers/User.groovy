package tv.allplayers

import tv.allplayers.util.SaltGenerator

class User {
    static hasMany = [compositions: Composition]

    transient springSecurityService

    String login
    String password
    String salt
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired

    static transients = ['springSecurityService']

    static constraints = {
        login(blank: false, unique: true)
        password(blank: false)
        salt(nullable: true, maxSize: 64)
    }

    static mapping = {
        compositions cascade: 'all-delete-orphan'
    }

    Set<Role> getAuthorities() {
        UserRole.findAllByUser(this).collect { it.secRole }
    }

    def beforeInsert() {
        encodePassword()
    }

    def beforeUpdate() {
        if (isDirty('password')) {
            encodePassword()
        }
    }

    protected void encodePassword() {
        this.salt = SaltGenerator.generateSalt()
        password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password, salt) : password
    }
}

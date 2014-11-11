package tv.allplayers

import tv.allplayers.util.SaltGenerator

class User {
    static hasMany = [compositions: Composition]

    transient springSecurityService

    String username
    String password
    String salt
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired

    boolean autoSave;

    static transients = ['springSecurityService']

    static constraints = {
        username(blank: false, unique: true)
        password(blank: false)
        salt(nullable: true, maxSize: 64)
    }

    static mapping = {
        compositions cascade: 'all-delete-orphan'
        table "`user`"
    }

    Set<Role> getAuthorities() {
        UserRole.findAllByUser(this).collect { it.role }
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

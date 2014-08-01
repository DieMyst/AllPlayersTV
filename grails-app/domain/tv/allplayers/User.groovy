package tv.allplayers

class User {
    static hasMany = [frames: Frame]

    String login
    String password

    static constraints = {
    }
}

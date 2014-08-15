package tv.allplayers

class User {
    static hasMany = [compositions: Composition]

    String login
    String password

    static constraints = {
    }
}

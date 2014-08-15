package tv.allplayers

class Composition {
    static hasMany = [frames: Frame]
    static belongsTo = [user: User]

    String name

    static constraints = {
    }
}

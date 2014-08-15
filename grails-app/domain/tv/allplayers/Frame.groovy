package tv.allplayers

class Frame {
    static belongsTo = [composition: Composition]

    String name
    String streamSource
    int height
    int width
    int positionX
    int positionY

    static constraints = {
    }
}

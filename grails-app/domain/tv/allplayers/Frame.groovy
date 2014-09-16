package tv.allplayers

class Frame {
    static belongsTo = [composition: Composition]

    String name
    String streamSource
    int sourceType
    String type;
    int height
    int width
    int positionX
    int positionY

    static constraints = {
    }
}

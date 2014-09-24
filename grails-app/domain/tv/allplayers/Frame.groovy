package tv.allplayers

class Frame {
    static belongsTo = [composition: Composition]

    String streamSource
    int sourceType
    String type;
    String height
    String width
    String positionX
    String positionY

    static constraints = {
    }
}

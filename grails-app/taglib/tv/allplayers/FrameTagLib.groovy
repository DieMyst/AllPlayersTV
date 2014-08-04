package tv.allplayers


class FrameTagLib {
    static namespace = "fr"


    def iFrame = {attrs ->
        Frame frame = attrs.frame
        out << """
            <iframe frameborder="0" width="${frame.width}" height="${frame.height}" src="${frame.streamSource}"
                style="left:${frame.positionX}px; top:${frame.positionY}px; position: absolute;">
            </iframe>
        """
    }

    def iObject = {attrs, body ->
        Frame frame = attrs.frame
        out << createObjectTag(frame)
    }

    def createObjectTag(def frame) {
        "object"
    }
}

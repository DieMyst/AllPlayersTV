package tv.allplayers


class FrameTagLib {
    static namespace = "fr"


    def iFrame = {attrs ->
        Frame frame = attrs.frame
        out << """
            <div class="outer" style="left:${frame.positionX}px; top:${frame.positionY}px; position: absolute; width:${frame.width}px; height:${frame.height}px;">
                <iframe frameborder="0" src="${frame.streamSource}">
                </iframe>
            </div>
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

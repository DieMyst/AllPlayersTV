import tv.allplayers.Frame
import tv.allplayers.User

class BootStrap {

    def init = { servletContext ->
        User user = new User(login: "hey", password: "hey")
        Frame frame1 = new Frame(name: 'twitch1', height: 10, streamSource: 'twitch', weight: 20, positionX: 1, positionY: 20)
        Frame frame2 = new Frame(name: 'gg1', height: 10, streamSource: 'ggh', weight: 20, positionX: 1, positionY: 20)
        user.addToFrames(frame1)
        user.addToFrames(frame2)
        user.save()
    }
    def destroy = {
    }
}

import grails.converters.JSON
import tv.allplayers.Composition
import tv.allplayers.Frame
import tv.allplayers.Sources
import tv.allplayers.User

class BootStrap {

    def init = { servletContext ->
        User user = new User(login: "hey", password: "hey")
        //Frame frame1 = new Frame(name: 'twitch1', height: 378, streamSource: 'http://www.twitch.tv/aui_2000', width: 620, positionX: 1, positionY: 20)
        /*<object type="application/x-shockwave-flash" height="378" width="620" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=aui_2000" bgcolor="#000000"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel=aui_2000&auto_play=true&start_volume=25" /></object>*/
        Composition composition = new Composition(name: "comp")
        Frame frame2 = new Frame(name: 'gg1', height: 450, streamSource: 'http://www.goodgame.ru/player.php?1717', width: 800, positionX: 70, positionY: 600)
        Frame frame3 = new Frame(name: 'gg1', height: 450, streamSource: 'http://www.goodgame.ru/player.php?1717', width: 800, positionX: 170, positionY: 600)
        Frame frame4 = new Frame(name: 'gg1', height: 450, streamSource: 'http://goodgame.ru/chat/Abver', width: 100, positionX: 770, positionY: 300)
        //как узнавать id стримера?
        /*<iframe frameborder="0" width="800" height="450" src="http://www.goodgame.ru/player.php?1717"></iframe>*/
        composition.addToFrames(frame3)
        composition.addToFrames(frame2)
        composition.addToFrames(frame4)
        user.addToCompositions(composition)
        user.save()

        User user2 = new User(login: "diemust", password: "hey")
        //Frame frame1 = new Frame(name: 'twitch1', height: 378, streamSource: 'http://www.twitch.tv/aui_2000', width: 620, positionX: 1, positionY: 20)
        /*<object type="application/x-shockwave-flash" height="378" width="620" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=aui_2000" bgcolor="#000000"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel=aui_2000&auto_play=true&start_volume=25" /></object>*/
        Composition composition1 = new Composition(name: "comp1")
        Frame frame5 = new Frame(name: 'gg2', height: 450, streamSource: 'http://www.goodgame.ru/player.php?1717', width: 800, positionX: 70, positionY: 600, sourceType: 0, type: "stream")
        Frame frame6 = new Frame(name: 'gg3', height: 450, streamSource: 'http://www.goodgame.ru/player.php?1717', width: 800, positionX: 170, positionY: 600, sourceType: 0, type: "stream")
        Frame frame7 = new Frame(name: 'gg4', height: 450, streamSource: 'http://goodgame.ru/chat/Abver', width: 100, positionX: 770, positionY: 300, sourceType: 0, type: "chat")
        //как узнавать id стримера?
        /*<iframe frameborder="0" width="800" height="450" src="http://www.goodgame.ru/player.php?1717"></iframe>*/
        composition1.addToFrames(frame5)
        composition1.addToFrames(frame6)
        composition1.addToFrames(frame7)
        user2.addToCompositions(composition1)
        Composition composition2 = new Composition(name: "comp2")
        Frame frame8 = new Frame(name: 'gg567', height: 450, streamSource: 'http://www.goodgame.ru/player.php?1717', width: 800, positionX: 170, positionY: 300, sourceType: 0, type: "stream")
        Frame frame9 = new Frame(name: 'gg58', height: 450, streamSource: 'http://www.goodgame.ru/player.php?1717', width: 800, positionX: 270, positionY: 200, sourceType: 0, type: "stream")
        Frame frame10 = new Frame(name: 'gg456', height: 450, streamSource: 'http://goodgame.ru/chat/Abver', width: 100, positionX: 770, positionY: 700, sourceType: 0, type: "chat")
        //как узнавать id стримера?
        /*<iframe frameborder="0" width="800" height="450" src="http://www.goodgame.ru/player.php?1717"></iframe>*/
        composition2.addToFrames(frame8)
        composition2.addToFrames(frame9)
        composition2.addToFrames(frame10)
        user2.addToCompositions(composition2)
        user2.save()

        JSON.registerObjectMarshaller(User) { User jUser ->
            return [
                    login: jUser.login,
                    password: jUser.password,
                    compositions: jUser.compositions
            ]
        }

        JSON.registerObjectMarshaller(Composition) { Composition jComposition ->
            return [
                    name: jComposition.name,
                    frames: jComposition.frames
            ]
        }

        JSON.registerObjectMarshaller(Frame) { Frame frame ->
            return [
                    name: frame.name,
                    streamSource: frame.streamSource,
                    height: frame.height,
                    width: frame.width,
                    positionX: frame.positionX,
                    positionY: frame.positionY,
                    sourceType: frame.sourceType,
                    type: frame.type
            ]
        }

    }
    def destroy = {
    }

}

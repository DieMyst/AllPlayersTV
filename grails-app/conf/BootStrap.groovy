import grails.converters.JSON
import tv.allplayers.Composition
import tv.allplayers.Frame
import tv.allplayers.Role
import tv.allplayers.Sources
import tv.allplayers.User
import tv.allplayers.UserRole

class BootStrap {

    def init = { servletContext ->
        def userRole = Role.findByAuthority('ROLE_USER') ?: new Role(authority: 'ROLE_USER').save(failOnError: true)

        User user = new User(username: "hey", password: "hey", enabled: true)
        //Frame frame1 = new Frame(name: 'twitch1', height: 378, streamSource: 'http://www.twitch.tv/aui_2000', width: 620, positionX: 1, positionY: 20)
        /*<object type="application/x-shockwave-flash" height="378" width="620" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=aui_2000" bgcolor="#000000"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel=aui_2000&auto_play=true&start_volume=25" /></object>*/
        Composition composition = new Composition(name: "comp")
        Frame frame2 = new Frame(height: '450px', streamSource: '1717', width: '800px', positionX: '70px', positionY: '600px', sourceType: Sources.GG, type: "stream")
        Frame frame3 = new Frame(height: '450px', streamSource: '1717', width: '800px', positionX: '170px', positionY: '600px', sourceType: Sources.GG, type: "stream")
        Frame frame4 = new Frame(height: '450px', streamSource: 'Abver', width: '100px', positionX: '770px', positionY: '300px', sourceType: Sources.GG, type: "chat")
        //как узнавать id стримера?
        /*<iframe frameborder="0" width="800" height="450" src="http://www.goodgame.ru/player.php?1717"></iframe>*/
        composition.addToFrames(frame3)
        composition.addToFrames(frame2)
        composition.addToFrames(frame4)
        user.addToCompositions(composition)
        user.save()
        UserRole.create user, userRole

        User user2 = new User(username: "diemust", password: "hey")
        //Frame frame1 = new Frame(name: 'twitch1', height: 378, streamSource: 'http://www.twitch.tv/aui_2000', width: 620, positionX: 1, positionY: 20)
        /*<object type="application/x-shockwave-flash" height="378" width="620" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=aui_2000" bgcolor="#000000"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel=aui_2000&auto_play=true&start_volume=25" /></object>*/
        Composition composition1 = new Composition(name: "comp1")
        Frame frame5 = new Frame(height: '450px', streamSource: '1717', width: '800px', positionX: '70px', positionY: '600px', sourceType: Sources.GG, type: "stream")
        Frame frame6 = new Frame(height: '450px', streamSource: '1717', width: '800px', positionX: '170px', positionY: '600px', sourceType: Sources.GG, type: "stream")
        Frame frame7 = new Frame(height: '450px', streamSource: '1717', width: '100px', positionX: '770px', positionY: '300px', sourceType: Sources.GG, type: "chat")
        //как узнавать id стримера?
        /*<iframe frameborder="0" width="800" height="450" src="http://www.goodgame.ru/player.php?1717"></iframe>*/
        composition1.addToFrames(frame5)
        composition1.addToFrames(frame6)
        composition1.addToFrames(frame7)
        user2.addToCompositions(composition1)
        Composition composition2 = new Composition(name: "comp2")
        Frame frame8 = new Frame(height: '450px', streamSource: '1717', width: '800px', positionX: '170px', positionY: '300px', sourceType: Sources.GG, type: "stream")
        Frame frame9 = new Frame(height: '450px', streamSource: '1717', width: '800px', positionX: '270px', positionY: '200px', sourceType: Sources.GG, type: "stream")
        Frame frame10 = new Frame(height: '450px', streamSource: 'Abver', width: '100px', positionX: '770px', positionY: '700px', sourceType: Sources.GG, type: "chat")
        //как узнавать id стримера?
        /*<iframe frameborder="0" width="800" height="450" src="http://www.goodgame.ru/player.php?1717"></iframe>*/
        composition2.addToFrames(frame8)
        composition2.addToFrames(frame9)
        composition2.addToFrames(frame10)
        user2.addToCompositions(composition2)
        user2.save()
        UserRole.create user2, userRole

        JSON.registerObjectMarshaller(User) { User jUser ->
            return [
                    login: jUser.username,
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

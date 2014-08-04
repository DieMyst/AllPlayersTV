import tv.allplayers.Frame
import tv.allplayers.User

class BootStrap {

    def init = { servletContext ->
        User user = new User(login: "hey", password: "hey")
        //Frame frame1 = new Frame(name: 'twitch1', height: 378, streamSource: 'http://www.twitch.tv/aui_2000', width: 620, positionX: 1, positionY: 20)
        /*<object type="application/x-shockwave-flash" height="378" width="620" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=aui_2000" bgcolor="#000000"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel=aui_2000&auto_play=true&start_volume=25" /></object>*/
        Frame frame2 = new Frame(name: 'gg1', height: 450, streamSource: 'http://www.goodgame.ru/player.php?1717', width: 800, positionX: 70, positionY: 600)
        Frame frame3 = new Frame(name: 'gg1', height: 450, streamSource: 'http://www.goodgame.ru/player.php?1717', width: 800, positionX: 170, positionY: 600)
        Frame frame4 = new Frame(name: 'gg1', height: 450, streamSource: 'http://goodgame.ru/chat/Abver', width: 100, positionX: 770, positionY: 300)
        //как узнавать id стримера?
        /*<iframe frameborder="0" width="800" height="450" src="http://www.goodgame.ru/player.php?1717"></iframe>*/
        user.addToFrames(frame3)
        user.addToFrames(frame2)
        user.addToFrames(frame4)
        user.save()
    }
    def destroy = {
    }

}

package tv.allplayers
/**
 * by DShahtarin on 15.09.2014.
 */
class Sources {
    int value
    String source
    boolean stream
    boolean chat
    String hint

    private static def sourcesList = []

    public final static int TWITCH = 0
    public final static int GG = 1
    public final static int CYBERGAME = 2
    public final static int SC2TV = 3
    public final static int HITBOX = 4

    static {
        def twitchHint = "Введите ник стримера на twitch.tv"
        sourcesList.add(new Sources(value: TWITCH, source: "Twitch", stream: true, chat: true, hint: twitchHint))
        def ggHint = "Введите id стримера. id стримера можно узнать, нажав в плеере GoodGame.ru \"Поделиться\" и взяв цифры из ссылки после знака вопроса. Для чата можно ввести ник стримера."
        sourcesList.add(new Sources(value: GG, source: "GoodGame", stream: true, chat: true, hint: ggHint))
        def cybergameHint = "Введите ник стримера на CyberGame.tv"
        sourcesList.add(new Sources(value: CYBERGAME, source: "Cybergame", stream: true, chat: true, hint: cybergameHint))
        def sc2tvHint = "Введите ник стримера на sc2tv.ru"
        sourcesList.add(new Sources(value: SC2TV, source: "SC2TV", stream: false, chat: true, hint: sc2tvHint))
        def hitboxHint = "Введите ник стримера на hitbox.tv"
        sourcesList.add(new Sources(value: HITBOX, source: "hitbox", stream: true, chat: true, hint: hitboxHint))
    }
    public static def getSources() {
        sourcesList
    }
}

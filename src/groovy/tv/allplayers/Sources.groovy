package tv.allplayers
/**
 * by DShahtarin on 15.09.2014.
 */
class Sources {
    int value
    String source
    boolean stream;
    boolean chat;

    private static def sourcesList = []

    public final static int TWITCH = 0
    public final static int GG = 1
    public final static int CYBERGAME = 2
    public final static int SC2TV = 3

    static {
        sourcesList.add(new Sources(value: TWITCH, source: "Twitch", stream: true, chat: true))
        sourcesList.add(new Sources(value: GG, source: "GoodGame", stream: true, chat: true))
        sourcesList.add(new Sources(value: CYBERGAME, source: "Cybergame", stream: true, chat: true))
        sourcesList.add(new Sources(value: SC2TV, source: "SC2TV ", stream: false, chat: true))
    }
    public static def getSources() {
        sourcesList
    }
}

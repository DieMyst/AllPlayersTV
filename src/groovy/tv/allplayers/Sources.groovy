package tv.allplayers
/**
 * by DShahtarin on 15.09.2014.
 */
class Sources {
    int value
    String source
    private static def sourcesList = []

    public final static int TWITCH = 0
    public final static int GG = 1
    public final static int CYBERGAME = 2
    public final static int SC2TV = 3

    static {
        sourcesList.add(new Sources(value: TWITCH, source: "Twitch"))
        sourcesList.add(new Sources(value: GG, source: "GoodGame"))
        sourcesList.add(new Sources(value: CYBERGAME, source: "Cybergame"))
        sourcesList.add(new Sources(value: SC2TV, source: "SC2TV "))
    }
    public static def getSources() {
        sourcesList
    }
}

package tv.allplayers
/**
 * by DShahtarin on 15.09.2014.
 */
class Sources {
    int value
    String source
    private static def sourcesList = []

    static {
        sourcesList.add(new Sources(value: 0, source: "Twitch"))
        sourcesList.add(new Sources(value: 1, source: "GoodGame"))
        sourcesList.add(new Sources(value: 2, source: "Twitch"))
    }
    public static def getSources() {
        sourcesList
    }
}

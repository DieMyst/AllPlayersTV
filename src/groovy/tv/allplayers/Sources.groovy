package tv.allplayers

import grails.converters.JSON

/**
 * by DShahtarin on 15.09.2014.
 */
class Sources {
    private static def sourcesMap = [:]

    static {
        sourcesMap["TWITCH"] = "Twitch"
        sourcesMap["GG"] = "GoodGame"
        sourcesMap["CYBERGAME"] = "Cybergame"
    }
    public static Map getSources() {
        sourcesMap
    }
}

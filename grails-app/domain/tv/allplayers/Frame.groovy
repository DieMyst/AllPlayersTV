package tv.allplayers

import grails.rest.Resource

@Resource(uri = '/frames')
class Frame {
    static belongsTo = [user: User]

    String name
    String streamSource
    int height
    int weight
    int positionX
    int positionY

    static constraints = {
    }
}

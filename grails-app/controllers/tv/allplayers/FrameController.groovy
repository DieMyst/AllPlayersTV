package tv.allplayers

import grails.rest.RestfulController

class FrameController extends RestfulController {

    static responseFormats = ['json', 'xml']

    FrameController() {
        super(Frame)
    }
}

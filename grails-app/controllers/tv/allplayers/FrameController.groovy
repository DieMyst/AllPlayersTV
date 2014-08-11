package tv.allplayers

import grails.rest.RestfulController

class FrameController extends RestfulController {

    static responseFormats = ['json']

    FrameController() {
        super(Frame)
    }
}

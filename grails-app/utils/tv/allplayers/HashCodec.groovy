package tv.allplayers

import sun.misc.BASE64Encoder

import java.security.MessageDigest

/**
 * User: diemust
 * Date: 29.09.2014
 * Time: 22:28
 */
class HashCodec {

    static encode = { str ->
        str = "123123" + str + "saltsalt"
        MessageDigest md = MessageDigest.getInstance('SHA')
        md.update(str.getBytes('UTF-8'))
        return (new BASE64Encoder()).encode(md.digest())
    }
}


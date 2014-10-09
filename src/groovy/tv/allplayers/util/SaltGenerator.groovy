package tv.allplayers.util

import sun.misc.BASE64Encoder

import java.security.MessageDigest
import java.security.SecureRandom

/**
 * User: diemust
 * Date: 29.09.2014
 * Time: 22:28
 */
class SaltGenerator {

    public static final String generateSalt() {
        def salt = new byte[48]
        new SecureRandom().nextBytes(salt)
        return salt.encodeAsBase64()
    }
}


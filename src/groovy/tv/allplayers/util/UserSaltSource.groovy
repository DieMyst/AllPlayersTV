package tv.allplayers.util

import org.springframework.security.authentication.dao.ReflectionSaltSource
import org.springframework.security.core.userdetails.UserDetails

/**
 * by DShahtarin on 09.10.2014.
 */
class UserSaltSource extends ReflectionSaltSource {

    Object getSalt(UserDetails user) {
        user[userPropertyToUse]
    }
}

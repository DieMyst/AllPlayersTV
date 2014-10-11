package tv.allplayers

import org.apache.commons.lang.builder.HashCodeBuilder

class UserRole implements Serializable {

	private static final long serialVersionUID = 1

	User user
	Role role

	boolean equals(other) {
		if (!(other instanceof UserRole)) {
			return false
		}

		other.user?.id == user?.id &&
		other.role?.id == role?.id
	}

	int hashCode() {
		def builder = new HashCodeBuilder()
		if (user) builder.append(user.id)
		if (role) builder.append(role.id)
		builder.toHashCode()
	}

	static UserRole get(long secUserId, long secRoleId) {
		UserRole.where {
			user == SecUser.load(secUserId) &&
			role == Role.load(secRoleId)
		}.get()
	}

	static boolean exists(long secUserId, long secRoleId) {
		UserRole.where {
			user == User.load(secUserId) &&
			role == Role.load(secRoleId)
		}.count() > 0
	}

	static UserRole create(User secUser, Role secRole, boolean flush = false) {
		def instance = new UserRole(user: secUser, role: secRole)
		instance.save(flush: flush, insert: true)
		instance
	}

	static boolean remove(User u, Role r, boolean flush = false) {
		if (u == null || r == null) return false

		int rowCount = UserRole.where {
			user == SecUser.load(u.id) &&
			role == Role.load(r.id)
		}.deleteAll()

		if (flush) { UserRole.withSession { it.flush() } }

		rowCount > 0
	}

	static void removeAll(User u, boolean flush = false) {
		if (u == null) return

		UserRole.where {
			user == SecUser.load(u.id)
		}.deleteAll()

		if (flush) { UserRole.withSession { it.flush() } }
	}

	static void removeAll(Role r, boolean flush = false) {
		if (r == null) return

		UserRole.where {
			role == Role.load(r.id)
		}.deleteAll()

		if (flush) { UserRole.withSession { it.flush() } }
	}

	static constraints = {
		role validator: { Role r, UserRole ur ->
			if (ur.user == null) return
			boolean existing = false
			UserRole.withNewSession {
				existing = UserRole.exists(ur.user.id, r.id)
			}
			if (existing) {
				return 'userRole.exists'
			}
		}
	}

	static mapping = {
		id composite: ['role', 'user']
		version false
	}
}

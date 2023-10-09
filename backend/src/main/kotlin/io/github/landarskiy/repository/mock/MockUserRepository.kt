package io.github.landarskiy.repository.mock

import io.github.landarskiy.repository.UserRepository
import io.ktor.util.logging.*

class MockUserRepository(private val log: Logger) : UserRepository {

    private val userBookmarksMap: MutableMap<String, Set<String>> = mutableMapOf()

    override fun getUserAppBookmarks(userId: String): Set<String> {
        return userBookmarksMap[userId] ?: emptySet()
    }

    override fun updateAppBookmark(userId: String, appId: String, bookmarked: Boolean) {
        val userBookmarks = userBookmarksMap[userId]?.toMutableSet() ?: mutableSetOf()
        userBookmarksMap[userId] = userBookmarks.apply {
            if (bookmarked) {
                add(appId)
            } else {
                remove(appId)
            }
        }
    }
}
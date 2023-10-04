package io.github.landarskiy.repository

interface UserRepository {
    fun getUserAppBookmarks(userId: String): List<String>

    fun addUserAppBookmark(userId: String, appId: String)

    fun removeUserAppBookmark(userId: String, appId: String)

    fun getUserAppRatings(userId: String): Map<String, Int>
}
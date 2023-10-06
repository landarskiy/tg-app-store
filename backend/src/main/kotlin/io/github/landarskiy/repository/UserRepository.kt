package io.github.landarskiy.repository

interface UserRepository {
    fun getUserAppBookmarks(userId: String): Set<String>

    fun updateAppBookmark(userId: String, appId: String, bookmarked: Boolean)
}
package io.github.landarskiy.repository

import io.github.landarskiy.repository.model.AppDetailsModel
import io.github.landarskiy.repository.model.AppModel

interface AppRepository {
    fun getApps(appIds: Set<String>): List<AppModel>

    fun getAllApps(): List<AppModel>

    fun getApps(categoryId: String): List<AppModel>

    fun getAppDetails(appId: String): AppDetailsModel?

    fun updateUserRating(userId: String, appId: String, rating: Int)

    fun getUserRating(userId: String, appId: String): Int

    companion object {
        const val CATEGORY_ID_ALL = "all"
        const val CATEGORY_ID_BOOKMARKED = "my"
    }
}
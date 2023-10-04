package io.github.landarskiy.repository

import io.github.landarskiy.repository.model.AppDetailsModel
import io.github.landarskiy.repository.model.AppModel

interface AppRepository {
    fun getApps(categoryId: String): List<AppModel>

    fun getAppDetails(appId: String): AppDetailsModel?

    fun addUserRating(userId: String, appId: String, rating: Int)

    fun getUserRating(userId: String, appId: String): Int
}
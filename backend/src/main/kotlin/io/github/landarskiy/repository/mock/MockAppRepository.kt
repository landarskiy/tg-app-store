package io.github.landarskiy.repository.mock

import io.github.landarskiy.repository.AppRepository
import io.github.landarskiy.repository.model.AppDetailsModel
import io.github.landarskiy.repository.model.AppModel
import io.github.landarskiy.repository.model.AppUserRatingModel

class MockAppRepository : AppRepository {

    private val userRatingMap: MutableMap<String, AppUserRatingModel> = mutableMapOf()
    private val appDetailsMap: MutableMap<String, AppDetailsModel> = mutableMapOf()
    private val appMap: MutableMap<String, AppModel> = mutableMapOf()

    init {
        javaClass.classLoader.getResourceAsStream("mock-app-list.json")
    }

    override fun getApps(categoryId: String): List<AppModel> {
        val predicate: (AppModel) -> Boolean = if (categoryId == "all") {
            { true }
        } else {
            { app: AppModel -> app.category == categoryId }
        }
        return appMap.values.filter(predicate).sortedByDescending { it.rating }
    }

    override fun getAppDetails(appId: String): AppDetailsModel? {
        return appDetailsMap[appId]
    }

    override fun addUserRating(userId: String, appId: String, rating: Int) {
        val appDetails = appDetailsMap[appId] ?: return
        userRatingMap["${userId}_${appId}"] = AppUserRatingModel(appId = appId, userId = userId, rating = rating)
        val newRating: Pair<Int, Float> = calculateAppRating(appId)
        appDetailsMap[appId] = appDetails.copy(rating = newRating.second, rateCount = newRating.first)
    }

    private fun calculateAppRating(appId: String): Pair<Int, Float> {
        val ratings = userRatingMap.values.filter { it.appId == appId }
        if (ratings.isEmpty()) {
            return Pair(0, 0f)
        }
        val rating: Float = ratings.sumOf { it.rating } / ratings.size.toFloat()
        return Pair(ratings.size, rating)
    }

    override fun getUserRating(userId: String, appId: String): Int {
        return userRatingMap["${userId}_${appId}"]?.rating ?: -1;
    }
}
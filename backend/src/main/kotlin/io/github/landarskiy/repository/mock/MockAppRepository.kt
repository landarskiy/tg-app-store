package io.github.landarskiy.repository.mock

import io.github.landarskiy.repository.AppRepository
import io.github.landarskiy.repository.model.AppDetailsModel
import io.github.landarskiy.repository.model.AppModel
import io.github.landarskiy.repository.model.AppUserRatingModel
import io.ktor.util.logging.*
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.decodeFromStream
import java.io.InputStream
import kotlin.math.roundToInt

@OptIn(ExperimentalSerializationApi::class)
class MockAppRepository(private val log: Logger) : AppRepository {

    private val userRatingMap: MutableMap<String, AppUserRatingModel> = mutableMapOf()
    private val appDetailsMap: MutableMap<String, AppDetailsModel> = mutableMapOf()
    private val appMap: MutableMap<String, AppModel> = mutableMapOf()

    init {
        log.debug("Repository initialization started")
        val appList = Json.decodeFromStream<List<MockAppModel>>(requiredStream("mock-app-list.json"))
        val appDetailsList = Json.decodeFromStream<List<MockAppDetailsModel>>(requiredStream("mock-app-details.json"))
        val appRatingList = Json.decodeFromStream<List<MockAppUserRatingModel>>(requiredStream("mock-app-rating.json"))
        appRatingList.forEach { rating ->
            userRatingMap[getUserRatingKey(userId = rating.userId, appId = rating.appId)] =
                rating.toAppUserRatingModel()
        }
        appList.forEach { app ->
            val rating = calculateAppRating(app.id)
            appMap[app.id] = app.toAppModel().copy(rating = rating.second, rateCount = rating.first)
        }
        appDetailsList.forEach { app ->
            val rating = calculateAppRating(app.id)
            appDetailsMap[app.id] = app.toAppDetailsModel().copy(rating = rating.second, rateCount = rating.first)
        }
        log.debug("Repository initialization finished")
    }

    private fun requiredStream(fileName: String): InputStream {
        return requireNotNull(javaClass.classLoader.getResourceAsStream(fileName))
    }

    private fun getAppsByFilter(predicate: (AppModel) -> Boolean): List<AppModel> {
        return appMap.values.filter(predicate)
    }

    override fun getApps(appIds: Set<String>): List<AppModel> {
        return getAppsByFilter { app: AppModel -> appIds.contains(app.id) }
    }

    override fun getAllApps(): List<AppModel> {
        return getAppsByFilter { true }
    }

    override fun getApps(categoryId: String): List<AppModel> {
        return getAppsByFilter { app: AppModel -> app.category.key == categoryId }
    }

    override fun getAppDetails(appId: String): AppDetailsModel? {
        return appDetailsMap[appId]
    }

    override fun updateUserRating(userId: String, appId: String, rating: Int) {
        val appDetails = appDetailsMap[appId] ?: return
        userRatingMap[getUserRatingKey(userId = userId, appId = appId)] =
            AppUserRatingModel(appId = appId, userId = userId, rating = rating)
        val newRating: Pair<Int, Float> = calculateAppRating(appId)
        appDetailsMap[appId] = appDetails.copy(rating = newRating.second, rateCount = newRating.first)
    }

    private fun calculateAppRating(appId: String): Pair<Int, Float> {
        val ratings = userRatingMap.values.filter { it.appId == appId }
        if (ratings.isEmpty()) {
            return Pair(0, 0f)
        }
        val rating: Float = ratings.sumOf { it.rating } / ratings.size.toFloat()
        return Pair(ratings.size, (rating * 10).roundToInt() / 10f)
    }

    override fun getUserRating(userId: String, appId: String): Int {
        return userRatingMap[getUserRatingKey(userId = userId, appId = appId)]?.rating ?: -1;
    }

    private fun getUserRatingKey(userId: String, appId: String): String {
        return "${userId}_${appId}"
    }
}
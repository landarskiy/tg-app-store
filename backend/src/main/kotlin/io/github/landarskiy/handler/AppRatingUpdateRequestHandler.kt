package io.github.landarskiy.handler

import io.github.landarskiy.handler.model.NetworkRateResponseModel
import io.github.landarskiy.handler.util.InitDataParser
import io.github.landarskiy.repository.AppRepository
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.util.logging.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

class AppRatingUpdateRequestHandler(
    private val log: Logger,
    private val appRepository: AppRepository,
    private val initDataParser: InitDataParser
) : RequestHandler {
    override suspend fun handle(call: ApplicationCall) {
        val initDataModel = initDataParser.parseInitData(call)
        val userId = initDataModel?.userModel?.id
        log.info("Call from user: $userId")
        val appId = call.parameters["appId"]
        val rating = call.parameters["rating"]?.toIntOrNull()
        val result = if (userId == null || appId == null || rating == null || rating !in 1..5) {
            NetworkRateResponseModel(id = appId ?: "", rating = 0f, userRating = rating ?: 0, rateCount = 0)
        } else {
            appRepository.updateUserRating(userId = userId, appId = appId, rating = rating)
            val appDetails = appRepository.getAppDetails(appId)
            val appRating = appDetails?.rating ?: 0f
            val rateCount = appDetails?.rateCount ?: 0
            NetworkRateResponseModel(id = appId, rating = appRating, userRating = rating, rateCount = rateCount)
        }
        call.respondText(Json.encodeToString(result), ContentType.Application.Json, HttpStatusCode.OK)
    }
}
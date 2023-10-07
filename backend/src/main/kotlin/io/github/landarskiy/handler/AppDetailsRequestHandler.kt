package io.github.landarskiy.handler

import io.github.landarskiy.handler.model.NetworkAppDetailsModel
import io.github.landarskiy.handler.util.InitDataParser
import io.github.landarskiy.repository.AppRepository
import io.github.landarskiy.repository.UserRepository
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

class AppDetailsRequestHandler(
    private val appRepository: AppRepository,
    private val userRepository: UserRepository,
    private val initDataParser: InitDataParser
) : RequestHandler {
    override suspend fun handle(call: ApplicationCall) {
        val appId = call.parameters["id"]
        if (appId == null) {
            call.respond(HttpStatusCode.NotFound)
            return
        }
        val rawApp = appRepository.getAppDetails(appId)
        if (rawApp == null) {
            call.respond(HttpStatusCode.NotFound)
            return
        }
        val userId = call.parameters["user_id"]
        val userBookmarkedApps = userId?.let { userRepository.getUserAppBookmarks(it) } ?: emptySet()
        val userRating = userId?.let { appRepository.getUserRating(userId = userId, appId = appId) } ?: -1
        val returnApp = NetworkAppDetailsModel.fromModel(rawApp).copy(
            bookmarked = userBookmarkedApps.contains(rawApp.id),
            userRating = userRating
        )
        call.respondText(Json.encodeToString(returnApp), ContentType.Application.Json, HttpStatusCode.OK)
    }
}
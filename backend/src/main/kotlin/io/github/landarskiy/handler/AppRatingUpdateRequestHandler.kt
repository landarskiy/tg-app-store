package io.github.landarskiy.handler

import io.github.landarskiy.repository.AppRepository
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*

class AppRatingUpdateRequestHandler(
    private val appRepository: AppRepository
) : RequestHandler {
    override suspend fun handle(call: ApplicationCall) {
        val appId = call.parameters["appId"]
        val userId = call.parameters["user_id"]
        val rating = call.parameters["rating"]?.toIntOrNull()
        if (userId == null || appId == null || rating == null) {
            call.respond(HttpStatusCode.NotFound)
            return
        }
        if (rating in 1..5) {
            appRepository.updateUserRating(userId = userId, appId = appId, rating = rating)
        }
        call.respond(HttpStatusCode.OK)
    }
}
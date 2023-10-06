package io.github.landarskiy.handler

import io.github.landarskiy.repository.UserRepository
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*

class UserAppBookmarkUpdateRequestHandler(
    private val userRepository: UserRepository
) : RequestHandler {
    override suspend fun handle(call: ApplicationCall) {
        val userId = call.parameters["userId"]
        val appId = call.parameters["app_id"]
        val bookmarked = call.parameters["bookmarked"]
        if (userId == null || appId == null || bookmarked == null) {
            call.respond(HttpStatusCode.NotFound)
            return
        }
        userRepository.updateAppBookmark(userId = userId, appId = appId, bookmarked = bookmarked.toBoolean())
        call.respond(HttpStatusCode.OK)
    }
}
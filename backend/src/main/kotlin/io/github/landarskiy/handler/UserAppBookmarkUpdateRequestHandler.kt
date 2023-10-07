package io.github.landarskiy.handler

import io.github.landarskiy.handler.model.NetworkBookmarkResponseModel
import io.github.landarskiy.handler.util.InitDataParser
import io.github.landarskiy.repository.UserRepository
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.util.logging.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

class UserAppBookmarkUpdateRequestHandler(
    private val log: Logger,
    private val userRepository: UserRepository,
    private val initDataParser: InitDataParser
) : RequestHandler {
    override suspend fun handle(call: ApplicationCall) {
        val initDataModel = initDataParser.parseInitData(call)
        val userId = initDataModel?.userModel?.id
        log.info("Call from user: $userId")
        val appId = call.parameters["app_id"]
        val bookmarked = call.parameters["bookmarked"]
        val result = if (userId == null || appId == null || bookmarked == null) {
            NetworkBookmarkResponseModel(id = appId ?: "", bookmarked = false)
        } else {
            userRepository.updateAppBookmark(userId = userId, appId = appId, bookmarked = bookmarked.toBoolean())
            NetworkBookmarkResponseModel(id = appId, bookmarked = bookmarked.toBoolean())
        }
        call.respondText(
            Json.encodeToString(result), ContentType.Application.Json, HttpStatusCode.OK
        )
    }
}
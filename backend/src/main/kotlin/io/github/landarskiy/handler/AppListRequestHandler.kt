package io.github.landarskiy.handler

import io.github.landarskiy.handler.model.NetworkAppModel
import io.github.landarskiy.repository.AppRepository
import io.github.landarskiy.repository.AppRepository.Companion.CATEGORY_ID_ALL
import io.github.landarskiy.repository.AppRepository.Companion.CATEGORY_ID_BOOKMARKED
import io.github.landarskiy.repository.UserRepository
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.util.logging.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

class AppListRequestHandler(
    private val log: Logger,
    private val appRepository: AppRepository,
    private val userRepository: UserRepository
) : RequestHandler {
    override suspend fun handle(call: ApplicationCall) {
        log.info("Call from: ${call.parameters["init_data"]}")
        val userId = call.parameters["user_id"]
        val categoryId = call.parameters["category_id"] ?: CATEGORY_ID_ALL
        val userBookmarkedApps = userId?.let { userRepository.getUserAppBookmarks(it) } ?: emptySet()
        val rawApps = when (categoryId) {
            CATEGORY_ID_ALL -> appRepository.getAllApps().sortedByDescending { it.rating }
            CATEGORY_ID_BOOKMARKED -> appRepository.getApps(userBookmarkedApps).sortedBy { it.title }
            else -> appRepository.getApps(categoryId).sortedByDescending { it.rating }
        }
        val returnApps = rawApps.map {
            NetworkAppModel.fromModel(it).copy(bookmarked = userBookmarkedApps.contains(it.id))
        }
        call.respondText(Json.encodeToString(returnApps), ContentType.Application.Json, HttpStatusCode.OK)
    }
}
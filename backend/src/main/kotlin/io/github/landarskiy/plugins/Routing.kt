package io.github.landarskiy.plugins

import io.github.landarskiy.handler.AppDetailsRequestHandler
import io.github.landarskiy.handler.AppListRequestHandler
import io.github.landarskiy.handler.AppRatingUpdateRequestHandler
import io.github.landarskiy.handler.UserAppBookmarkUpdateRequestHandler
import io.github.landarskiy.repository.appRepository
import io.github.landarskiy.repository.userRepository
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    val appListRequestHandler = AppListRequestHandler(appRepository, userRepository)
    val appDetailsRequestHandler = AppDetailsRequestHandler(appRepository, userRepository)
    val userAppBookmarkUpdateRequestHandler = UserAppBookmarkUpdateRequestHandler(userRepository)
    val appRatingUpdateRequestHandler = AppRatingUpdateRequestHandler(appRepository)
    routing {
        route("/app/list") {
            options {
                call.respond(HttpStatusCode.OK)
            }
            post {
                appListRequestHandler.handle(call)
            }
        }
        route("/app/details/{id}") {
            options {
                call.respond(HttpStatusCode.OK)
            }
            post {
                appDetailsRequestHandler.handle(call)
            }
        }
        route("/user/{userId}/bookmarks/update") {
            options {
                call.respond(HttpStatusCode.OK)
            }
            post {
                userAppBookmarkUpdateRequestHandler.handle(call)
            }
        }
        route("/app/rating/{appId}/update") {
            options {
                call.respond(HttpStatusCode.OK)
            }
            post {
                appRatingUpdateRequestHandler.handle(call)
            }
        }
    }
}

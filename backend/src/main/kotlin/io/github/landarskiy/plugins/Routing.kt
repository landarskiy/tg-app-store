package io.github.landarskiy.plugins

import io.github.landarskiy.handler.AppDetailsRequestHandler
import io.github.landarskiy.handler.AppListRequestHandler
import io.github.landarskiy.handler.AppRatingUpdateRequestHandler
import io.github.landarskiy.handler.UserAppBookmarkUpdateRequestHandler
import io.github.landarskiy.handler.util.InitDataParser
import io.github.landarskiy.repository.appRepository
import io.github.landarskiy.repository.userRepository
import io.ktor.server.application.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    val telegramBotToken = System.getenv("TELEGRAM_BOT_TOKEN") ?: ""
    log.info("Telegram bot token loaded, hash: ${telegramBotToken.hashCode()}")
    val initDataParser = InitDataParser(log, telegramBotToken)
    val appListRequestHandler = AppListRequestHandler(log, appRepository, userRepository, initDataParser)
    val appDetailsRequestHandler = AppDetailsRequestHandler(appRepository, userRepository, initDataParser)
    val userAppBookmarkUpdateRequestHandler = UserAppBookmarkUpdateRequestHandler(log, userRepository, initDataParser)
    val appRatingUpdateRequestHandler = AppRatingUpdateRequestHandler(appRepository, initDataParser)
    routing {
        route("/app/list") {
            post {
                appListRequestHandler.handle(call)
            }
        }
        route("/app/details/{id}") {
            post {
                appDetailsRequestHandler.handle(call)
            }
        }
        route("/user/{userId}/bookmarks/update") {
            post {
                userAppBookmarkUpdateRequestHandler.handle(call)
            }
        }
        route("/app/rating/{appId}/update") {
            post {
                appRatingUpdateRequestHandler.handle(call)
            }
        }
    }
}

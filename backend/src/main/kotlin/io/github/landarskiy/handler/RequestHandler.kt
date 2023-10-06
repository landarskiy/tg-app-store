package io.github.landarskiy.handler

import io.ktor.server.application.*

interface RequestHandler {
    suspend fun handle(call: ApplicationCall)
}
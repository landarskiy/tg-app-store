package io.github.landarskiy

import io.github.landarskiy.plugins.configureClient
import io.github.landarskiy.plugins.configureCors
import io.github.landarskiy.plugins.configureRouting
import io.github.landarskiy.plugins.configureSerialization
import io.github.landarskiy.repository.configureRepository
import io.ktor.server.application.*
import io.ktor.server.netty.*

fun main(args: Array<String>): Unit = EngineMain.main(args)

// Called from engine
fun Application.module() {
    configureClient()
    configureRepository()
    configureRouting()
    configureCors()
    configureSerialization()
}

package io.github.landarskiy

import io.github.landarskiy.plugins.*
import io.github.landarskiy.repository.configureRepository
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main(args: Array<String>) : Unit = EngineMain.main(args)

// Called from engine
fun Application.module() {
    configureRepository()
    configureRouting()
    configureSerialization()
}

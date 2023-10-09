package io.github.landarskiy.plugins

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.server.application.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

fun Application.configureClient() {
    val job = SupervisorJob()
    val scope = CoroutineScope(job + coroutineContext)
    scope.launch(Dispatchers.IO) {
        HttpClient(CIO).use { client ->
            log.info("External IP: ${client.get("https://api.ipify.org").bodyAsText()}")
        }
    }
}
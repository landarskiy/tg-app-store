package io.github.landarskiy.handler.util

import io.github.landarskiy.handler.model.NetworkInitDataModel
import io.github.landarskiy.repository.model.InitDataModel
import io.ktor.server.application.*
import io.ktor.server.request.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import java.net.URLDecoder

object InitDataParser {
    suspend fun parseInitData(call: ApplicationCall): InitDataModel? {
        return try {
            val networkInitData = Json.decodeFromString<NetworkInitDataModel>(call.receiveText())
            val rawInitData = networkInitData.rawInitData ?: return null
            return InitDataModel(rawData = rawInitData, decodedData = withContext(Dispatchers.IO) {
                URLDecoder.decode(rawInitData, "UTF-8")
            })
        } catch (e: Throwable) {
            null
        }
    }
}
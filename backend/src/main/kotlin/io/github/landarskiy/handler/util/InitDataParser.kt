package io.github.landarskiy.handler.util

import io.github.landarskiy.handler.model.NetworkInitDataModel
import io.github.landarskiy.handler.model.NetworkInitDataUserModel
import io.github.landarskiy.repository.model.InitDataModel
import io.github.landarskiy.repository.model.InitDataUserModel
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.util.logging.*
import kotlinx.serialization.json.Json
import java.net.URLDecoder
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

class InitDataParser(private val log: Logger, botToken: String) {

    private val secretKey = calcHmacSha256(msg = botToken.toByteArray(), key = "WebAppData".toByteArray())
    private val json = Json {
        ignoreUnknownKeys = true
    }

    suspend fun parseInitData(call: ApplicationCall): InitDataModel? {
        return try {
            val networkInitData = json.decodeFromString<NetworkInitDataModel>(call.receiveText())
            val rawInitData = networkInitData.rawInitData
            if (rawInitData == null) {
                log.info("Init data is null")
                return null
            } else {
                log.info("Init data received: $rawInitData")
            }

            val decodedParams = rawInitData.split("&").map { URLDecoder.decode(it, Charsets.UTF_8) }
            val expectedHash = decodedParams.first { it.startsWith("hash=") }?.replaceFirst("hash=", "")
            val decodedWithoutHash = decodedParams.filter { !it.startsWith("hash=") }
            val dataCheckString = decodedWithoutHash.sorted().joinToString("\n")
            val dataHash = calcHmacSha256(dataCheckString.toByteArray(), secretKey).toHexString()

            if (expectedHash != dataHash) {
                log.info("Invalid signature for init data: $rawInitData")
                return null
            }
            val rawUserDara = decodedWithoutHash.find { it.startsWith("user=") }?.substring("user=".length)
            if (rawUserDara == null) {
                log.info("Raw user data not found")
                return null
            }
            val networkUserData = json.decodeFromString<NetworkInitDataUserModel>(rawUserDara)

            return InitDataModel(
                InitDataUserModel(
                    id = networkUserData.id.toString(),
                    isPremium = networkUserData.premium
                )
            )
        } catch (e: Throwable) {
            log.error(e)
            null
        }
    }

    private fun ByteArray.toHexString(): String {
        return this.joinToString("") { "%02x".format(it) }
    }

    private fun calcHmacSha256(msg: ByteArray, key: ByteArray): ByteArray {
        val algorithm = "HmacSHA256"
        val mac = Mac.getInstance(algorithm)
        val secretKeySpec = SecretKeySpec(key, algorithm)
        mac.init(secretKeySpec)
        return mac.doFinal(msg)
    }
}
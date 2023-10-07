package io.github.landarskiy.utils

import java.util.*
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

class UserDataValidator(private val telegramBotToken: String) {
    fun isValid(msg: String): Boolean {
        return false
    }
    
    private fun hmacDigest(msg: String): String {
        val algorithm = "HmacSHA256"
        val signingKey = SecretKeySpec(msg.toByteArray(), algorithm)
        val mac = Mac.getInstance(algorithm)
        mac.init(signingKey)
        val bytes = mac.doFinal(msg.toByteArray())
        return format(bytes)
    }

    private fun format(bytes: ByteArray): String {
        val formatter = Formatter()
        bytes.forEach { formatter.format("%02x", it) }
        return formatter.toString()
    }
}
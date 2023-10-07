package io.github.landarskiy.utils

import java.util.*
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

class UserDataValidator(private val telegramBotToken: String) {
    private fun isValid(
        msg: String
    ): String {
        val signingKey = SecretKeySpec(msg.toByteArray(), "HmacSHA256")
        val mac = Mac.getInstance(alg)
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
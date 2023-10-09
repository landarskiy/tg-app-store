package io.github.landarskiy.handler.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class NetworkInitDataUserModel(
    @SerialName("id")
    val id: Long,
    @SerialName("is_premium")
    val premium: Boolean = false,
    @SerialName("allows_write_to_pm")
    val allowsWriteToPm: Boolean = false
)
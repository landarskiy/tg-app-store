package io.github.landarskiy.handler.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class NetworkInitDataModel(
    @SerialName("init_data")
    val rawInitData: String?
)
package io.github.landarskiy.handler.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class NetworkRateResponseModel(
    @SerialName("id")
    val id: String,
    @SerialName("rating")
    val rating: Float,
    @SerialName("userRating")
    val userRating: Int,
    @SerialName("rateCount")
    val rateCount: Int
)
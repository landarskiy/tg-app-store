package io.github.landarskiy.handler.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class NetworkBookmarkResponseModel(
    @SerialName("id")
    val id: String,
    @SerialName("fav")
    val bookmarked: Boolean
)
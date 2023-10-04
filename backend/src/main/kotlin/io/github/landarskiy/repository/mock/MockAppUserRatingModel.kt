package io.github.landarskiy.repository.mock

import kotlinx.serialization.SerialName

data class MockAppUserRatingModel(
    @SerialName("appId")
    val appId: String,
    @SerialName("userId")
    val userId: String,
    @SerialName("rating")
    val rating: Int
)
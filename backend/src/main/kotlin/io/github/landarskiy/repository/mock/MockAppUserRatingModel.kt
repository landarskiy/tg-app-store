package io.github.landarskiy.repository.mock

import io.github.landarskiy.repository.model.AppUserRatingModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class MockAppUserRatingModel(
    @SerialName("appId")
    val appId: String,
    @SerialName("userId")
    val userId: String,
    @SerialName("rating")
    val rating: Int
)

fun MockAppUserRatingModel.toAppUserRatingModel(): AppUserRatingModel {
    return AppUserRatingModel(
        appId = appId,
        userId = userId,
        rating = rating
    )
}
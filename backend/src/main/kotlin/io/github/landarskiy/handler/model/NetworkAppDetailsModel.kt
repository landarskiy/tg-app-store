package io.github.landarskiy.handler.model

import io.github.landarskiy.repository.model.AppDetailsModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class NetworkAppDetailsModel(
    @SerialName("id")
    val id: String,
    @SerialName("iconUrl")
    val iconUrl: String,
    @SerialName("screenshots")
    val screenshots: List<String>,
    @SerialName("botAppUrl")
    val botAppUrl: String,
    @SerialName("title")
    val title: String,
    @SerialName("description")
    val description: String,
    @SerialName("rating")
    val rating: Float,
    @SerialName("userRating")
    val userRating: Int,
    @SerialName("rateCount")
    val rateCount: Int,
    @SerialName("category")
    val category: String,
    @SerialName("tags")
    val tags: List<String>,
    @SerialName("fav")
    val bookmarked: Boolean
) {
    companion object {
        fun fromModel(model: AppDetailsModel): NetworkAppDetailsModel {
            return NetworkAppDetailsModel(
                id = model.id,
                iconUrl = model.iconUrl,
                screenshots = model.screenshotUrlList,
                botAppUrl = model.botAppUrl,
                title = model.title,
                description = model.description,
                category = model.category,
                tags = model.tags,
                rating = model.rating,
                rateCount = model.rateCount,
                userRating = -1,
                bookmarked = false
            )
        }
    }
}
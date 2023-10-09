package io.github.landarskiy.handler.model

import io.github.landarskiy.repository.model.AppModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class NetworkAppModel(
    @SerialName("id")
    val id: String,
    @SerialName("iconUrl")
    val iconUrl: String,
    @SerialName("title")
    val title: String,
    @SerialName("rating")
    val rating: Float,
    @SerialName("rateCount")
    val rateCount: Int,
    @SerialName("category")
    val category: NetworkI18nModel,
    @SerialName("tags")
    val tags: List<NetworkI18nModel>,
    @SerialName("fav")
    val bookmarked: Boolean
) {
    companion object {
        fun fromModel(model: AppModel): NetworkAppModel {
            return NetworkAppModel(
                id = model.id,
                iconUrl = model.iconUrl,
                title = model.title,
                category = NetworkI18nModel.fromModel(model.category),
                tags = model.tags.map { NetworkI18nModel.fromModel(it) },
                rating = model.rating,
                rateCount = model.rateCount,
                bookmarked = false
            )
        }
    }
}
package io.github.landarskiy.repository.mock

import io.github.landarskiy.repository.model.AppModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class MockAppModel(
    @SerialName("id")
    val id: String,
    @SerialName("iconUrl")
    val iconUrl: String,
    @SerialName("title")
    val title: String,
    @SerialName("category")
    val category: String,
    @SerialName("tags")
    val tags: List<String>
)

fun MockAppModel.toAppModel(): AppModel {
    return AppModel(
        id = id,
        iconUrl = iconUrl,
        title = title,
        category = category,
        tags = tags,
        rating = 0f,
        rateCount = 0
    )
}
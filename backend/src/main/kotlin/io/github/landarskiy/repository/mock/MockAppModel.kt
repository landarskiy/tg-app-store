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
    val category: MockI18nModel,
    @SerialName("tags")
    val tags: List<MockI18nModel>
)

fun MockAppModel.toAppModel(): AppModel {
    return AppModel(
        id = id,
        iconUrl = iconUrl,
        title = title,
        category = category.toI18nModel(),
        tags = tags.map { it.toI18nModel() },
        rating = 0f,
        rateCount = 0
    )
}
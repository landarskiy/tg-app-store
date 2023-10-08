package io.github.landarskiy.repository.mock

import io.github.landarskiy.repository.model.AppDetailsModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class MockAppDetailsModel(
    @SerialName("id")
    val id: String,
    @SerialName("iconUrl")
    val iconUrl: String,
    @SerialName("screenshots")
    val screenshotUrlList: List<String>,
    @SerialName("botAppUrl")
    val botAppUrl: String,
    @SerialName("title")
    val title: String,
    @SerialName("description")
    val description: String,
    @SerialName("category")
    val category: MockI18nModel,
    @SerialName("tags")
    val tags: List<MockI18nModel>
)

fun MockAppDetailsModel.toAppDetailsModel(): AppDetailsModel {
    return AppDetailsModel(
        id = id,
        iconUrl = iconUrl,
        screenshotUrlList = screenshotUrlList,
        botAppUrl = botAppUrl,
        title = title,
        description = description,
        category = category.toI18nModel(),
        tags = tags.map { it.toI18nModel() },
        rating = 0f,
        rateCount = 0
    )
}
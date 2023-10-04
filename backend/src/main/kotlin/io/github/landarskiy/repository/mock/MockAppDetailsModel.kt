package io.github.landarskiy.repository.mock

import kotlinx.serialization.SerialName

data class MockAppDetailsModel(
    @SerialName("id")
    val id: String,
    @SerialName("iconUrl")
    val iconUrl: String,
    @SerialName("screenshotUrlList")
    val screenshotUrlList: List<String>,
    @SerialName("botAppUrl")
    val botAppUrl: String,
    @SerialName("title")
    val title: String,
    @SerialName("description")
    val description: String,
    @SerialName("category")
    val category: String,
    @SerialName("tags")
    val tags: List<String>
)
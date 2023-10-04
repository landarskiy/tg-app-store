package io.github.landarskiy.repository.mock

import kotlinx.serialization.SerialName

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
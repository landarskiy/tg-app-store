package io.github.landarskiy.repository.model

data class AppModel(
    val id: String,
    val iconUrl: String,
    val title: String,
    val rating: Float,
    val rateCount: Int,
    val category: String,
    val tags: List<String>
)
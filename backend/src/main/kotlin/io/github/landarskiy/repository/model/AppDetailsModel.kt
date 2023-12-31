package io.github.landarskiy.repository.model

data class AppDetailsModel(
    val id: String,
    val iconUrl: String,
    val screenshotUrlList: List<String>,
    val botAppUrl: String,
    val title: String,
    val description: String,
    val rating: Float,
    val rateCount: Int,
    val category: I18nModel,
    val tags: List<I18nModel>
)
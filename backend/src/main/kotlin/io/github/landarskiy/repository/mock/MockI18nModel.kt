package io.github.landarskiy.repository.mock

import io.github.landarskiy.repository.model.I18nModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class MockI18nModel(
    @SerialName("key")
    val key: String,
    @SerialName("value")
    val value: String
)

fun MockI18nModel.toI18nModel(): I18nModel {
    return I18nModel(
        key = key,
        value = value
    )
}
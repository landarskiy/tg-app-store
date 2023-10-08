package io.github.landarskiy.handler.model

import io.github.landarskiy.repository.model.I18nModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class NetworkI18nModel(
    @SerialName("key")
    val key: String,
    @SerialName("value")
    val value: String
) {
    companion object {
        fun fromModel(model: I18nModel): NetworkI18nModel {
            return NetworkI18nModel(
                key = model.key,
                value = model.value
            )
        }
    }
}
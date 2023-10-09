package io.github.landarskiy.repository

import io.github.landarskiy.repository.mock.MockAppRepository
import io.github.landarskiy.repository.mock.MockUserRepository
import io.ktor.server.application.*

private var _appRepository: AppRepository? = null
val appRepository: AppRepository get() = requireNotNull(_appRepository) { "Call configureRepository first" }
private var _userRepository: UserRepository? = null
val userRepository: UserRepository get() = requireNotNull(_userRepository) { "Call configureRepository first" }
fun Application.configureRepository() {
    _appRepository = MockAppRepository(log)
    _userRepository = MockUserRepository(log)
}
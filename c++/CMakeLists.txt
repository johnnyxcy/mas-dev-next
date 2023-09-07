cmake_minimum_required(VERSION 3.22)
project(mas-dev-c++ VERSION 0.0.0)

# c++ 17
set(CMAKE_CXX_STANDARD 17)

if (CMAKE_CXX_COMPILER_ID MATCHES "GNU")
    # set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wa,-mbig-obj -m64")
    set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS} -O3")
    if (WIN32)
        set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS} -g -Wa,-mbigobj")
    endif()
endif()

# variables
get_filename_component(MAS_DEV_ROOT "${CMAKE_CURRENT_LIST_DIR}/.." ABSOLUTE)
set(MAS_DEV_BUILD_BIN ${MAS_DEV_ROOT}/build/bin)
set(MAS_DEV_CMAKE_TOOLS ${CMAKE_CURRENT_LIST_DIR}/cmake_tools)
set(MAS_DEV_LOCAL_PREIFX ${MAS_DEV_ROOT}/.local)

file(GLOB LOCAL_CMAKES_UNDER_LIB ${MAS_DEV_LOCAL_PREIFX}/lib/cmake/*)
file(GLOB LOCAL_CMAKES_UNDER_SHARE ${MAS_DEV_LOCAL_PREIFX}/share/*/cmake)
file(GLOB LOCAL_CMAKES_UNDER_SHARE_CMAKE ${MAS_DEV_LOCAL_PREIFX}/share/cmake/*)

if (WIN32)
    list(APPEND CMAKE_MODULE_PATH ${LOCAL_CMAKES_UNDER_LIB} ${LOCAL_CMAKES_UNDER_SHARE} ${LOCAL_CMAKES_UNDER_SHARE_CMAKE})
    list(APPEND CMAKE_PREFIX_PATH ${MAS_DEV_LOCAL_PREIFX})
elseif (APPLE)
    set(CMAKE_MODULE_PATH ${LOCAL_CMAKES_UNDER_LIB} ${LOCAL_CMAKES_UNDER_SHARE} ${LOCAL_CMAKES_UNDER_SHARE_CMAKE})
    set(CMAKE_PREFIX_PATH ${MAS_DEV_LOCAL_PREIFX})
endif()

# 第三方依赖
list(APPEND CMAKE_MODULE_PATH ${MAS_DEV_ROOT}/mas/vendor/ceres/cmake)
include(${MAS_DEV_CMAKE_TOOLS}/LookForDependencies.cmake)

# options
option(MAS_SKIP_PYD "跳过 python binding pyd 构建" OFF)
option(MAS_SKIP_TESTS "跳过 test 构建" OFF)

# 测试依赖
if (NOT MAS_SKIP_TESTS)
    message(STATUS "由于 MAS_SKIP_TEST=OFF, 进行 test 构建")
    include(${MAS_DEV_CMAKE_TOOLS}/LookForTestDependencies.cmake)
endif()

# 设置 OPENMP
if (APPLE)
    # via homebrew
    list(APPEND CMAKE_LIBRARY_PATH "/opt/homebrew/opt/libomp/lib")
    list(APPEND CMAKE_INCLUDE_PATH "/opt/homebrew/opt/libomp/include")
    set(OpenMP_C "${CMAKE_C_COMPILER}")
    set(OpenMP_C_FLAGS "-fopenmp")
    set(OpenMP_C_LIB_NAMES "libomp" "libgomp" "libiomp5")
    set(OpenMP_libomp_LIBRARY ${OpenMP_C_LIB_NAMES})
    set(OpenMP_libgomp_LIBRARY ${OpenMP_C_LIB_NAMES})
    set(OpenMP_libiomp5_LIBRARY ${OpenMP_C_LIB_NAMES})
    set(OpenMP_CXX "${CMAKE_CXX_COMPILER}")
    set(OpenMP_CXX_FLAGS "-fopenmp")
    set(OpenMP_CXX_LIB_NAMES "libomp" "libgomp" "libiomp5")
    set(OpenMP_libomp_LIBRARY ${OpenMP_CXX_LIB_NAMES})
    set(OpenMP_libgomp_LIBRARY ${OpenMP_CXX_LIB_NAMES})
    set(OpenMP_libiomp5_LIBRARY ${OpenMP_CXX_LIB_NAMES})
endif()

find_package(OpenMP REQUIRED)
if (OPENMP_FOUND)
    set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} ${OpenMP_C_FLAGS}")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${OpenMP_CXX_FLAGS}")
endif ()


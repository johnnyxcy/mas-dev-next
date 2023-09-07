# CMake module 添加外部依赖

if (NOT DEFINED MAS_DEV_ROOT)
 get_filename_component(MAS_DEV_ROOT "${CMAKE_CURRENT_LIST_DIR}/../../.." ABSOLUTE)
endif()

# googletest
add_subdirectory(${MAS_DEV_ROOT}/mas/vendor/googletest)

# CMake module 添加外部依赖

if (NOT DEFINED MAS_DEV_ROOT)
    get_filename_component(MAS_DEV_ROOT "${CMAKE_CURRENT_LIST_DIR}/../../.." ABSOLUTE)
endif()

set(MAS_DEV_VENDOR "${MAS_DEV_ROOT}/mas/vendor")

# OPENBLAS / BLAS
find_package(OpenBLAS REQUIRED)
set(BLA_VENDOR OpenBLAS)
find_package(BLAS REQUIRED)

# SuiteSparse
set(SuiteSparse_NO_CMAKE TRUE)
find_package(SuiteSparse REQUIRED)

find_package(OpenBLAS REQUIRED)
set(Python_FIND_VIRTUALENV FIRST)
find_package(pybind11 REQUIRED)
find_package(Python REQUIRED COMPONENTS Interpreter Development NumPy)

# Eigen
set(EIGEN_USE_BLAS 1)
find_package(Eigen3 REQUIRED)

# boost
find_package(Boost REQUIRED)

# gflags
find_package(gflags REQUIRED)

# glog
find_package(Glog REQUIRED)

# ceres
find_package(Ceres REQUIRED)

<template>
    <el-container class="wrapper">
        <el-container>
            <!-- <el-aside width="256px">
                <div class="menu-logo">
                    <img width="80" src="https://pulsifi.me/media/2017/06/logo-svg.svg" alt="pulsifi">
                </div>
                    <el-menu background-color="#001529" text-color="hsla(0,0%,100%,.65)" :default-active="$route.path" router>
                        <template v-for="route, index in routes">
                            <el-submenu v-if="route.children && route.children.length > 0" :key="route.name" :index="route.name">
                                <template slot="title">
                                    <i class="mr-2" :class="route.icon"></i>
                                    <span class="text-capitalize">{{route.name}}</span>
                                </template>
                                <el-menu-item v-for="child in route.children" :key="child.name" :index="child.path" class="text-capitalize">{{ child.name }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item :key="route.name" :index="route.name" v-else>
                                <span class="text-capitalize">{{route.name}}</span>
                            </el-menu-item>
                        </template>
                    </el-menu>
            </el-aside> -->
            <el-container class="main-panel">
                <el-header>
                    <h5 class="mb-0 font-weight-bold">{{$route.name}}</h5>
                    <div>
                        <router-link class="text-info" to="/">
                          <a>Candidate</a>
                        </router-link>
                        <el-button class="ml-3" type="primary" @click="$store.dispatch('logout')" round><i class="fas fa-sign-out-alt mr-2"></i>Logout</el-button>
                    </div>
                </el-header>
                <el-main>
                    <div class="main-panel-content">
                        <transition name="fade" mode="out-in">
                            <router-view :key="$route.name"></router-view>
                        </transition>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
export default {
    name: 'Job',
    data() {
        return {
            loading: false,
            isCollapse: true,
        };
    },
    created() {},
    computed: {
   
        routes() {
            return this.$router.options.routes || [];
        },
    },
    methods: {
        getToken() {},
    },
};
</script>
<style lang="scss" scoped>
%full-height {
    min-height: 100vh;
}

.wrapper /deep/ {
    @extend %full-height;

    .el-header {
        height: 64px !important;
        padding: 1rem 1.5rem;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }

    .el-aside,
    .el-container {
        @extend %full-height;
    }

    .el-main {
        margin: 24px;
        padding: 0;
        flex-basis: 0;
        flex: auto;
        min-height: 0;
        overflow: initial;
    }

    .el-menu {
        border: 0;
        height: calc(100% - 64px);
    }

    .el-menu-item.is-active {
        transition: background-color 0.5s ease;
        color: #fff;
        background-color: #1890ff !important;
    }

    .el-aside {
        background: #001529;
        box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

        @include media-breakpoint-down(sm) {
            display: none;
        }
    }

    .el-submenu__icon-arrow {
        color: white;
        margin-top: -4px;
    }

    .menu-logo {
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        line-height: 64px;
        padding-left: 24px;
        transition: all 0.3s;
        background: #002140;
        overflow: hidden;

        img {
            transform: translate(-24px, 0);
        }
    }

    .main-panel {
        background: #f0f2f5;
    }

    .main-panel-content {
        // margin: -24px -24px 0px;
        margin: -24px auto 0px auto;
        max-width: 1240px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
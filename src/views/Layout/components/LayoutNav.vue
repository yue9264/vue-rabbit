<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()

const confirm = () => {
    //清楚用户信息，触发action
    userStore.clearUserInfo()
    router.push('/login')
}
</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <template v-if="userStore.userInfo.token">
                    <li><a href="javascript:;"><i class=" iconfront icon-user"></i>{{ userStore.userInfo.account }}</a> </li>
                    <li>
                        <el-popconfirm @confirm="confirm" title="Confirm to logout？" confirm-button-text="Yes" cancel-button-text="No">
                            <template #reference>
                                <a href="javascript:;">Log out</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;">My orders</a></li>
                    <li><a href="javascript:;">Membership center</a></li>
                </template>
                <template v-else>
                    <li><a href="javascript:;" @click="$router.push('/login')">login</a></li>
                    <li><a href="javascript:;">Help Center</a></li>
                    <li><a href="javascript:;">About Us</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>



<style scoped lang="scss">
.app-topnav {
    background: #333;
    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: $xtxColor;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>@/stores/userStore
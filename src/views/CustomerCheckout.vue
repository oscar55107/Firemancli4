<template>
    <div>
        <Navbar></Navbar>
        <div class="container mt-7">
            <div class="row d-flex justify-content-center">
                <div class="col-lg-10">
                    <div class="my-5">
                        <h3 class="text-center text-primary mb-5">確認訂購資料</h3>
                        <div class="card mb-5">
                            <div class="card-header bg-third">
                                <h4 class="h5 text-center text-primary text-bold">訂單資訊</h4>
                            </div>  
                            <div class="card-body">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th width="150"></th>
                                            <th scope="col">產品名稱</th>
                                            <th scope="col">數量</th>
                                            <th scope="col">單價</th>
                                            <th scope="col">價格</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in order.products" :key="item.id">
                                            <td><img :src="item.product.imageUrl"
                                                    class="img-fluid" alt=""></td>
                                            <td scope="row">{{item.product.title}}</td>
                                            <td>{{item.qty}}/{{ item.product.unit }}</td>
                                            <td class="text-right">{{ item.final_total | currency}}</td>
                                            <td class="text-right">
                                                <strong>{{ ( item.final_total * item.qty ) | currency  }} </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" class="text-right">總計</td>
                                            <td class="text-right">
                                                <strong>{{order.total}}</strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="my-5" @click="payOrder">
                        <div class="card text-center">
                            <div class="card-header text-primary text-bold">
                                <h4 class="h5 text-center text-primary text-bold">聯絡資料</h4>
                            </div>
                            <div class="card-body">
                                <table class="table">
                                    <tr>
                                        <th>
                                            <strong>電子郵件</strong>
                                        </th>
                                        <td>{{order.user.email}}</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>姓名</strong>
                                        </th>
                                        <td>{{order.user.name}}</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>電話</strong>
                                        </th>
                                        <td>{{ order.user.tel }}</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>地址</strong>
                                        </th>
                                        <td>{{ order.user.address }}</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>付款狀態</strong>
                                        </th>
                                        <td>
                                            <span v-if="!order.is_paid">尚未付款</span>
                                            <span v-else class="text-success">付款完成</span>
                                        </td>
                                    </tr>
                                </table>
                                <div class="text-right" v-if="order.is_paid === false">
                                <button class="btn btn-primary btn-block">Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
    data(){
        return{
            order:{
                user:{

                }
            },
            orderId:'',
        }
    },
    methods:{
        getOrder(){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
            vm.$store.dispatch('updateLoading',true)
            this.$http.get(url).then(response =>{
                console.log(response.data);
                vm.order = response.data.order;
                vm.$store.dispatch('updateLoading',false)
            })
        },
        payOrder(){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
            vm.$store.dispatch('updateLoading',true)
            this.$http.post(url).then(response =>{
                if(response.data.success){
                    vm.getOrder();
                }
                vm.$store.dispatch('updateLoading',false)
            })
        }
    },
    created(){
        this.orderId = this.$route.params.orderId;
        this.getOrder();
    },
    components:{
        Navbar,
        Footer
    }
}
</script>
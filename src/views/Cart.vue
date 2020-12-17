<template>
    <div>
        <Navbar :len="cart.carts.length"></Navbar>
        <Alert></Alert>
        <div class="container mt-8">
            <div class="card">
                <div class="card-header bg-third">
                    <h4 class="h5  text-primary text-center text-bold">購物車</h4>
                </div>
                <div class="card-body">
                    <table class="table table-lg table-responsive-md" v-if ="cart.carts.length">
                        <thead>
                            <th width="80"></th>
                            <th width="30%">產品圖片</th>
                            <th >產品名稱</th>
                            <th width="120">數量</th>
                            <th width="120">價錢</th>
                        </thead>
                        <tbody>
                            <tr v-for="item in cart.carts" :key="item.id" >
                                <td class="align-middle">
                                    <button type="button" class="btn btn-outline-danger btn-sm"
                                    @click="removeCartItem(item.id)"
                                    >
                                    <i class="far fa-trash-alt"></i>
                                    </button>
                                </td>
                                <td class="align-middle"><img :src="item.product.imageUrl" class="img-fluid" alt=""></td>
                                <td class="align-middle text-bold">
                                {{ item.product.title }}
                                <div class="text-success" v-if="item.coupon">
                                已套用優惠卷
                                </div>
                                </td>
                                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                                <td class="align-middle text-right" v-if="item.final_total !== item.product.origin_price">{{ item.final_total | currency}}</td>
                                <td class="align-middle text-right" v-else>{{ item.product.origin_price | currency}}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4" v-if="cart.final_total == cart.total" class="text-right text-bold">總計</td>
                                <td class="text-right text-bold" v-if="cart.final_total == cart.total">{{ cart.total | currency}}</td>
                            </tr>
                            <tr v-if="cart.final_total !== cart.total">
                                <td colspan="4" class="text-right text-success">折扣價</td>
                                <td class="text-right text-success">{{ cart.final_total }}</td>
                            </tr>
                        </tfoot>
                    </table>
                        <div class="input-group mb-3 input-group-md" v-if ="cart.carts.length">
                            <input type="text" class="form-control" v-model="coupon_code" placeholder="輸入優惠碼">
                            <div class="input-group-append">
                                <button class="btn btn-outline-primary btn-sm" @click="addCouponCode">
                                    套用優惠卷
                                </button>
                                <button class="btn btn-primary btn-sm" @click="toOrder">下一步</button>
                            </div>
                        </div>
                    </div>
                <div class="card-footer text-muted bg-warning">
                    <h4 class="h5">Notice</h4>
                    <p>Free Shipping When You Spend Over $5,000</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Alert from '@/components/AlertMessage.vue';
import { mapGetters , mapActions } from 'vuex';
export default {
    data(){
        return{
            coupon_code:''
        }
    },
    methods:{
        addCouponCode(){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
            const vm = this;
            const coupon = {
                code: vm.coupon_code
            }
            this.$store.dispatch('updateLoading',true) ;
            this.$http.post(api,{data: coupon}).then(response=>{
                if(response.data.success) {
                    vm.getCart();
                    this.$store.dispatch('updateLoading',false);
                }else{
                    this.$bus.$emit('message:push',response.data.message,'danger');
                    this.$store.dispatch('updateLoading',false);
                }                   
            })
        },
        toOrder(){
            this.$router.push('/customer_order');
        },
        ...mapActions('cartModule',['getCart','removeCartItem'])
    },
    components:{
        Navbar,
        Alert,
    },
    computed:{
        ...mapGetters('cartModule',['cart'])
    },
    created(){
        this.getCart();
    }
}
</script>
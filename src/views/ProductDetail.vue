<template>
    <div>
        <Navbar :len="cart.carts.length"></Navbar>
        <div class="container my-8">
            <div class="row mb-7">
                <div class="col-md-6">
                    <img :src="product.imageUrl"  class="img-fluid" alt="">
                </div>
                <div class="col-md-6 d-flex flex-column justify-content-between">
                    <h3 class="product__title">{{ product.title }}</h3>
                    <h6 class="product__type">型號 : {{ product.content }}</h6>
                    <h6 class="product__description">產品說明 :</h6>
                    <p class="product__text"> {{ product.description }}</p>
                    <div class=" d-flex justify-content-start align-items-center">
                        <div class="h6" v-if="!product.price">NT {{product.origin_price | currency}}</div>
                        <del class="h6 mr-4" v-if="product.price">NT {{ product.origin_price | currency}}</del>
                        <div class="h6 text-danger" v-if="product.price">NT {{ product.price | currency}}</div>
                    </div>
                    <select name="" class="product__form form-control " v-model="product.num">
                        <option :value="num" v-for="num in 10" :key="num">
                            購買 {{num}}{{product.unit}}
                        </option>
                    </select>
                    <div class="d-flex justify-content-end align-items-end">
                        <h5 class="mr-4 product__total">  小計 : NT{{(product.num * product.price) | currency}}</h5>
                        <div class="btn btn-primary" @click="addToCart(product.id,product.num)">
                            <i class="fas fa-spinner fa-spin" v-if="loadingItem === product.id"></i>
                            加到購物車</div>
                    </div>
                </div>
            </div>
            <h4>你可能也會喜歡</h4>
            <div class="row mt-5">
                <div class="col-md-4" v-for="item in filterData" :key="item.id">
                    <div class="product__card" @click="toProduct">
                        <div class="card h-100 mt-3">
                            <div class="card__img">
                                <img :src="item.imageUrl" class="card-img-top" alt="...">
                            </div>
                            <div class="card-footer " >
                                <h5 class="card-title">{{item.title}}</h5>
                                <div class="d-flex justify-content-end">
                                    <div  v-if="!item.price">NT {{item.origin_price | currency}}</div>
                                    <del class=" text-muted mr-3" v-if="item.price">NT {{ item.origin_price | currency}}</del>
                                    <div class=" text-danger" v-if="item.price">NT {{ item.price | currency}}</div>
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
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { mapGetters , mapActions} from 'vuex';
export default {
    data(){
        return {
            products:[],
            product:{},
            productId:''
        }
    },
    methods:{
        getProduct(){
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`;
            this.$store.dispatch('updateLoading',true) ;
            vm.product.num = 1;
            this.$http.get(api).then(response=>{
                vm.product = response.data.product;
                vm.product.num = 1;
                this.$store.dispatch('updateLoading',false) ;
            })
        },
        addToCart(id,qty = 1){
            this.$store.dispatch('addToCart',{id,qty})
        },
        getProducts(){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            const vm = this;
            this.$http.get(api).then(response=>{
                vm.products = response.data.products;
            })
        },
        toProduct(){
            this.$router.push('/customer_product')
        },
        ...mapActions('cartModule',['getCart'])
    },
    components:{
        Navbar,
        Footer
    },
    computed:{
        filterData(){
            const vm = this;
            let newData = [];
            vm.products.filter(item=>{
                if(item.category === vm.product.category ){
                    newData.push(item);
                }
            })
            let sliceData = newData.slice(0,3);
            console.log(sliceData);
            return sliceData;
        },
        ...mapGetters('cartModule',['cart','loadingItem'])
    },
    created(){
        this.productId = this.$route.params.productId;  
        this.getProduct();
        this.getCart();
        this.getProducts();
    },
}
</script>

<style lang="scss" scoped>
    .product__card:hover{
        cursor: pointer;
    }
    .card__img{
        overflow:hidden
    }
    .card__img img{
        transition: all 1s ease-out;
        &:hover{
            transform:scale(1.2,1.2);
        }
    }
</style>


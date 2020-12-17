<template>
    <div>
        <Navbar :len="cart.carts.length"></Navbar>
        <div class="container">
            <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" data-interval="3000">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="@/assets/images/product-tent.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h3>帳篷</h3>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="@/assets/images/product-kitchen.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h3>廚具</h3>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="@/assets/images/product-bag.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h3>機能背包</h3>
                    </div>
                    </div>
                </div>
            </div>
            <div class="row noGutter__row">
                <div class="sale noGutter__co col-12 text-center  py-3 mt-6" data-aos="fade-up">
                    開幕期間，輸入 fireman 優惠碼，立即享 <span>20% off</span> 折扣 !!!!
                </div>
            </div>
            <div class="row mt-7">
                <div class="col-lg-3">
                    <div class="list sticky-top mb-4">
                        <h5 class="h3 text-primary pb-2 list__title mb-5">分類</h5>
                        <div class="list-group mb-5">
                            <a href="" class="list-group-item list-group-item-action" data-toggle="list" :class="{'active' : visibility == 'all'}" @click.prevent="visibility = 'all'">
                                <i class="fas fa-box mr-3"></i>所有產品
                            </a>
                            <a href="" class="list-group-item list-group-item-action" data-toggle="list" :class="{'active' : visibility == 'Tent'}" @click.prevent="visibility = 'Tent'">
                                <i class="fas fa-home mr-3"></i>帳篷
                            </a>
                            <a href="" class="list-group-item list-group-item-action" data-toggle="list" :class="{'active' : visibility == 'Bag'}" @click.prevent="visibility = 'Bag'">
                                <i class="fas fa-bed mr-3"></i>睡袋
                            </a>
                            <a href="" class="list-group-item list-group-item-action" data-toggle="list" :class="{'active' : visibility == 'Fire'}" @click.prevent="visibility = 'Fire'">
                                <i class="fas fa-fire mr-3"></i>柴火
                            </a>
                            <a href="#" class="list-group-item list-group-item-action" :class="{'active' : visibility == 'Pot'}" @click.prevent="visibility = 'Pot'">
                                <i class="fas fa-utensils mr-3"></i>廚具
                            </a>
                        </div>
                    </div>
                    
                </div>
                <div class="col-lg-9">
                    <div class="row">
                        <div class="col-md-6 col-sm-12 mb-4"  v-for="item in filteredProduct" :key="item.id" >
                            <div class="card h-100">
                                <div class="box">
                                    <img :src="item.imageUrl" class="card-img-top" alt="...">
                                    <div class="title">
                                        <button class="btn more text-white" @click="getProduct(item.id)">
                                            <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
                                            More
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">{{item.title}}</h5>
                                </div>
                                <div class="card-footer">
                                    <div class="d-flex justify-content-between align-items-baseline mt-3">
                                        <div class="h5" v-if="!item.price">{{item.origin_price | currency}}</div>
                                        <del class="h5" v-if="item.price">{{ item.origin_price | currency}}</del>
                                        <div class="h5 text-danger" v-if="item.price">{{ item.price | currency}}</div>
                                    </div>
                                    <button class="btn btn-block btn-primary mt-3" @click='addToCart(item.id)'>
                                        <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination @postPage="getProducts" :pages="pagination"></Pagination>   
                </div>        
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import Navbar from '@/components/Navbar.vue';
import Pagination from '@/components/Pagination.vue';
import { mapGetters , mapActions } from 'vuex';
export default {
    data(){
        return{
            products:[],
            pagination:{},
            product:{},
            visibility: 'all',
        }
    },
    methods:{
        getProducts(page = 1){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
            const vm = this;
            this.$store.dispatch('updateLoading',true) ;
            this.$http.get(api).then(response=>{
                this.$store.dispatch('updateLoading',false) ;
                const temp = response.data.products;
                vm.products = temp.filter(item=>{
                    return item.is_enabled === 1
                })
                console.log(response);
                vm.pagination = response.data.pagination;
            })
        },
        getProduct(id){
            const vm = this;
            vm.$router.push(`/product_detail/${id}`)
        },
        addToCart(id,qty = 1){
            this.$store.dispatch('cartModule/addToCart',{id,qty})
        },
        ...mapActions('cartModule',['getCart'])
    },
    components:{
        Navbar,
        Pagination,
    },
    computed:{
        filteredProduct(){
            if(this.visibility === 'all'){
                return this.products
            }else if(this.visibility === 'Tent'){
                let newProducts = []
                this.products.forEach(item=>{
                    if(item.category === '帳篷'){
                        newProducts.push(item)
                    }
                })
                return newProducts;
            }
            else if(this.visibility === 'Bag'){
                let newProducts = []
                this.products.forEach(item=>{
                    if(item.category === '睡袋'){
                        newProducts.push(item)
                    }
                })
                return newProducts;
            }
            else if(this.visibility === 'Fire'){
                let newProducts = []
                this.products.forEach(item=>{
                    if(item.category === '營火'){
                        newProducts.push(item)
                    }
                })
                return newProducts;
            }
            else if(this.visibility === 'Pot'){
                let newProducts = []
                this.products.forEach(item=>{
                    if(item.category === '廚具'){
                        newProducts.push(item)
                    }
                })
                return newProducts;
            }
        },
        ...mapGetters('cartModule',['cart','loadingItem'])
    },
    created(){
        this.getProducts();
        this.getCart();
    }

}
</script>
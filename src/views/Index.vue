<template>
    <div>
        <header>
            <Navbar :len="cart.carts.length"></Navbar>
            <div class="header__bg d-flex justify-content-center align-items-center">
            <div class="header__intro d-flex justify-content-center align-items-center" data-aos="fade-up">
                <div class="text-center p-5"  >
                <h2 class="header__text">Fireman</h2>
                <h3 class="header__text">享受露營 X 愛上露營</h3>
                </div>
            </div>
            <div class="header__btn" @click="godown">
                <a ><span ></span></a>
            </div>
            </div>
        </header>

        <section class="py-7">
            <div class="container-fluid">
            <div class="row">
                <div class="col-md-5 noGutter__col d-flex flex-column justify-content-center text-center">
                    <div data-aos="fade-right" class="px-7">
                    <h3 class="mb-3 intro__title">露營 X 美學 X 機能</h3>
                    <p class="intro__text">生活於城市的繁忙喧囂中</p>
                    <p class="intro__text">露營能讓你放慢步調</p>
                    <p class="intro__text">沉浸在森林裡的芬多精</p>
                </div>
                </div>
                <div class="col-md-7 noGutter__col">
                <div data-aos="fade-up" class="section__intro">
                </div>
                </div>
            </div>
            </div>
        </section>

        <section class="py-7 section__bg">
            <div class="container-fluid">
            <div class="row">
                <div class="col-md-7 col-10">
                <div class="section__tent"></div>
                </div>
                <div class="col-md-5 d-flex flex-column justify-content-center text-center px-7">
                <div class="section__tent__description">
                    <h2 class="mb-3 section__title">帳篷</h2>
                    <p class="section__text">無論海拔高低，能帶給你溫暖的另一個家</p>
                </div>
                </div>
            </div>
            </div>
        </section>

        <section class="pb-7 mb-4 section__bg">
            <div class="container-fluid">
            <div class="row">
                <div  class="col-md-5 d-flex flex-column justify-content-center text-center px-7">
                <div class="section__chair__description">
                    <h2 class="mb-3 section__title">戶外椅</h2>
                    <p class="section__text">一張好的戶外椅，會讓人離不開它</p>
                </div>
                </div>
                <div class="col-md-7 col-10">   
                    <div class="section__chair"></div>
                </div>
            </div>
            </div>
        </section>

        <section class="hot pb-7" data-aos="fade-up">
            <div class="container">
            <div class="row">
                <div class="col-md-6 col-12">
                <div class="hot__grill hot__item">
                    <div class="hot__text">
                    <button class="btn more text-white">
                        <router-link to="/customer_product">烤具</router-link>
                    </button>
                    </div>
                </div>
                </div>
                <div class="col-md-6 col-12">
                <div class="hot__tool hot__item">
                    <div class="hot__text">
                    <button class="btn more text-white">
                        <router-link to="/customer_product">工具</router-link>
                    </button>
                    </div>
                </div>
                </div>
                <div class="col-md-4 col-12">
                <div class="hot__bag hot__item">
                    <div class="hot__text">
                    <button class="btn more text-white">
                        <router-link to="/customer_product">機能背包</router-link>
                    </button>
                    </div>
                </div>
                </div>
                <div class="col-md-4 col-12">
                <div class="hot__pot hot__item">
                    <div class="hot__text">
                    <button class="btn more text-white">
                        <router-link to="/customer_product">廚具</router-link>
                    </button>
                    </div>
                </div>
                </div>
                <div class="col-md-4 col-12">
                <div class="hot__light hot__item">
                    <div class="hot__text">
                    <button class="btn more text-white">
                        <router-link to="/customer_product">手電筒</router-link> 
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>	 
        <div class="gotop" @click="gotop">
                <i class='fa fa-chevron-up'></i>
        </div> 
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import $ from 'jquery';
import { mapGetters ,mapActions } from 'vuex';
export default {
    data(){
        return {
        }
    },
    methods:{
        gotop(){
            $('html,body').animate({
                scrollTop:0
            },2000);
        },
        godown(){
            let bodyHeight = $('body').height();
            $('html,body').animate({
                scrollTop:bodyHeight
            },6000);
        },
        ...mapActions('cartModule',['getCart'])
    },
    components:{
        Navbar,
        Footer,
    },
    computed:{
        ...mapGetters('cartModule',['cart'])
    },
    created(){
        this.getCart();
    }
}
</script>
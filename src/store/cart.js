import axios from 'axios';

export default ({
    strict: true,
    namespaced: true,
    state:{
        cart:{
            carts:{}
        },
        loadingItem:'',
        product:{},
    },
    actions:{
        updateLoading(context,status){
            context.commit('LOADING',status);
        },
        getCart(context){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            axios.get(api).then(response=>{
                context.commit('PRODUCTS',response.data.data)
            })
        },
        removeCartItem(context,id){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            context.commit('LOADING',true)
            axios.delete(api).then(response=>{
                context.dispatch('getCart');
                context.commit('LOADING',false);
                console.log(response);
            })
        },
        addToCart(context,{id,qty}){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            context.commit('LOADINGITEM',id)
            const cart = {
                product_id: id,
                qty
            }
            axios.post(api,{data: cart}).then(response=>{
                console.log(response);
                context.commit('LOADINGITEM','')
                context.dispatch('getCart',qty);
            })
        },
    },
    mutations:{
        PRODUCTS(state,payload){
            state.cart = payload
        },
        LOADINGITEM(state,payload){
            state.loadingItem = payload;
        },
        PRODUCT(state,payload){
            state.product = payload;
        }
    },
    getters:{
        cart: state => state.cart,
        loadingItem: state => state.loadingItem,
    }
})
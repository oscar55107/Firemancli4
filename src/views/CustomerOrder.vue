<template>
    <div>
        <Navbar></Navbar>
        <Alert></Alert>
        <div class="container mt-8">
            <div class=" my-4">
                    <div class="card text-center h-100">
                        <div class="card-header bg-third">
                            <h4 class="h5  text-primary text-center text-bold">填寫訂購資料</h4>
                        </div>
                        <div class="card-body text-left">
                            <form @submit.prevent="createOrder">
                                <div class="form-group">
                                <label for="useremail">電子郵件</label>
                                <input type="email" class="form-control" name="email" id="useremail"
                                    :class="{'is-invalid':errors.has('email')}"
                                    v-validate="'required|email'"
                                    v-model="form.user.email" placeholder="請輸入Email">
                                <span class="text-danger" v-if="errors.has('email')">
                                    {{errors.first('email')}}
                                </span>
                                </div>
                            
                                <div class="form-group">
                                <label for="username">姓名</label>
                                <input type="text" class="form-control" name="name" id="username"
                                    :class="{'is-invalid': errors.has('name')}"
                                    v-model="form.user.name" v-validate="'required'" placeholder="請輸入姓名">
                                <span class="text-danger" v-if="errors.has('name')">Please Enter Your Name</span>
                                </div>
                            
                                <div class="form-group">
                                <label for="usertel">電話</label>
                                <input type="tel" class="form-control" id="usertel" v-model="form.user.tel"  name="tel"
                                :class="{'is-invalid': errors.has('tel')}"
                                v-validate="'required'" placeholder="請輸入電話">
                                <span class="text-danger" v-if="errors.has('tel')">Please Enter Your Telephone</span>
                                </div>
                            
                                <div class="form-group">
                                <label for="useraddress">地址</label>
                                <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                                    :class="{'is-invalid': errors.has('address')}"
                                    v-validate="'required'"
                                    placeholder="請輸入地址">
                                <span class="text-danger" v-if="errors.has('address')">Address can not empty</span>
                                </div>
                            
                                <div class="form-group">
                                <label for="comment">留言</label>
                                <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message" placeholder="有什麼話想告訴我們?"></textarea>
                                </div>
                                <div class="text-right">
                                <button class="btn btn-danger">建立訂單</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
            <div>
                <div class="card text-center h-100">
                    <div class="card-header text-primary text-bold">
                        Notice
                    </div>
                    <div class="card-body text-left">
                        <form class="form-check">
                            <div class="d-flex flex-column">
                                <div>
                                    <input type="checkbox" class="form-check-input" id="check1">
                                    <label for="check1" class="form-check-label mb-5">
                                        I agree to the shop’s terms of use & privacy policy
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" class="form-check-input" id="check2">
                                    <label for="check2" class="form-check-label ">
                                        Yes, send me email updates and promotions
                                    </label>    
                                </div>
                            </div>
                        </form>
                        <router-link href="#" class="btn btn-primary btn-block mt-7" to="/cart">Back To Cart</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Alert from '@/components/AlertMessage.vue'
export default {
    data(){
        return{
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                },
                message:''
            }
        }
    },
    methods:{
        createOrder(){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
            const order = vm.form;
            this.$validator.validate().then((valid) => {
                if(valid){
                    this.$http.post(url,{ data: order}).then((response) =>{
                        if(response.data.success){
                            vm.$router.push(`/customer_checkout/${response.data.orderId}`);
                        }         
                        vm.isLoading = false;
                    })
                }else{
                    vm.$bus.$emit('message:push','請輸入資料','danger');
                }
            })
        }
    },
    components:{
        Navbar,
        Alert,
    }
}
</script>
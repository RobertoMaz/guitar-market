<script setup>
    import {ref, reactive, onMounted, watch} from 'vue'
    import {db} from './data/guitar'
    import Guitar from './components/Guitar.vue'
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'

    const guitars = ref([])
    const cart = ref([])
    const guitarMain = ref({})

    watch(cart, () => {
        saveLocalStorage()
    }, {
        deep: true
    })
    
    onMounted(() => {
        guitars.value = db
        guitarMain.value = db[3]
        
        const cartStorage = localStorage.getItem('cart')

        if(cartStorage){
            cart.value = JSON.parse(cartStorage)
        }
    })
    
    const addCart = (guitar) => {
        const existProduct = cart.value.findIndex( product => product.id === guitar.id)
        if(cart.value[existProduct]?.quantity >= 5) return
        
        if(existProduct >= 0){
            cart.value[existProduct].quantity++
        } else {
            guitar.quantity = 1
            cart.value.push(guitar)
        }
    }
    
    const clearCart = () => {
        cart.value = []
    }
    
    const decrement = (id) => {
        const index = cart.value.findIndex( product => product.id === id)
        if(cart.value[index].quantity <= 1) return
        cart.value[index].quantity--
    }

    const deleteProduct = (id) => {
        cart.value = cart.value.filter(product => product.id !== id)
    }

    
    const increment = (id) => {
        const index = cart.value.findIndex( product => product.id === id)
        if(cart.value[index].quantity >= 5) return
        cart.value[index].quantity++     
    }
    
    const saveLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cart.value))
    }

</script>

<template>
    <div>
        <Header 
            :cart="cart"
            :guitarMain="guitarMain"
            @increment-quantity="increment"
            @decrement-quantity="decrement"
            @add-cart="addCart"
            @delete-product="deleteProduct"
            @clear-cart="clearCart"
        />
        <main class="container-xl mt-5">
            <h2 class="text-center">Nuestra Colección</h2>
            <div class="row mt-5">
                <Guitar 
                    v-for="guitar in guitars"
                    :key="guitar.id"
                    :guitar="guitar"
                    @add-cart="addCart"
                />
            </div>      
        </main>
        <Footer />
    </div>
</template>

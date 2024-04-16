<script setup>
    import {ref, reactive, onMounted} from 'vue'
    import {db} from './data/guitar'
    import Guitar from './components/Guitar.vue'
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'

    // const state = reactive({
    //     guitar: db
    // })

    const guitars = ref([])
    const carrito = ref([])

    onMounted(() => {
        guitars.value = db
    })

    const agregarCarrito = (guitarra) => {
        const existeProducto = carrito.value.findIndex( producto => producto.id === guitarra.id)
        
        if(existeProducto >= 0){
            carrito.value[existeProducto].cantidad++
        } else {
            guitarra.cantidad = 1
            carrito.value.push(guitarra)
        }
    }
    
    const decrementar = (id) => {
        const existeProducto = carrito.value.findIndex( producto => producto.id === id)
        console.log(id)
    }
    
    const incrementar = (id) => {
        const existeProducto = carrito.value.findIndex( producto => producto.id === id)
        console.log(id)
        
    }


</script>

<template>
    <div>
        <Header 
            :carrito="carrito"
            @incrementar-cantidad="incrementar"
            @decrementar-cantidad="decrementar"
        />
        <main class="container-xl mt-5">
            <h2 class="text-center">Nuestra Colección</h2>

            <div class="row mt-5">
            <Guitar 
                    v-for="guitar in guitars"
                    :key="guitar.id"
                    :guitar="guitar"
                    @agregar-carrito="agregarCarrito"
            />
            </div>
                
        </main>
        <Footer />
    </div>
</template>

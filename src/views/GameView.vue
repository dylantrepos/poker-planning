<template>
    <main>
        <div>
            Game view
        </div>
    </main>
</template>

<script setup lang="ts">
    import { useRoute } from "vue-router";


    const router = useRoute();
    const pageId = router.params.id;

    console.log('ID : ', pageId);


</script>
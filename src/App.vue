<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';
import { useThemeStore, useDialogStore, useNotificationStore, useLanguageStore } from 'v-dashkit/stores'
import AppLayoutLoading from 'v-dashkit/loading/AppLayoutLoading'
import { useDialog } from 'primevue/usedialog';
import AppNotification from '@/components/base/AppNotofication.vue'
// import AppLayoutLoading from '@/components/loading/AppLayoutLoading.vue';
import { useToast } from 'primevue/usetoast';
import DynamicDialog from 'primevue/dynamicdialog';

const dialog = useDialog();
const toast = useToast();

const notificationStore = useNotificationStore()
const languageStore = useLanguageStore()
const loading = ref(true)
const themeStore = useThemeStore()
const dialogStore = useDialogStore()

languageStore.init()
themeStore.init()
notificationStore.init(toast)
dialogStore.init(dialog)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
</script>

<template>
  <RouterView />
  <div class="app-loading" v-if="loading">
    <AppLayoutLoading></AppLayoutLoading>
  </div>
  <DynamicDialog />
  <AppNotification />
</template>
 

<style>
.app-loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: var(--color-background);
  display: flex;
  z-index: 3;
  justify-content: center;
  align-items: center;
}
</style>
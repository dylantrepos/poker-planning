<template>
    <div v-if="props.isLoggedIn">
      <slot></slot>
    </div>
    <RoomErrorItem v-else :does-room-exists="doesRoomExists" >
      <JoinRoomItem @submit-join-room="onSubmitJoinRoom" />
    </RoomErrorItem>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import JoinRoomItem from './JoinRoomItem.vue';
import RoomErrorItem from './RoomErrorItem.vue';
import { checkRoomExists } from '@/utils/room';
import type { UserInfo } from '@/types/UserType';

type Props = {
  isLoggedIn: boolean;
}

const props = defineProps<Props>();

const doesRoomExists = ref(false);

const emit = defineEmits<{
    (e: 'submitJoinRoom', userData: UserInfo): void
  }>()

onBeforeMount( async () => {
    const roomExists = await checkRoomExists();

    doesRoomExists.value = roomExists;
  })

const onSubmitJoinRoom = async (userInfoData: UserInfo): Promise<void> => {
  emit('submitJoinRoom', userInfoData)
}

</script>
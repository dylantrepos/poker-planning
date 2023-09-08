<template>
   <div v-if="doesRoomExists">
        <JoinRoomItem @submit-join-room="onSubmitJoinRoom" :room-id="roomId"/>
    </div>
    <div v-else>
        <RoomErrorItem />
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import JoinRoomItem from './JoinRoomItem.vue';
import RoomErrorItem from './RoomErrorItem.vue';
import { checkRoomExists } from '@/utils/room';
import type { UserInfo } from '@/types/UserType';

type Props = {
  roomId: string;
}

const props = defineProps<Props>();

const doesRoomExists = ref(false);

const emit = defineEmits<{
    (e: 'submitJoinRoom', userData: UserInfo): void
  }>()

onBeforeMount( async () => {
    const roomExists = await checkRoomExists(props.roomId);

    doesRoomExists.value = roomExists;
  })

const onSubmitJoinRoom = async (userInfoData: UserInfo): Promise<void> => {
  emit('submitJoinRoom', userInfoData)
}

</script>
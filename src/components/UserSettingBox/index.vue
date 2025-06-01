<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import { useRequest } from 'alova'
import { ElMessage } from 'element-plus'
import { Select, CloseBold, EditPen } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useCachedStore } from '@/stores/cached'
import { SexEnum, IsYetEnum } from '@/enums'
import apis from '@/services/apis'
import { judgeClient } from '@/utils/detectDevice'

const client = judgeClient()

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const editName = reactive({
  isEdit: false,
  tempName: '',
  saving: false,
})

const userStore = useUserStore()
const cachedStore = useCachedStore()

const userInfo = computed(() => userStore.userInfo)

watchEffect(() => {
  if (value.value) {
    userStore.getUserDetailAction()
  }
})

// 更新缓存里面的用户信息
const updateCurrentUserCache = (key: 'name' , value: any) => {
  const currentUser = userStore.userInfo.uid && cachedStore.userCachedList[userStore.userInfo.uid]
  if (currentUser) {
    currentUser[key] = value // 更新缓存里面的用户信息
  }
}

// 编辑用户名
const onEditName = () => {
  editName.isEdit = true
  editName.tempName = userInfo.value.name || ''
}

// 确认保存用户名
const onSaveUserName = async () => {
  if (!editName.tempName || editName.tempName.trim() === '') {
    ElMessage.warning('用户名不能为空哦~')
    return
  }
  if (editName.tempName === userInfo.value.name) {
    ElMessage.warning('用户名和当前一样的哦~')
    return
  }
  editName.saving = true

  await apis.modifyUserName(editName.tempName).send() // 更改用户名
  userStore.userInfo.name = editName.tempName // 更新用户信息里面的用户名
  updateCurrentUserCache('name', editName.tempName) // 更新缓存里面的用户信息
  // 重置状态
  onCancelEditName()

}
// 确认保存用户名
const onCancelEditName = async () => {
  editName.saving = false
  editName.isEdit = false
  editName.tempName = ''
}
</script>

<template>
  <ElDialog
    class="setting-box-modal"
    v-model="value"
    :width="client === 'PC' ? 580 : '85%'"
    :close-on-click-modal="false"
    center
  >
    <div class="setting-box">
      <div class="setting-avatar-box">
        <ElAvatar
          size="large"
          class="setting-avatar"
          :src="
            userInfo?.avatar ||
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          "
        />
        <el-icon
          size="20"
          color="var(--font-main)"
          class="setting-avatar-sex"
          v-if="userInfo.sex && [SexEnum.MAN, SexEnum.REMALE].includes(userInfo.sex)"
          :style="{
            backgroundColor: `var(${
              userInfo.sex === SexEnum.MAN ? '--avatar-sex-bg-man' : '--avatar-sex-bg-female'
            })`,
          }"
        >
          <IEpFemale v-if="userInfo.sex === SexEnum.MAN" />
          <IEpMale v-if="userInfo.sex === SexEnum.REMALE" />
        </el-icon>
      </div>

      <div class="setting-name">
        <div class="name-edit-wrapper" v-show="editName.isEdit === false">
          <span class="user-name">
            {{ userInfo.name || '-' }}
          </span>
          <el-tooltip
            class="box-item"
            effect="dark"
            placement="right"
          >
            <el-button
              class="name-edit-icon"
              size="small"
              :class=" 'pointer' "
              :icon="EditPen"
              circle
              @click="onEditName"
            />
          </el-tooltip>
        </div>
        <div class="name-edit-wrapper" v-show="editName.isEdit">
          <ElInput type="text" v-model="editName.tempName" maxlength="6" />
          <el-button
            class="name-edit-icon"
            size="small"
            type="primary"
            :icon="Select"
            circle
            @click="onSaveUserName"
          />
          <el-button
            class="name-edit-icon"
            size="small"
            type="danger"
            :icon="CloseBold"
            circle
            @click="onCancelEditName"
          />
        </div>
      </div>

      <el-alert
        class="setting-tips"
        title="Tips: Chat名称不允许重复，快来抢占"
        type="warning"
        :closable="false"
      />
    
    </div>
  </ElDialog>
</template>

<style lang="scss" src="./styles.scss" scoped />

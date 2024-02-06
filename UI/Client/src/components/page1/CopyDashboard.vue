<template>
    <div class="modal" tabindex="-1" data-bs-backdrop="static" role="dialog" ref="dialogRef">
        <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ t('messages.copy_dashboard') }}</h5>
                </div>
                <div class="modal-body">

                    <div class="mt-2">
                        <div class="mb-2">{{ t('messages.data_type') }}</div>                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="onOk">
                        {{ t('messages.ok') }}
                    </button>
                    <button type="button" class="btn btn-secondary" @click="onCancel">
                        {{ t('messages.cancel') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Modal } from 'bootstrap';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { DxValidator, DxCustomRule } from "devextreme-vue/validator";
import { DxCheckBox, DxSelectBox } from 'devextreme-vue';
import notify from 'devextreme/ui/notify';


export default defineComponent({
    components: {  DxCheckBox, DxCustomRule, DxValidator, DxSelectBox },
    emits: ["ok", "cancel", "dashboard-copied"],
    props: {
        copiedDashboard: {
            type: String,
            required: true
        },
        isUserDashboard: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, expose }) {

        const { t } = useI18n();

        const dialogRef = ref();

        /**
         * Ref for the input box
         */
        const fileNameInputRef = ref();


        /**
         * Modal object created from the dialogRef
         */
        let dialog: Modal;

        /**
         * Check if dashboard name is valid
         */
        const isValidName = ref(true);




        /**
         * New name of copied dashboard
         */
        const name = ref("");


        onMounted(() => {
            dialog = new Modal(dialogRef.value);
        });

        /**
         * Even handler executed on opening dialog by clicking on copy button
         */
        async function open() {
            dialog.show();
            isValidName.value = true;
            validateDashboardName();
        }

        /**
         * Click event handler executed on clicking ok button
         */
        function onOk(e: any) {
            // validate dashboard name  
            validateDashboardName();
            copyDashboard()
        }

        /**
         * Copy dashboard and update pinia store
         */
        async function copyDashboard() {
            if (isValidName.value) {
                try {               
                    notify({ message: (t('messages.dashboard_copied', { name: props.copiedDashboard, newName: name.value })) }, "success", 1500);
                }
                catch (error: any) {
                    notify(t('messages.dashboard_copy_failed'), "error", 1500);
                }
                closeModal();
            }
        }

        /**
         * Click event handler executed on clicking cancel button
         */
        function onCancel() {
            closeModal();
            isValidName.value = true;
            emit("cancel");
        }

        /**
         * Hide dialog
         */
        function closeModal() {
            dialog.hide();
            name.value = "";
            isValidName.value = true;
        }

        /**
         * Modify blacklist based on change in checkbox value
         */
        function validateDashboardName() {
            isValidName.value = true;
            fileNameInputRef.value.validateText(name.value);
        }

        expose({ open });

        return {
            t,
            dialogRef,
            isValidName,
            fileNameInputRef,
            name,
            validateDashboardName,
            open,
            onOk,
            onCancel
        };
    },
});
</script>

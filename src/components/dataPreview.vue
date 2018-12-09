<template>
    <tr>
        <td>{{ dataItem.type }}</td>
        <td v-if="!onEditMode">{{ dataItem.topic_name }}</td>
        <td v-else><input type="text" v-model="topicName" @input="editName"></td>
        <td :class="{'bold': dataItem.doc_num < 200}">{{ dataItem.doc_num }}
            <div class="min-amount" v-if="dataItem.doc_num < 200"><img src="../assets/disable.png"/> (need a 200 minimum) <span>add Documents</span></div>
        </td>
        <td>
            <input type="checkbox" id="action-checkbox">
            <label for="action-checkbox"><i class="fas fa-ellipsis-v"></i></label>
            <div class="action-icons">
                <button @click="alertMsg" :disabled="dataItem.type !== '1'"> <img src="../assets/print.png"> </button>
                <button @click="onEditMode = !onEditMode" :disabled="dataItem.type !== '2'"> <img src="../assets/edit.png"> </button>
                <button disabled> <img src="../assets/tag.png"> </button>
                <button @click="deleteRow" :disabled="dataItem.type !== '3'"> <img src="../assets/delete.png"> </button>
            </div>
        </td>
    </tr>
</template>

<script>
import dataService from '@/services/dataService.js';
export default {
    props: ['dataItem'],
    data() {
        return {
            topicName: '',
            onEditMode: false
        }
    },
    methods: {
        alertMsg() {
            alert()
        },
        editName() {
            dataService.editData(this.dataItem.topic_name, this.topicName)
        },
        deleteRow() {
            dataService.deleteRow(this.dataItem.topic_name)
        }
    }
};
</script>

<style lang="scss" scoped>
td {
    border-top: 1px solid #dddddd;
    text-align: left;
    padding: 7px;
    div {
        display: inline-block;
        font-size: 10px;
        img {
            width: 14px;
            height: 14px;
        }
        span {
            font-size: 8px;
        }
    }
}
.bold {
    font-weight: bold;
}
#action-checkbox, label {
    display: none;
}
img {
    width: 15px;
    height: 15px;
}
button {
    cursor: pointer;
    background-color: white;
    border: none;
}
button:disabled,
button[disabled] {
  cursor: not-allowed;

}
@media only screen and (max-width: 650px) {
    label {
        display: block;
    }
    .action-icons {
        display: flex;
        flex-direction: column;
        position: absolute;
        transform: scaleY(0);
        transform-origin: top;
        transition: 0.5s;
        opacity: 0;
        z-index: 3;
    }
    #action-checkbox:checked ~ .action-icons {
        transform: scaleY(1);
        opacity: 1;
    }
    .min-amount {
        display: none;
    }
}
</style>


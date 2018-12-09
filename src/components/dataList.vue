<template>
    <section>
        <div class="filter-container">
            <input type="text" placeholder="Search Topic Name" v-model="filter"/>
            <div>
                <button class="export-btn">Export All</button>
                <span>view by:</span>
                <input type="radio" id="topics"/>
                <label for="topics">topics</label>
                <input type="radio" id="documents"/>
                <label for="documents">topics</label>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Topic Name <span class="sort" @click="sortByName = !sortByName">&#9660;</span></th>
                    <th>Positive Training Documents</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <data-preview
                    v-for="dataItem in dataToDisplay"
                    :key="dataItem.doc_name"
                    :dataItem="dataItem"
                ></data-preview>
            </tbody>
        </table>
    </section>
</template>

<script>
import dataService from '@/services/dataService.js';
import dataPreview from './dataPreview';

export default {
    data() {
        return {
            dataItems: [],
            filter: '',
            sortByName: false
        };
    },
    created() {
        this.dataItems = dataService.getData();
    },
    computed: {
        dataToDisplay() {
            let dataItems = this.dataItems.filter(dataItem => {
                return dataItem.topic_name
                    .toLowerCase()
                    .includes(this.filter.toLowerCase());
            });
            if (this.sortByName) {
                dataItems = dataItems.sort((a, b) => {
                    if (a.topic_name < b.topic_name) {
                        return -1;
                    }
                    if (a.topic_name > b.topic_name) {
                        return 1;
                    }
                    return 0;
                });
            }
            return dataItems;
        }
    },
    components: {
        dataPreview
    }
};
</script>

<style lang="scss" scoped>
section {
    width: 90%;
    .filter-container {
        display: flex;
        justify-content: space-between;
        margin: 5px 0;
        .export-btn {
            background-color: #74c5dc;
            border-radius: 5px;
            border: none;
            padding: 5px;
            margin-right: 10px;
            color: white;
        }
        input {
            padding: 3px;
            border-radius: 3px;
            border: 0.5px solid rgb(209, 209, 209);
        }
        span {
            font-weight: bold;
        }
    }
    table {
        width: 100%;
        border-collapse: collapse;
        th {
            border-top: 1px solid #dddddd;
            text-align: left;
            padding: 7px;
        }
        thead {
            tr {
                border-bottom: 3px solid #74b9da;
            }
            .sort {
                cursor: pointer;
            }
        }
    }
}
</style>

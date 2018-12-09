
function getData() {
    var obj = require('../data.json');
    return obj.data

}

function editData(topicName, newTopicName) {
    let data = require('../data.json').data
    let currItem = data.find(item => {

        return item.topic_name === topicName
    })
    currItem.topic_name = newTopicName
}

function deleteRow(topicName) {
    let data = require('../data.json').data
    let itemIdx = data.findIndex(item => {
        return item.topic_name === topicName
    })
    data.splice(itemIdx, 1)

}


export default {
    getData,
    editData,
    deleteRow
}

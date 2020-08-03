import axios from 'axios'

// initial state
const state = {
    userId: '',
    selectedClass: 'Business',
    clothingClasses: ['Business','Casual'],
    itemList: []
}

const getters = {

}

const mutations = {
    setUserId(state, id) {
        state.userId = id;
    },
    setClothingClass(state, clothingClass) {
        state.selectedClass = clothingClass;
    },
    addClothingClass(state, newClothingClass) {
        for (let i=0; i < newClothingClass.length; i++) {
            if (!state.clothingClasses.includes(newClothingClass) && (newClothingClass !== null) && (newClothingClass !== undefined)) {
                state.clothingClasses.push(newClothingClass[i]);
            }
        }
    },
    setItemList(state, newItemList) {
        state.itemList = newItemList;
    }
};

const actions = {
    modifyUserId: (context, userId) => {
        context.commit('setUserId', userId)
    },
    getItemList: async (context,params) => {

        axios.post("http://127.0.0.1:4000/myItems",params)
        .then(response => {
            context.commit('setItemList', response.data.data);
        }).catch(error => {
            // console.log(error.response)
            state.itemList = error
        });

    },  
    changeClothingClass: function(context, clothingClass) {
        context.commit('setClothingClass', clothingClass);
    },
    addToClothingClass: function(context, newClassType) {
        context.commit('addClothingClass',newClassType);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
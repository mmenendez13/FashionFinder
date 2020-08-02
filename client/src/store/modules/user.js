// initial state
const state = {
    selectedClass: 'Business',
    clothingClasses: ['Business','Casual'],
}

const getters = {

}

const mutations = {
    setClothingClass(state, clothingClass) {
        state.selectedClass = clothingClass;
    },
    addClothingClass(state, newClothingClass) {
        if (!state.clothingClasses.includes(newClothingClass) && (newClothingClass !== null) && (newClothingClass !== undefined)) {

            for (let i=0; i < newClothingClass.length; i++) {
                state.clothingClasses.push(newClothingClass[i]);
            }

        }
    },
};

const actions = {
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
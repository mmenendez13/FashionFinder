// initial state
const state = {
    user: null,
    userId: null,
    isAuthenticated: false,
}
const getters = {

}

const mutations = {
    setClothingClass(state, clothingClass) {
        state.clothingClass = clothingClass;
    },
    addClothingClass(state, newClothingClass) {
        if (!state.clothingClasses.includes(newClothingClass)) {
            state.clothingClasses.push(newClothingClass);
        }
    }
}

const actions = {
    changeClothingClass: function(context, clothingClass) {
        context.commit('user/setClothingClass', clothingClass);
    },
    addToClothingClass: function(context, newClassType) {
        context.commit('addClothingClass',newClassType);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
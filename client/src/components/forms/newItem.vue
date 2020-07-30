<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Clothing type:"
                label-for="input-1"
            >
                <b-form-select
                    placeholder="Select the item type"
                    id="input-1"
                    v-model="form.selected" 
                    :options="clothingTypes"
                    required
                ></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-2" label="Description:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.description"
                    required
                    placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Compatible with:" label-for="input-3">
                <b-row>
                    <b-column v-for="card in cards" :key="card.label" style="margin:5px">
                        <card :source="card.source" :text="card.label"></card>
                    </b-column>
                </b-row>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    <b-card class="mt-3" header="Form Result">
        <pre class="m-0">{{ form }}</pre>
    </b-card>
</div>
</template>

<script>
import card from '@/components/card.vue'

    export default {
        data() {
            return {
                cards: [
                    {
                        label: "one",
                        source: require('@/assets/img/Clueless.jpg'),
                    },
                    {
                        label: "two",
                        source: require('@/assets/img/Closet.jpg')
                    },
                                        {
                        label: "two",
                        source: require('@/assets/img/Closet.jpg')
                    }
                ],
                form: {
                    selected: '',
                    description: '',
                    food: null,
                    checked: []
                },
                clothingTypes: ['Shirt', 'Pants', 'Dress'],
                show: true
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault()
                alert(JSON.stringify(this.form))
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.selected = ''
                this.form.description = ''

                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        },
        components: {
            card
        }
    }

</script>
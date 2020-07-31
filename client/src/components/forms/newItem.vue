<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="item-type"
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

            <b-form-group id="description" label="Description:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.description"
                    required
                    placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="modifiers" label="Attributes" label-for="input-2">
                <colorPicker v-model="form.color"/>
                <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0" v-model="form.plaid">Plaid</b-form-checkbox>
                <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0" v-model="form.stripes">Stripes</b-form-checkbox>
            </b-form-group>
            <!--<b-form-group id="input-group-3" label="Compatible with:" label-for="input-3">

                <b-row>
                    <b-column v-for="card in cards" :key="card.label" style="margin:5px">
                        <card :source="card.source" :text="card.label"></card>
                    </b-column>
                </b-row>
            </b-form-group>-->


            <b-button type="submit" variant="primary">Submit</b-button>
            <div class="divider"/>
            <b-button type="reset" variant="danger">Reset</b-button>
            <br>
            {{this.form}}
        </b-form>
</div>
</template>

<script>
import card from '@/components/card.vue'
import colorPicker from '@/components/forms/colorPicker.vue'

import axios from 'axios'

    export default {
        data() {
            return {
                form: {
                    selected: '',
                    description: '',
                    plaid: false,
                    stripes: false,
                    color: '000000'
                },
                clothingTypes: ['Shirt', 'Pants', 'Dress'],
                show: true
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault()
                alert(JSON.stringify(this.form))
                this.submitForm(this.form)
            },
            async submitForm() {
                axios.post("http://127.0.0.1:4000/newItem",this.form)
                .then(response => {
                    this.response = JSON.stringify(response)
                }).catch(error => {
                    console.log(error.response)
                });
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
            },
        },
        components: {
            card,
            colorPicker
        }
    }

</script>
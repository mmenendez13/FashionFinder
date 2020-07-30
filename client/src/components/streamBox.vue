<template>
	 <div class="boxshadow">
	    <h2>{{name}}</h2>
	    <hr>
	   	<p><span style="font-weight:bold">Value:</span> {{value}} </p>
        <p><span style="font-weight:bold">IP:</span> {{ip}}</p>
		<canvas id="chart" style="width:100%; height:100px;"></canvas>
    </div>
</template>

<script>
import Vue from 'vue'
import smoothie from 'smoothie'
// Object.defineProperty(Vue.prototype, '$smoothie', { value: smoothie });

export default {
	data: function(){
		return {
			series: new smoothie.TimeSeries()
		}
	},
	model: {
		prop: 'values',
		event: 'change'
	},
	props: {
		name: {
			required: true,
			default: ''
		},
		values: {
			type: [Array],
			required: true,
			default: ['']
		},
		ip: {
			type: String,
			required: false,
			default: '0.0.0.0'
		}
	},
	watch: {
		value: function(newVal){
			// this.series.append(new Date().getTime(), newVal)
		}
	},
	methods: {
		initChart: function(){
			// Find the canvas
			var canvas = document.getElementById('chart');

			// Create the chart
			var chart = new smoothie.SmoothieChart({
				responsive: true,
				millisPerPixel:50,
				interpolation:'step',
				maxValueScale:1.5,
				minValueScale:1.5,
				grid:{
					strokeStyle:'transparent',
					verticalSections:0
				}
			});
			chart.addTimeSeries(this.series, {strokeStyle: 'rgba(0, 255, 0, 1)'});
			chart.streamTo(canvas, 500);
			this.todo()
		},
		todo: function(){  
		    this.intervalid1 = setInterval(() => {
				this.series.append(new Date().getTime(), this.value)
		    }, 500);
		}
	},
	computed: {
		chartData: {
			get: function() {
				let data = [['X','Y'],[0,0]]
				for(let i=0; i < this.values.length; i++){
					data.push([i, this.values[i]])
				}
				console.log(data)
				return data
			}
		},
		value: {
			get: function(){
				return this.values[this.values.length-1]
			}
		}
	},
	mounted(){
		this.initChart()
	}
}

</script>

<style scoped>

.boxshadow {
    position: relative;
    -moz-box-shadow: 1px 2px 4px rgba(0, 0, 0,0.5);
    -webkit-box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    padding: 20px;
    background: white;
}

h2 {
    text-align: center;
    font-weight: bold;
    font-size: 2em;
}
.canvaswidth{
	width:100% !important;
}
</style>
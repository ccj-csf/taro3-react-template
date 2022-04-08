// eslint-disable-next-line no-undef
Component({
	properties: {
		// a-16-notice | a-24-bed | a-24-shower | a-24-wifi | a-32-clock | a-16-notice1 | a-24-bed1 | a-24-airConditionersvg | a-24-shower1 | a-24-wifi1 | a-32-clock1 | chuangjianren | fangda | cuiban | daochu | biaoqian | fenlei | guanzhuren | biaojiwancheng | guidang
		name: {
			type: String,
		},
		// string | string[]
		color: {
			type: null,
			observer: function (color) {
				this.setData({
					colors: this.fixColor(),
					isStr: typeof color === 'string',
				})
			},
		},
		size: {
			type: Number,
			value: 18,
			observer: function (size) {
				this.setData({
					// eslint-disable-next-line no-undef
					svgSize: (size / 750) * wx.getSystemInfoSync().windowWidth,
				})
			},
		},
	},
	data: {
		colors: '',
		// eslint-disable-next-line no-undef
		svgSize: (18 / 750) * wx.getSystemInfoSync().windowWidth,
		quot: '"',
		isStr: true,
	},
	methods: {
		fixColor: function () {
			var color = this.data.color
			var hex2rgb = this.hex2rgb

			if (typeof color === 'string') {
				return color.indexOf('#') === 0 ? hex2rgb(color) : color
			}

			return color.map(item => {
				return item.indexOf('#') === 0 ? hex2rgb(item) : item
			})
		},
		hex2rgb: function (hex) {
			var rgb = []

			hex = hex.substr(1)

			if (hex.length === 3) {
				hex = hex.replace(/(.)/g, '$1$1')
			}

			hex.replace(/../g, color => {
				rgb.push(parseInt(color, 0x10))
				return color
			})

			return 'rgb(' + rgb.join(',') + ')'
		},
	},
})

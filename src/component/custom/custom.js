import Vue from 'vue'

Vue.component('general-input', {
    props: ['required', 'name', 'value', 'classname', 'disabled'],
    template: `
        <div class="input">
            <label >
                <span :class="[{required:required},classname]">{{ name }}:</span>
                <div>
                    <input :disabled="disabled" type="text" value="test" ref="input"
                        :value="value"
                        @input="updateValue($event.target.value)"/>
                </div>
            </label>
        </div>`,
    methods: {
        // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
        updateValue: function(value) {
            var formattedValue = value
                // 删除两侧的空格符
                .trim()
                // 如果值不统一，手动覆盖以保持一致
            if (formattedValue !== value) {
                this.$refs.input.value = formattedValue
            }
            // 通过 input 事件发出数值
            this.$emit('input', Number(formattedValue))
        }
    }
})



<template>
	<view class="lz-numinput lz-row lz-jc--between lz-ai--stretch" :class="['lz-numinput__skin--' + skin,{'lz-numinput--hidebtn':!!hideBtnDisabled,'hastap':hasTap}]">
		<view class="lz-numinput__btnbox lz-numinput__btnbox--down lz-cc" :class="[{'lz-numinput__btnbox--disabled' : disabledMin}]">
			<view @tap="btntap" data-type="down" class="lz-numinput__btn lz-cc" :style="btnStyle" :class="['lz-numinput__btn--' + btnTheme]">
				<view class="lz-numinput__icon lz-iconfont lz-icon-jianhao"></view>
			</view>
		</view>
		<view class="lz-numinput__inputbox lz-item lz-col lz-jc--center lz-ai--center" :style="inputStyle">
			<input type="digit" class="lz-numinput__input lz-item lz-row lz-jc--center lz-ai--center" @longpress="inputlongtap"
			 @change="inputchange" :name="inputName" :value="inputValue" :disabled="if_disabled_input" v-show="if_show_num" />
		</view>
		<view class="lz-numinput__btnbox lz-numinput__btnbox--up lz-cc" :class="[{'lz-numinput__btnbox--disabled' : disabledMax}]">
			<view @tap="btntap" data-type="up" class="lz-numinput__btn lz-cc" :style="btnStyle" :class="['lz-numinput__btn--' + btnTheme]">
				<view class="lz-numinput__icon lz-iconfont lz-icon-jiahao"></view>
			</view>
		</view>
	</view>
</template>

<script>
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

const toNumberInput = v => {
  const num = Number(v);
  if (isNaN(num)) {
    return 0;
  }

  if (!/^(-?\d+)(\.\d+)?$/.test(num) || num.length > 16) {
    return 0;
  }

  return num;
};

const getValidValue = (value, min, max, toFixed) => {
  let val = Number(value);
  if (isNaN(val)) {
    val = 0;
  }

  val = Number(val.toFixed(toFixed));
  if (val < min) {
    val = min;
  }

  if (val > max) {
    val = max;
  }

  return val;
};
export default {
  name: 'lz-numinput',
  props: {
    /* 控件使用ID 相同组件useId都不可雷同 */
    useId: {
      type: String,
      default: 'lz-numinput'
    },

    value: {
      type: [Number, String],
      default: 0
    },

    min: {
      type: [Number, String],
      default: -MAX_SAFE_INTEGER
    },
    max: {
      type: [Number, String],
      default: MAX_SAFE_INTEGER
    },
    // 步长
    step: {
      type: [Number, String],
      default: 1
    },
    // 小数位
    toFixed: {
      type: [Number, String],
      default: 0
    },

    // 允许键盘输入
    inputEnabled: {
      type: Boolean,
      default: false
    },
    // 输入域 name 可以在父form 中获取值
    inputName: {
      type: String,
      default: 'numinput'
    },

    // 输入域 自定义  输入域 的样式
    inputStyle: {
      type: String,
      default: ''
    },
    // 加减 按钮 自定义 按钮 的样式
    btnStyle: {
      type: String,
      default: ''
    },
    // 按钮风格  1 - 实心；2 - 镂空
    btnTheme: {
      type: [String, Number],
      default: ''
    },

    // 皮肤样式  1 - 方形圆角 ；2 - 圆形；
    skin: {
      type: [String, Number],
      default: ''
    },
    // 当按钮不可操作时 - 是否隐藏按钮
    hideBtnDisabled: {
      type: Boolean,
      default: false
    },
    // 是否 隐藏初始值 0  - 一般用于 商品列表 快速向购物车添加商品
    hideNumZero: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      inputValue: 0,
      disabledMin: false,
      disabledMax: false,
      hasTap: false,
      allowInput: false
    };
  },
  computed: {
    if_show_num() {
      if (!!this.hideNumZero && this.inputValue == 0) {
        return false;
      }
      return true;
    },
    if_disabled_input() {
      return !(this.inputEnabled && this.allowInput);
    }
  },
  watch: {
    value(v, o_v) {
      if (v != o_v) {
        this.updated(v, true, true);
      }
    },
    min(v, o_v) {
      if (v != o_v) {
        this.updated(this.value, true, true);
      }
    },
    max(v, o_v) {
      if (v != o_v) {
        this.updated(this.value, true, true);
      }
    }
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.updated(this.value, true, true);
    },
    /**
     * 更新值
     */
    updated(value, condition = true, callChange = false) {
      const min = this.min;
      const max = this.max;
      const old_value = this.inputValue;

      let toFixed = Number(this.toFixed);
      if (toFixed < 0) {
        toFixed = 0;
      }
      const inputValue = getValidValue(value, min, max, toFixed);
      const disabledMin = inputValue <= min;
      const disabledMax = inputValue >= max;

      // 更新数值，判断最小或最大值禁用 按钮
      if (condition) {
        this.inputValue = inputValue;
        this.disabledMin = disabledMin;
        this.disabledMax = disabledMax;
      }

      // 触发事件
      if (callChange) {
        this.emitCall('change', {
          newVal: inputValue,
          oldVal: old_value
        });
      }
    },
    /**
     * 数字计算函数
     */
    calculation(type) {
      const step = Number(this.step);
      const inputValue = Number(this.inputValue);
      if (type === 'up') {
        if (this.disabledMax) return false;
        this.updated(inputValue + step, true, true);
      }

      if (type === 'down') {
        if (this.disabledMin) return false;
        this.updated(inputValue - step, true, true);
      }
    },
    /**
     * 当键盘输入时
     */
    inputchange(e) {
      const value = toNumberInput(e.detail.value);
      this.allowInput = false;
      this.updated(value, true, true);
    },

    /* 长按 输入域 */
    inputlongtap(e) {
      if (!!this.inputEnabled) {
        this.allowInput = true;
      } else {
        this.allowInput = false;
      }
    },

    /* 点击 加减 按钮 */
    btntap(e) {
      const { type } = e.currentTarget.dataset;
      this.hasTap = true;
      this.allowInput = false;
      this.calculation(type);
    },
    emitCall(code, opts = {}) {
      switch (code) {
        case 'change':
          if (opts.newVal != opts.oldVal) {
            this.$emit(
              'change',
              {
                value: opts.newVal,
                useId: this.useId,
              }
            );
          }

          break;
      }
    }
  }
};
</script>

<style lang="less">
// @import '../lzui/less/fn.less';
@config-color-bg-primary: #fa5012;
@config-color-bg-light: #ffffff;

@config-color-text-primary: #fa5012;
@config-color-text-light: #ffffff;

.lz-item {
  flex: 1;
}

.lz-row {
  /* 横向盒子 */
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
}

.lz-col {
  /* 纵向盒子 */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
}

.lz-jc {
  /* 主轴排列方式 */
  &--start {
    justify-content: flex-start;
  }

  &--end {
    justify-content: flex-end;
  }

  &--center {
    justify-content: center;
  }

  &--between {
    justify-content: space-between;
  }

  &--around {
    justify-content: space-around;
  }
}

.lz-ai {
  /* 交叉轴排列方式 */
  &--start {
    align-items: flex-start;
  }

  &--end {
    align-items: flex-end;
  }

  &--center {
    align-items: center;
  }

  &--baseline {
    align-items: baseline;
  }

  &--stretch {
    align-items: stretch;
  }
}
.lz-cc {
  /* 子元素水平垂直居中 */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.lz-numinput {
  position: relative;

  &__icon {
    padding: 6upx;
    line-height: 1 !important;
  }

  &__inputbox {
    margin: 0 10upx;

    input {
      height: 100% !important;
      line-height: 1;
      vertical-align: middle;
    }
  }

  &__input {
    min-width: 32upx;
    appearance: none;
    text-align: center;
    font-size: inherit !important;
  }

  &__btn {
    &--1 {
      // 实心
      background-color: @config-color-bg-primary;
      color: @config-color-text-light;
      border-width: 2upx;
      border-style: solid;
      border-color: @config-color-bg-primary;
    }

    &--2 {
      // 镂空
      background-color: @config-color-bg-light;
      color: @config-color-text-primary;
      border-width: 2upx;
      border-style: solid;
      border-color: @config-color-text-primary;
    }
  }

  &__skin {
    &--1 {
      .lz-numinput__btn {
        border-radius: 8upx;
      }
    }

    &--2 {
      .lz-numinput__btn {
        border-radius: 50%;
      }
    }
  }

  &__btnbox--disabled {
    opacity: 0.3;
  }
}

/* 特殊状态处理 */

.lz-numinput--hidebtn {
  &.hastap {
    .lz-numinput__btnbox {
      transition: all 0.4s linear;
    }
  }

  .lz-numinput__btnbox {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
    visibility: visible;
  }

  .lz-numinput__btnbox--disabled {
    visibility: hidden;
    opacity: 0;

    &.lz-numinput__btnbox--up {
      transform: translateX(-200%) rotate(90deg);
    }

    &.lz-numinput__btnbox--down {
      transform: translate3d(200%, 0, 0) rotate(-180deg);
    }
  }
}
</style>

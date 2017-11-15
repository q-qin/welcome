<template>
	<div>
  <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2001;">
    <transition name="msgbox-bounce">
      <div class="mint-msgbox" v-show="value">
        <div class="mint-msgbox-header" v-if="title !== ''">
          <div class="mint-msgbox-title">{{ title }}</div>
        </div>
        <div class="mint-msgbox-content" v-if="message !== ''">
          <div class="mint-msgbox-message" v-html="message"></div>
        </div>
        <div class="mint-msgbox-btns">
          <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
          <button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
  <div class="v-modal" style="z-index: 2000;"></div>
  </div>
</template>

<style>
  @component-namespace mint {
    @component msgbox {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      background-color: #fff;
      width: 85%;
      border-radius: 3px;
      font-size: 16px;
      -webkit-user-select: none;
      overflow: hidden;
      backface-visibility: hidden;
      transition: .2s;

      @descendent header {
        padding: 15px 0 0;
      }

      @descendent content {
        padding: 10px 20px 15px;
        border-bottom: 1px solid #ddd;
        min-height: 36px;
        position: relative;
      }

      @descendent input {
        padding-top: 15px;
        & input {
          border: 1px solid #dedede;
          border-radius: 5px;
          padding: 4px 5px;
          width: 100%;
          appearance: none;
          outline: none;
        }
        & input.invalid {
          border-color: #ff4949;
          &:focus {
            border-color: #ff4949;
          }
        }
      }

      @descendent errormsg {
        color: red;
        font-size: 12px;
        min-height: 18px;
        margin-top: 2px;
      }

      @descendent title {
        text-align: center;
        padding-left: 0;
        margin-bottom: 0;
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }

      @descendent message {
        color: #999;
        margin: 0;
        text-align: center;
        line-height: 36px;
      }

      @descendent btns {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 40px;
        line-height: 40px;
      }

      @descendent btn {
        line-height: 35px;
        display: block;
        background-color: #fff;
        flex: 1;
        margin: 0;
        border: 0;

        &:focus {
          outline: none;
        }

        &:active {
          background-color: #fff;
        }
      }

      @descendent cancel {
        width: 50%;
        border-right: 1px solid #ddd;
        &:active {
          color: #000;
        }
      }

      @descendent confirm {
        color: #26a2ff;
        width: 50%;
        &:active {
         color: #26a2ff;
        }
      }
    }
  }

  .msgbox-bounce-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }
  .msgbox-bounce-leave-active {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
  }
</style>

<script type="text/babel">
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';

  export default {

    props: {
      modal: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      inputType: {
        type: String,
        default: 'text'
      }
    },

    computed: {
      confirmButtonClasses() {
        let classes = 'mint-msgbox-btn mint-msgbox-confirm ' + this.confirmButtonClass;
        if (this.confirmButtonHighlight) {
          classes += ' mint-msgbox-confirm-highlight';
        }
        return classes;
      },
      cancelButtonClasses() {
        let classes = 'mint-msgbox-btn mint-msgbox-cancel ' + this.cancelButtonClass;
        if (this.cancelButtonHighlight) {
          classes += ' mint-msgbox-cancel-highlight';
        }
        return classes;
      }
    },

    methods: {
      doClose() {
        this.value = false;
        this._closing = true;

        this.onClose && this.onClose();

        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
      },

      handleAction(action) {
        var callback = this.callback;
        this.value = false;
        callback(action);
      },
    },

    watch: {
    },

    data() {
      return {
        title: '',
        message: '',
        type: '',
        value:'',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        callback: null
      };
    }
  };
</script>

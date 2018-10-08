
<template>

  <div class="noise-editor container-fluid">
    <div>
      <form class="form-inline noise-name-form">
        <div class="input-group flex-grow-1">
          <div class="input-group-prepend">
            <span class="input-group-text character" :class="[noise.color]">{{ character | title }}</span>
          </div>
          <input type="text" class="form-control" v-model="noiseName" @focus="disableNoises" @blur="enableNoises">
        </div>
      </form>
      <form>
        <label for="">Color</label>
        <div class="form-check form-check-inline">
          <label for="color-white" class="check-wrap white">
            <input class="form-check-input" type="radio" name="color-white" id="color-white" value="white" v-model="noise.color">
            <span></span>
          </label>
          <label for="color-red" class="check-wrap red">
            <input class="form-check-input" type="radio" name="color-red" id="color-red" value="red" v-model="noise.color">
            <span></span>
          </label>
          <label for="color-orange" class="check-wrap orange">
            <input class="form-check-input" type="radio" name="color-orange" id="color-orange" value="orange" v-model="noise.color">
            <span></span>
          </label>
          <label for="color-yellow" class="check-wrap yellow">
            <input class="form-check-input" type="radio" name="color-yellow" id="color-yellow" value="yellow" v-model="noise.color">
            <span></span>
          </label>
          <label for="color-green" class="check-wrap green">
            <input class="form-check-input" type="radio" name="color-green" id="color-green" value="green" v-model="noise.color">
            <span></span>
          </label>
          <label for="color-turqoise" class="check-wrap turqoise">
            <input class="form-check-input" type="radio" name="color-turqoise" id="color-turqoise" value="turqoise" v-model="noise.color">
            <span></span>
          </label>
          <label for="color-blue" class="check-wrap blue">
            <input class="form-check-input" type="radio" name="color-blue" id="color-blue" value="blue" v-model="noise.color">
            <span></span>
          </label>
          <label for="color-royal" class="check-wrap royal">
            <input class="form-check-input" type="radio" name="color-royal" id="color-royal" value="royal" v-model="noise.color">
            <span></span>
          </label>
          <label for="color-purple" class="check-wrap purple">
            <input class="form-check-input" type="radio" name="color-purple" id="color-purple" value="purple" v-model="noise.color">
            <span></span>
          </label>
        </div>
      </form>
      <div class="form-group">
        <label for="volume-setting">Volume ({{Math.floor(noise.volume)}})</label>
        <input type="range" class="form-control-range" id="volume-setting" v-model="noise.volume">
      </div>
      <div class="form-group">
        <label for="rate-setting">Playback Speed (x{{noise.rate/100}})</label>
        <input type="range" class="form-control-range" id="rate-setting" max="400" min="50" v-model="noise.rate">
      </div>
    </div>
    <div>
      <form class="toggles">
        <div class="form-check">
          <input name="loop-setting" type="checkbox" class="form-check-input" v-model="noise.loop">
          <label for="loop-setting" class="form-check-label">
            Loop
          </label>
        </div>
        <div class="form-check">
          <input name="solo-setting" type="checkbox" class="form-check-input" v-model="noise.solo">
          <label for="solo-setting" class="form-check-label">
            Solo
          </label>
        </div>
        <div class="form-check">
          <input name="global-stop-setting" type="checkbox" class="form-check-input" v-model="noise.globalStop">
          <label for="global-stop-setting" class="form-check-label">
            Global Stop
          </label>
        </div>
      </form>
      <button class="btn btn-primary" v-on:click="saveSettings()">
        Save Settings
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "noise-editor",
  props: ["noise", "character"],

  data: function() {
    return {
      settingsInitialized: false,
      noiseName: ""
    };
  },

  watch: {
    noise: {
      immediate: true,
      handler: function(newValue, oldValue, thing) {
        if (newValue) {
          this.noiseName = `${newValue.name}`;
        }
      }
    }
  },

  methods: {
    ...mapActions(["disableNoises", "enableNoises"]),
    saveSettings: function() {
      this.$emit("save-settings", {
        key: this.character,
        name: this.noiseName
      });
    }
  }
};
</script>

<style lang="scss" scoped="true">
@import "../styles/variables";

.noise-editor {
  width: 380px;
  margin: auto auto 1rem;
  height: 240px;
  box-shadow: $standard-shadow;
  border: 1px solid $shadow;
  padding: 1rem;
  display: flex;
  justify-content: space-between;

  .noise-name-form {
    @mixin characterColor($color) {
      background-color: lighten($color, 32%);
    }

    .character {
      font-weight: bold;
      color: $black;
      background-color: $white;
      &.red {
        @include characterColor($key-red);
      }
      &.orange {
        @include characterColor($key-orange);
      }
      &.yellow {
        @include characterColor($key-yellow);
      }
      &.green {
        @include characterColor($key-green);
      }
      &.turqoise {
        @include characterColor($key-turqoise);
      }
      &.blue {
        @include characterColor($key-blue);
      }
      &.royal {
        @include characterColor($key-royal);
      }
      &.purple {
        @include characterColor($key-purple);
      }
    }
  }

  .noise-name-form {
    align-items: space-between;
    margin-bottom: 0.5rem;
  }

  @mixin checkColor($color) {
    & > span {
      background-color: lighten($color, 32%);
      border-color: $color;
    }
  }

  .toggles {
    .form-check {
      margin-bottom: 0.5rem;
    }
  }

  .form-group {
    margin-bottom: 0.5rem;
  }

  .form-check-inline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  label.check-wrap {
    line-height: 0.3rem;
    &:last-of-type {
      margin-right: 0;
    }

    & > span {
      content: "";
      display: inline-block;
      width: 1rem;
      height: 1rem;
      box-sizing: border-box;
      border: 1px solid;
      border-radius: 50%;
    }

    .form-check-input[type="radio"] {
      display: none;

      &:checked ~ span {
        border-width: 0.3rem;
      }
    }

    &.red {
      @include checkColor($key-red);
    }

    &.orange {
      @include checkColor($key-orange);
    }

    &.yellow {
      @include checkColor($key-yellow);
    }

    &.green {
      @include checkColor($key-green);
    }

    &.turqoise {
      @include checkColor($key-turqoise);
    }

    &.blue {
      @include checkColor($key-blue);
    }

    &.royal {
      @include checkColor($key-royal);
    }

    &.purple {
      @include checkColor($key-purple);
    }
  }
}
</style>
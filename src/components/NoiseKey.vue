
<template>

  <div class="key noise-key" v-bind:class="[color, { active: pressed }]">
    <div class="key-body" v-on:click="checkClick()">

      <div class="playback-marker" v-for="percentage in playbackPercentages" :key="percentage" :style="'width:' + percentage + '%'">
      </div>

      <span class="character">{{ character | title }}</span>

      <span v-if="noise" class="noise-name">{{ noise.name }}</span>
      <small v-else class="soft-text">empty</small>

      <div class="spinner" :class="{active: noise && noise.loading}"></div>

    </div>
  </div>

</template>

<script>
import { mapState } from "vuex";
import { Howler } from "howler";
import { KEY_MAP } from "../const";

export default {
  name: "noise-key",

  props: ["character", "noise"],

  data: function() {
    return {
      pressed: false,
      playbackPercentages: [],
      color: ""
    };
  },

  watch: {
    noise: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.setColor(newVal);
        if (newVal) {
          this.playbackPercentages = newVal.playbackPercentages;
        } else {
          this.playbackPercentages = [];
        }
      }
    }
  },

  created: function() {
    this.setColor(this.noise);
    document.addEventListener("keydown", this.checkPress);
    document.addEventListener("keyup", this.checkRelease);
  },

  destroyed: function() {
    document.removeEventListener("keydown", this.checkPress);
    document.removeEventListener("keyup", this.checkRelease);
  },

  computed: {
    ...mapState({
      disableNoises: state => state.disableNoises
    })
  },

  methods: {
    setColor: function(noise) {
      if (noise) {
        this.color = noise.color;
      } else {
        this.color = "";
      }
    },

    checkClick: function() {
      if (this.noise) {
        this.$emit("noise-clicked", this.character);
      }
    },

    checkPress: function(event) {
      if (!this.disableNoises) {
        const keyPressed = event.keyCode === KEY_MAP[this.character];
        const shift = event.shiftKey;

        if (keyPressed) {
          this.pressed = true;
        }

        if (shift && this.pressed) {
          this.stopNoise();
        } else if (this.pressed) {
          this.playNoise();
        }
      }
    },

    checkRelease: function(event) {
      if (event.keyCode === KEY_MAP[this.character]) {
        this.pressed = false;
      }
    },

    playNoise: function() {
      if (this.noise) {
        this.noise.play();
      }
    },

    stopNoise: function() {
      if (this.noise) {
        this.noise.stop();
      }
    }
  }
};
</script>


<style lang="scss" scoped="true">
@import "../styles/variables";

.key-body {
  .playback-marker {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.05;
    z-index: 0;
  }

  .spinner {
    position: absolute;
    bottom: 0.2rem;
    left: 0.2rem;
  }
}
</style>
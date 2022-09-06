export default {
  name: 'colorable',

  props: {
    color: String,
    dark: Boolean,
    light: Boolean
  },

  data () {
    return {
      defaultColor: null
    };
  },

  computed: {
    computedColor () {
      return this.color || this.defaultColor;
    }
  },

  methods: {
    addBackgroundColorClassChecks (obj = {}, color = this.computedColor) {
      const classes = Object.assign({}, obj);

      if (color) {
        classes[color] = true;
      }

      return classes;
    },
  }
};

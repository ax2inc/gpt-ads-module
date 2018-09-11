export default {
  name: '<%= options.componentName %>',
  data: () => ({
    adSlot: null,
  }),
  props: {
    adUnit: {
      type: String,
      required: true,
    },
    size: {
      type: [Array, String],
      required: true,
    },
    sizeMapping: {
      type: Array,
      required: false,
      default: () => [],
    },
    id: {
      type: [Number, String],
      required: false,
      default: () => Math.random().toString(36).substring(5),
    },
  },
  computed: {
    networkCode() {
      const { $gptAds } = this;
      return $gptAds ? $gptAds.networkCode : null;
    },
    adUnitPath() {
      const { networkCode, adUnit } = this;
      return `/${networkCode}/${adUnit}`;
    },
    divId() {
      const { id } = this;
      return `div-gpt-ad-${id}-0`;
    },
  },
  methods: {
    /**
     * Formats a given size to make it compatible with GPT
     * If size is an Array, it is returned as is
     * If size is a string, it is formatted so that 123x456 becomes [123, 456]
     *
     * @param      {Array,string}  size    The size
     * @return     {Array} Formatted size
     */
    formatSize(size) {
      if (Array.isArray(size)) {
        return size;
      }
      if (typeof size === 'string') {
        return size.split('x').map(value => parseInt(value, 10));
      }
      return [];
    },
    /**
     * Formats a given list of sizes to make it compatible with GPT API
     * If sizesList is an Array, it is returned as is
     * If sizesList is a string, it is formatted so that
     * 123x456,654x321 becomes [[123, 456], [654, 321]]
     *
     * @param      {Array,string}  sizesList  The sizes
     * @return     {Array} Formatted sizes list
     */
    formatSizeList(sizesList) {
      if (Array.isArray(sizesList)) {
        return sizesList;
      }
      if (typeof sizesList === 'string') {
        return sizesList
          .split(',')
          .map(size => this.formatSize(size));
      }
      return [];
    },
  },
  mounted() {
    if (!googletag) {
      return;
    }
    const {
      adUnitPath,
      divId,
      sizeMapping,
    } = this;

    // Init Ad slot
    googletag.cmd.push(() => {
      const adSlot = googletag
        .defineSlot(adUnitPath, this.formatSize(this.size), divId)
        .addService(googletag.pubads());

      // Build size mapping if any
      if (sizeMapping.length > 0) {
        const mapping = googletag.sizeMapping();
        sizeMapping.forEach((size) => {
          const browserSize = this.formatSize(size[0]);
          const adSizes = this.formatSizeList(size[1]);
          mapping.addSize(browserSize, adSizes);
        });
        adSlot.defineSizeMapping(mapping.build());
      }

      this.adSlot = adSlot;
      this.$gptAds.slots.push(adSlot);
      googletag.display(divId);
    });
  },
  beforeDestroy() {
    if (!googletag) {
      return;
    }
    // Destroy ad slot
    googletag.cmd.push(() => {
      const destroyed = googletag.destroySlots([this.adSlot]);
    });
  },
  render(h) {
    const { divId } = this;
    return h('div', {
      attrs: {
        id: divId,
      },
      domProps: { innerHTML: '' },
    });
  },
};

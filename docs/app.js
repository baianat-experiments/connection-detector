const BOnline = {
  name: 'b-online',
  props: ['is-online'],
  template: `<span :class="{ 'app__status': true, 'is-online': isOnline, 'is-offline': !isOnline }">{{ isOnline ? 'Online' : 'Offline' }}</span>`,
};

new Vue({
  el: '#app',
  components: {
    BOnline
  },
  data: {
    isOnline: true
  },
  mounted () {
    this.$down = new Down();
    this.isOnline = !this.$down.isDown;
    this.$down.on('online', () => {
      this.isOnline = true;
    });
    this.$down.on('offline', () => {
      this.isOnline = false;
    })
  }
});

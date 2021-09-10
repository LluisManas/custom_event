const EventBus = new Vue();

const inputComponent = {
  template: `<input class="input is-small" type="text" :placeholder="placeholder" v-model="input" @keyup.enter="monitorEnterKey"/>`,
  props: ["placeholder"],
  data() {
    return {
      input: "",
    };
  },
  methods: {
    monitorEnterKey() {
      EventBus.$emit("add-note", {
        data: {
          note: this.input,
          timestamp: new Date().toLocaleString(),
        },
      });
      this.input = "";
    },
  },
};
const noteCountComponent = {
  template: `
  <div class="note-count">Note Count: <strong>{{ noteCount }}</strong></div>`,
  data() {
    return {
      noteCount: 0,
    };
  },
  created() {
    EventBus.$on("add-note", (event) => this.noteCount++);
  },
};

new Vue({
  el: "#app",
  data() {
    return {
      notes: [],
      timestamps: [],
      placeholder: "Enter a note",
    };
  },
  created() {
    EventBus.$on("add-note", (event) => this.addNote(event));
  },
  methods: {
    addNote(event) {
      this.notes.push(event.data.note);
      this.timestamps.push(event.data.timestamp);
    },
  },
  components: {
    "input-component": inputComponent,
    "note-count-component": noteCountComponent,
  },
});

import mitt, { Emitter } from "mitt";

const emitter: Emitter<Record<string, unknown>> = mitt();

export default emitter;

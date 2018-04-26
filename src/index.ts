import { SimpleDirectDemocracyBackend } from "./start";

const simpleDirectDemocracyBackend: SimpleDirectDemocracyBackend = new SimpleDirectDemocracyBackend();

simpleDirectDemocracyBackend.start({ port: 3000 });

import { db, hget, keys, hsetnx } from "../index";

export const createProposal = ({ title, text, ip }) => {
  hsetnx(title, "text", text);
  hsetnx(title, "ip", ip);
  return {
    title: keys(title).then(title => title[0]),
    text: hget(title, "text").then(text => text),
    ip: hget(title, "ip").then(ip => ip)
  };
};

import { rest } from "msw";
import data from "./data.json";

export const handlers = [
  rest.get(`/hkj`, (req, res, ctx) => {
    return res(ctx.status(500), ctx.json(data));
  }),
];

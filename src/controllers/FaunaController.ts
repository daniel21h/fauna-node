import { Request, Response } from 'express';
import { query as q } from 'faunadb';

import { fauna } from '../services/fauna';

interface IResponse {
  ref: any;
  ts: number;
  data: {
    name: string;
    email: string;
  };
}

class FaunaController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      // await fauna.query(
      //   q.CreateIndex({
      //     name: 'list_all',
      //     source: q.Collection('users'),
      //   }),
      // );

      const { data } = await fauna.query<any>(
        q.Map(
          q.Paginate(q.Match(q.Index('list_all'))),
          q.Lambda('X', q.Get(q.Var('X'))),
        ),
      );

      return response.json(data);
    } catch (err) {
      return response.json(err);
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email } = request.body;

      const { data } = await fauna.query<IResponse>(
        q.Create(q.Collection('users'), {
          data: {
            name,
            email,
          },
        }),
      );

      return response.json(data);
    } catch (err) {
      return response.json(err);
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    try {
      const users = await fauna.query(
        q.Get(q.Ref(q.Collection('users'), '300830522268975619')),
      );

      return response.json(users);
    } catch (err) {
      return response.json(err);
    }
  }
}

export { FaunaController };

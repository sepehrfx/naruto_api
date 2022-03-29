import { FastifyInstance } from 'fastify'

import * as t from 'io-ts'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { getNinja, getTeam, getTeams } from '~/handlers/teams'

import { validatorCompiler } from '~/services/request_validator'
import { paginationCodec, PaginationType } from '~/types/pagination'
import { idCodec, kebabCaseCodec } from '~/types/params'

type TeamParam = {
  team: string
}

const paramsType = t.type({
  team: t.union([idCodec, kebabCaseCodec]),
})

type ParamsType = t.TypeOf<typeof paramsType>

export const routes = async (app: FastifyInstance): Promise<FastifyInstance> =>
  app
    .get<
      {
        Querystring: PaginationType
      },
      unknown,
      t.Type<PaginationType>
    >(
      '/',
      {
        schema: {
          querystring: paginationCodec,
        },
        validatorCompiler: validatorCompiler(),
      },
      (req, reply) => {
        pipe(
          getTeams(reply, { limit: parseInt(req.query.limit ?? '15'), offset: parseInt(req.query.offset ?? '0') }),
          TE.map(teams => reply.send(teams)),
          TE.mapLeft(err => reply.send(err))
        )()
      }
    )
    .get<{ Params: TeamParam }, unknown, t.Type<ParamsType>>(
      '/:team',
      {
        schema: {
          params: paramsType,
        },
        validatorCompiler: validatorCompiler(),
      },
      (req, reply) => {
        pipe(
          getTeam(reply, req.params.team),
          TE.map(team => reply.send(team)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
    .get<{ Params: TeamParam }, unknown, t.Type<ParamsType>>(
      '/:team/ninjas',
      {
        schema: {
          params: paramsType,
        },
        validatorCompiler: validatorCompiler(),
      },
      (req, reply) => {
        pipe(
          getNinja(reply, req.params.team),
          TE.map(ninjas => reply.send(ninjas)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
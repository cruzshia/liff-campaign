import ajax from '@src/utils/ajax'
import { IncomingEstimationType } from '@reducer/bodygram/bodygramModel'
export const getEstimationAjax = (
  rid: string
): Promise<HTTPResponse<IncomingEstimationType>> =>
  ajax.get(`/bodygram/estimation?rid=${rid}`)

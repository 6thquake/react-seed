import createApi from '../../../util/createApi';
import {
  domains
} from "../../../config/domain";

export default createApi(domains.common, {
  locale: 'dictionary/queryResourceI18n'
})
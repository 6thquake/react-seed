import createApi from '../../../utils/createApi';
import {
  domains
} from "../../../../config/domain";

export default createApi(domains.common, {
  locale: 'dictionary/queryResourceI18n'
})
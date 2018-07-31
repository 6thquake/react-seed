import isNil from 'lodash/isNil';
import isString from 'lodash/isString';

export default class Objects {

    static getProperty(ele, propertyName) {
        if (!isString(propertyName)) {
            console.warn("propertyName must be a string.");
            return;
        }

        let pns = propertyName.split("."),
            value = ele;

        while (value && pns.length > 0) {
            value = value[pns.shift()];
        }

        return value;
    }

    static setProperty(ele, propertyName, value) {
        if (isNil(ele)) {
            console.warn("ele must be not null.");
            return;
        }

        if (!isString(propertyName)) {
            console.warn("propertyName must be a string.");
            return;
        }

        let pns = propertyName.split("."),
            ev = ele,
            pn = null,
            pv = null,
            len = pns.length,
            flag = true,
            previousValue;

        for (let i = 0; i < len - 1; i++) {
            pn = pns[i];
            pv = ev[pn];

            if (!pv) {
                ev[pn] = {};
                flag = false;
            }

            ev = ev[pn];
        }

        previousValue = ev[pns[len - 1]];
        ev[pns[len - 1]] = value;

        return flag ? previousValue : null;
    }

    static removeProperty(ele, propertyName) {
        if (isNil(ele)) {
            console.warn("ele must be not null.");
            return;
        }

        if (!isString(propertyName)) {
            console.warn("propertyName must be a string.");
            return;
        }

        let pns = propertyName.split("."),
            ev = ele,
            pn = null,
            pv = null,
            len = pns.length;

        for (let i = 0; i < len - 1; i++) {
            pn = pns[i];
            pv = ev[pn];

            if (!pv) {
                return;
            }

            ev = ev[pn];
        }

        let value = ev[pns[len - 1]];

        delete ev[pns[len - 1]];

        return value;
    }
}
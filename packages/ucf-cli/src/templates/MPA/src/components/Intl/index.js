/**
 * 多语组件
 */

import React, { Component } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import mirror, { connect } from 'mirrorx';
import { getCookie } from "utils";
import Locale from 'bee-locale';
import zhCN from './locales/zh';
import enUS from './locales/en';
import zhTW from './locales/zh_tw';

import tinperZh from 'bee-locale/build/zh_CN';
import tinperTw from 'bee-locale/build/zh_TW';
import tinperEn from 'bee-locale/build/en_US';


addLocaleData([...en, ...zh]);


function chooseLocale(locale) {

    switch (locale) {
        case 'en_US':
            return { tinper: tinperEn, pap: enUS };
        case 'zh_CN':
            return { tinper: tinperZh, pap: zhCN };
        case 'zh_TW':
            return { tinper: tinperTw, pap: zhTW };
        default:
            return { tinper: tinperEn, pap: enUS };
    }
}

console.log('getCookie:', getCookie('u_locale'))
let locale = (getCookie('u_locale') || navigator.language.split('_')[0].replace(/-/, '_') || "en_US")
// let locale = 'zh_TW';
let intlModel = {
    name: "intl",
    initialState: {
        locale: locale,
        localeData: chooseLocale(locale).pap,
        tinperData: chooseLocale(locale).tinper
    },
    reducers: {
        updateState(state, data) {
            return {
                ...state,
                ...data
            };
        }
    }
}

mirror.model(intlModel);




class Inter extends Component {
    render() {
        let { locale, localeData, tinperData } = this.props;

        return (
            <Locale locale={tinperData}>
                <IntlProvider key={locale} locale={locale.replace(/_.+/ig, '')} messages={localeData} >
                    {this.props.children}
                </IntlProvider>
            </Locale>
        )
    }
};

let Intl = connect(state => state.intl)(Inter);


export default Intl;
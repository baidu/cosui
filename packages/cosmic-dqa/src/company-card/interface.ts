/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type {LinkInfo} from '@cosui/cosmic/util/interface';

// normal | standard | intermediate | premium
enum Level {
    normal = 'normal',
    standard = 'standard',
    intermediate = 'intermediate',
    premium = 'premium'
}

export interface CompanyCardProps {

    /**
     * 企业认证等级
     */
    level?: Level;

    /**
     * 名片logo
     */
    logo?: string;

    /**
     * 公司名称
     */
    name?: string;

    /**
     * 法定代表人
     */
    legalPerson?: string;

    /**
     * 注册资本
     */
    registeredCapital?: string;

    /**
     * 标签信息
     */
    tags?: string[];

    /**
     * 整个区域跳转链接
     */
    linkInfo?: LinkInfo | null;
}

export type CompanyCardData = Required<CompanyCardProps>;

interface LevlelInfo {
    bg?: string;
    label?: string;
    tagClass?: string;
    mount?: string;
    logoWordBg?: string;
}

export const LEVELMap: Record<string, LevlelInfo> = {
    normal: {
        bg: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/company-card/normal-bg-1.png',
        mount: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/company-card/normal-logo-mount.png',
        logoWordBg: '#B6C7FA'
    },
    standard: {
        bg: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/company-card/standard-bg-1.png',
        label: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/company-card/standard-label.png',
        mount: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/company-card/standard-logo-mount.png',
        logoWordBg: '#B6C7FA'
    },
    intermediate: {
        bg: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/company-card/intermediate-bg-1.png',
        label: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/company-card/intermediate-label.png',
        mount: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/company-card/intermediate-logo-mount.png',
        logoWordBg: '#B6C7FA'
    },
    premium: {
        bg: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/company-card/premium-bg-1.png',
        label: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/company-card/premium-label.png',
        mount: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/company-card/premium-logo-mount.png',
        tagClass: 'cosd-company-card-box-content-tags-premium',
        logoWordBg: '#FFD799'
    }
};
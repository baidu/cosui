``` san export=preview caption=在线填入v2 Message
import san from 'san';
import Accordion from '@cosui/cosmic/accordion';
import AccordionPanel from '@cosui/cosmic/accordion-panel';
import AudioPlayer from '@cosui/cosmic/audio-player';
import Avatar from '@cosui/cosmic/avatar';
import AvatarGroup from '@cosui/cosmic/avatar-group';
import Badge from '@cosui/cosmic/badge';
import Button from '@cosui/cosmic/button';
import Calendar from '@cosui/cosmic/calendar';
import Cascader from '@cosui/cosmic/cascader';
import Checkbox from '@cosui/cosmic/checkbox';
import CheckboxGroup from '@cosui/cosmic/checkbox-group';
import CitySelector from '@cosui/cosmic/city-selector';
import Comment from '@cosui/cosmic/comment';
import DatePicker from '@cosui/cosmic/date-picker';
import DateTimePicker from '@cosui/cosmic/date-time-picker';
import Dialog from '@cosui/cosmic/dialog';
import Drawer from '@cosui/cosmic/drawer';
import Empty from '@cosui/cosmic/empty';
import Fold from '@cosui/cosmic/fold';
import FoldSwitch from '@cosui/cosmic/fold-switch';
import Icon from '@cosui/cosmic/icon';
import Image from '@cosui/cosmic/image';
import Input from '@cosui/cosmic/input';
import Loading from '@cosui/cosmic/loading';
import Map from '@cosui/cosmic/map';
import Masonry from '@cosui/cosmic/masonry';
import MoreLink from '@cosui/cosmic/more-link';
import Pagination from '@cosui/cosmic/pagination';
import Picker from '@cosui/cosmic/picker';
import Popover from '@cosui/cosmic/popover';
import Price from '@cosui/cosmic/price';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';
import Rank from '@cosui/cosmic/rank';
import RowLanes from '@cosui/cosmic/row-lanes';
import Score from '@cosui/cosmic/score';
import Select from '@cosui/cosmic/select';
import Slider from '@cosui/cosmic/slider';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Switcher from '@cosui/cosmic/switcher';
import Tab from '@cosui/cosmic/tab';
import Table from '@cosui/cosmic/table';
import TabPane from '@cosui/cosmic/tab-pane';
import Tabs from '@cosui/cosmic/tabs';
import Tag from '@cosui/cosmic/tag';
import Textarea from '@cosui/cosmic/textarea';
import TimePicker from '@cosui/cosmic/time-picker';
import Timeline from '@cosui/cosmic/timeline';
import TimelineItem from '@cosui/cosmic/timeline-item';
import Tooltip from '@cosui/cosmic/tooltip';
import Vote from '@cosui/cosmic/vote';

import AvatarBadge from '@cosui/cosmic-card/avatar-badge';
import BubbleScore from '@cosui/cosmic-card/bubble-score';
import CardLoading from '@cosui/cosmic-card/card-loading';
import ImageGroup from '@cosui/cosmic-card/image-group';
import ImageWithTags from '@cosui/cosmic-card/image-with-tags';
import Title from '@cosui/cosmic-card/title';

import Citation from '@cosui/cosmic-dqa/citation';
import AgentCard from '@cosui/cosmic-dqa/agent-card';
import AuthorCard from '@cosui/cosmic-dqa/author-card';
import CarScroll from '@cosui/cosmic-dqa/car-scroll';
import Chart from '@cosui/cosmic-dqa/chart';
import CompanyCard from '@cosui/cosmic-dqa/company-card';
import CompanyGraph from '@cosui/cosmic-dqa/company-graph';
import Comparison from '@cosui/cosmic-dqa/comparison';
import CopyableText from '@cosui/cosmic-dqa/copyable-text';
import DocumentScroll from '@cosui/cosmic-dqa/document-scroll';
import FilmCard from '@cosui/cosmic-dqa/film-card';
import GeneratingView from '@cosui/cosmic-dqa/generating-view';
import GreetingCard from '@cosui/cosmic-dqa/greeting-card';
import HotelCard from '@cosui/cosmic-dqa/hotel-card';
import LocationCard from '@cosui/cosmic-dqa/location-card';
import LocationList from '@cosui/cosmic-dqa/location-list';
import Markdown from '@cosui/cosmic-dqa/markdown';
import MicroContentScroll from '@cosui/cosmic-dqa/micro-content-scroll';
import MusicPlayer from '@cosui/cosmic-dqa/music-player';
import OfficialCard from '@cosui/cosmic-dqa/official-card';
import ProductCard from '@cosui/cosmic-dqa/product-card';
import QuestionGuide from '@cosui/cosmic-dqa/question-guide';
import Relationship from '@cosui/cosmic-dqa/relationship';
import RoutePlanner from '@cosui/cosmic-dqa/route-planner';
import SearchHeader from '@cosui/cosmic-dqa/search-header';
import SearchingOutlines from '@cosui/cosmic-dqa/searching-outlines';
import SearchingSteps from '@cosui/cosmic-dqa/searching-steps';
import ShopAddress from '@cosui/cosmic-dqa/shop-address';
import SiteVcardList from '@cosui/cosmic-dqa/site-vcard-list';
import SiteVcard from '@cosui/cosmic-dqa/site-vcard';
import TagLink from '@cosui/cosmic-dqa/tag-link';
import TransportTicketList from '@cosui/cosmic-dqa/transport-ticket-list';
import TransportTicket from '@cosui/cosmic-dqa/transport-ticket';

import {AppletContext} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';
import {repairJson} from './json-fix.ts';

const COMPONENTS = {
    Accordion,
    AccordionPanel,
    AudioPlayer,
    Avatar,
    AvatarGroup,
    Badge,
    Button,
    Calendar,
    Cascader,
    Checkbox,
    CheckboxGroup,
    CitySelector,
    Comment,
    DatePicker,
    DateTimePicker,
    Dialog,
    Drawer,
    Empty,
    Fold,
    FoldSwitch,
    Icon,
    Image,
    Input,
    Loading,
    Map,
    Masonry,
    MoreLink,
    Pagination,
    Picker,
    Popover,
    Price,
    Radio,
    RadioGroup,
    Rank,
    RowLanes,
    Score,
    Select,
    Slider,
    Swiper,
    SwiperItem,
    Switcher,
    Tab,
    Table,
    TabPane,
    Tabs,
    Tag,
    Textarea,
    TimePicker,
    Timeline,
    TimelineItem,
    Tooltip,
    Vote,
    AvatarBadge,
    BubbleScore,
    CardLoading,
    ImageGroup,
    ImageWithTags,
    Title,
    AgentCard,
    AuthorCard,
    CarScroll,
    Chart,
    Citation,
    CompanyCard,
    CompanyGraph,
    Comparison,
    CopyableText,
    DocumentScroll,
    FilmCard,
    GeneratingView,
    GreetingCard,
    HotelCard,
    LocationCard,
    LocationList,
    Markdown,
    MicroContentScroll,
    MusicPlayer,
    OfficialCard,
    ProductCard,
    QuestionGuide,
    Relationship,
    RoutePlanner,
    SearchHeader,
    SearchingOutlines,
    SearchingSteps,
    ShopAddress,
    SiteVcardList,
    SiteVcard,
    TagLink,
    TransportTicketList,
    TransportTicket
};

const image = 'https://gips1.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248';

// 页面打开时展示较完整的组合效果。
const initialMessage = {
    version: '2.0',
    applet: {
        catalog: CATALOG.definition.$id,
        components: [
            {
                id: 'root',
                type: 'Div',
                children: ['images', 'score', 'product']
            },
            {
                id: 'images',
                type: 'ImageGroup',
                props: {
                    list: [
                        {src: image, alt: '城市风景', linkInfo: {}, span: 6},
                        {src: image, alt: '旅行目的地', linkInfo: {}, span: 6}
                    ],
                    ratio: '3-2',
                    'max-row': 1
                },
                events: {
                    click: [{
                        action: 'sendPrompt',
                        args: {prompt: '点击第 {{$event.index + 1}} 张图片'}
                    }]
                }
            },
            {
                id: 'score',
                type: 'Score',
                props: {value: 4.8, max: 5, score: true}
            },
            {
                id: 'product',
                type: 'ProductCard',
                props: {
                    'link-info': {},
                    thumbnail: image,
                    title: '城市漫游背包',
                    tags: ['轻量', '防泼水'],
                    price: {value: 169, sign: '¥'},
                    caption: '适合周末短途出行',
                    source: '旅行装备推荐'
                }
            }
        ],
        data: {}
    }
};

// 输入框示例使用内置布局组件。
const editorMessage = {
    version: '2.0',
    applet: {
        components: [
            {
                id: 'root',
                type: 'Flex',
                props: {direction: 'column', align: 'center', gap: 8},
                children: ['title', 'score', 'open-url']
            },
            {
                id: 'title',
                type: 'Text',
                props: {value: '城市漫游背包', size: 'lg'}
            },
            {
                id: 'score',
                type: 'Score',
                props: {value: 4.5, max: 5, score: true}
            },
            {
                id: 'open-url',
                type: 'Button',
                props: {appearance: 'secondary', size: 'sm'},
                children: ['button-text'],
                events: {
                    click: [{
                        action: 'openUrl',
                        args: {url: 'https://www.baidu.com'}
                    }]
                }
            },
            {
                id: 'button-text',
                type: 'Text',
                props: {value: '点击 Open'}
            }
        ]
    }
};

export default class V2OnlineDemo extends san.Component {
    static components = {
        'cos-button': Button,
        'cos-textarea': Textarea,
        'cos-switcher': Switcher
    };

    static template = `
        <section>
            <cos-textarea
                value="{= value =}"
                height="{{400}}"
                max-height="{{400}}"
                clear
            >
                <div slot="title">填写 v2 Message（JSON）</div>
            </cos-textarea>
            <div class="cos-flex cos-items-center cos-space-mt-md cos-space-mb-lg" style="gap:16px;white-space:nowrap">
                <span class="cos-flex cos-items-center">
                    <cos-switcher checked="{{autofix}}" size="sm" on-change="changeAutofix"/>
                    <span class="cos-space-ml-xs">autofix</span>
                </span>
                <span class="cos-flex cos-items-center">
                    <cos-switcher checked="{{jsonFix}}" size="sm" on-change="changeJsonFix"/>
                    <span class="cos-space-ml-xs">json fix</span>
                </span>
                <cos-button appearance="primary" on-click="resetAndCreate">
                    清空并创建示例
                </cos-button>
                <cos-button appearance="secondary" on-click="appendData">
                    追加数据
                </cos-button>
            </div>
            <p s-if="action" class="cos-space-mb-md">{{action}}</p>
            <p s-if="error" class="cos-color-text-em" role="alert">{{error}}</p>
            <div class="cos-text-headline cos-space-mb-md">生成效果</div>
            <div s-ref="root"></div>
        </section>
    `;

    initData() {
        return {
            value: JSON.stringify(editorMessage, null, 4),
            autofix: true,
            jsonFix: true,
            action: '',
            error: ''
        };
    }

    attached() {
        this.create(initialMessage);
    }

    changeAutofix({checked}) {
        // autofix 是 Context 级配置，切换后用最近一次创建成功的 Message 重建。
        this.data.set('autofix', checked);
        if (this.lastMessage) {
            this.create(this.lastMessage);
        }
    }

    changeJsonFix({checked}) {
        // json fix 只影响输入文本的解析，下一次创建/追加时生效。
        this.data.set('jsonFix', checked);
    }

    parseMessage() {
        const value = this.data.get('value');
        if (!value) {
            this.data.set('error', '请输入 v2 Message');
            return null;
        }

        const jsonFix = this.data.get('jsonFix');
        try {
            return JSON.parse(jsonFix ? repairJson(value) : value);
        }
        catch (error) {
            this.data.set('error', (jsonFix ? 'JSON 格式错误（json fix 后仍无法解析）：' : 'JSON 格式错误：')
                + error.message);
            return null;
        }
    }

    resetAndCreate() {
        this.clearExample();
        const message = this.parseMessage();
        if (message) {
            this.create(message);
        }
    }

    appendData() {
        const message = this.parseMessage();
        if (!message) {
            return;
        }
        if (!Array.isArray(message.updates)) {
            this.data.set('error', '追加数据需要传入包含 updates 的更新 Message');
            return;
        }
        if (!this.appletContext) {
            this.data.set('error', '请先创建示例');
            return;
        }

        const result = this.appletContext.processMessage(message);
        if (!result.ok) {
            const detail = result.errors.map(item => item.message).join('; ');
            this.data.set('error', result.fixes.length
                ? 'autofix 已尝试：' + result.fixes.join('；') + '。仍报错：' + detail : detail);
            return;
        }
        this.data.set('action', result.fixes.length
            ? '数据已追加，autofix：' + result.fixes.join('；') : '数据已追加');
        this.data.set('error', '');
    }

    clearExample() {
        this.appletContext?.dispose();
        this.appletContext = null;
        this.lastMessage = null;
        const root = this.ref('root');
        if (root) {
            root.textContent = '';
        }
    }

    create(message) {
        this.clearExample();
        try {
            const nextAppletContext = new AppletContext({
                catalog: CATALOG,
                components: COMPONENTS,
                autofix: this.data.get('autofix'),
                actions: {
                    sendPrompt: ({args}) => this.data.set('action', args.prompt),
                    openUrl: ({args}) => console.log('openUrl:', args.url)
                },
                onAppletCreated: applet => applet.setRoot(this.ref('root')),
                onError: error => this.data.set('error', error.message)
            });

            const result = nextAppletContext.processMessage(message);
            if (!result.ok) {
                nextAppletContext.dispose();
                const detail = result.errors.map(item => item.message).join('; ');
                this.data.set('error', result.fixes.length
                    ? 'autofix 已尝试：' + result.fixes.join('；') + '。仍报错：' + detail : detail);
                return;
            }
            this.appletContext = nextAppletContext;
            this.lastMessage = message;
            this.data.set('action', result.fixes.length ? 'autofix：' + result.fixes.join('；') : '');
            this.data.set('error', '');
        }
        catch (error) {
            this.data.set('error', error.message);
        }
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```

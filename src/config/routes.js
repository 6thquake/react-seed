import React from 'react';
import {Link} from "react-router-dom";
import SubRoutes from '../components/RouteWithSubRoutes/SubRoutes';
import asyncComponent from '../components/AsyncComponent';


const GradeModule = asyncComponent(() => import('@pages/performance/config/component/GradeModule/GradeModule'));
const ScoreType = asyncComponent(() => import('@pages/performance/config/component/ScoreType/GettingScoreType'));
const ApproverRule = asyncComponent(() => import('@pages/performance/config/component/ApproverRule/GettingApproverRule'));
const CategoryType = asyncComponent(() => import('@pages/performance/config/component/CategoryType/GettingCategoryType'));
const OrganizeRatio = asyncComponent(() => import('@pages/performance/config/component/OrganizeRatio/GettingOrganizeRatio'));
const Template = asyncComponent(() => import('@pages/performance/config/component/Template/GettingTemplate'));
const ScoreRange = asyncComponent(() => import('@pages/performance/config/component/ScoreRange/GetScoreRange'));

const PartAIndicatorLibrary = asyncComponent(() => import('@pages/performance/indicatorLibrary/partA'));
const PostIndicatorLibrary = asyncComponent(() => import('@pages/performance/indicatorLibrary/postIndicatorLibrary'));
const PartBIndicatorLibrary = asyncComponent(() => import('@pages/performance/indicatorLibrary/partB'));

const MyGoalList = asyncComponent(() => import('@pages/performance/myGoal//List'));

const SubordinateDocs = asyncComponent(() => import('@pages/performance/hisPerformance/List'));

const MyApprovalList = asyncComponent(() => import('@pages/performance/myApproval/List'));

const SelfEvalutionList = asyncComponent(() => import('@pages/performance/selfEvaluation/List'));

const IndicateActivity = asyncComponent(() => import('@pages/performance/manageCenter/indicateActivity'));
const DocsManage = asyncComponent(() => import('@pages/performance/manageCenter/docsManage'));

const DistributionList = asyncComponent(() => import('@pages/performance/distribution/List'));
const DistributionDetail = asyncComponent(() => import('@pages/performance/distribution/Dashboard'));

const DocumentDetail = asyncComponent(() => import('@pages/performance/document/DocumentDetail'));


const ActivityList = asyncComponent(() => import('@pages/performance/progress/ActivityList'));
const Results = asyncComponent(() => import('@pages/performance/progress/Results'));
const Reports = asyncComponent(() => import('@pages/performance/progress/Reports'));

const Form_manage = asyncComponent(() => import('@pages/platform/form/Form'));
const Button_manage = asyncComponent(() => import('@pages/platform/button/Button'));
const Menu_manage = asyncComponent(() => import('@pages/platform/menu/Menu'));
const Resource_internal_manage = asyncComponent(() => import('@pages/platform/resource-internal/Resource_internal'));

export default [
    {
        path: '/performance',
        name: '绩效考核',
        component: SubRoutes,
        routes: [
            {
                path: '/performance/config',
                name: '配置中心',
                component: SubRoutes,
                routes: [
                    {
                        path: '/performance/config/grade',
                        name: <Link to="/performance/config/grade">等级模型</Link>,
                        component: GradeModule,
                    },
                    {
                        path: '/performance/config/score',
                        name: <Link to="/performance/config/score">考核分制</Link>,
                        component: ScoreType,
                    },
                    {
                        path: '/performance/config/category',
                        name: <Link to="/performance/config/category">绩效类型</Link>,
                        component: CategoryType,
                    },
                    {
                        path: '/performance/config/approver',
                        name: <Link to="/performance/config/approver">考核人规则</Link>,
                        component: ApproverRule,
                    },
                    {
                        path: '/performance/config/scope',
                        name: '考核范围',
                        component: ScoreRange,
                    },
                    {
                        path: '/performance/config/template',
                        name: <Link to="/performance/config/template">模板</Link>,
                        component: Template,
                    },
                    {
                        path: '/performance/config/ratio',
                        name: <Link to="/performance/config/ratio">组织系数</Link>,
                        component: OrganizeRatio,
                    },
                ]
            },
            {
                path: '/performance/target',
                name: '指标库首页',
                component: SubRoutes,
                routes: [
                    {
                        path: '/performance/target/part-a',
                        name: <Link to="/performance/target/part-a">PartA指标库</Link>,
                        component: PartAIndicatorLibrary
                    },
                    {
                        path: '/performance/target/job',
                        name: <Link to="/performance/target/job">岗位指标-岗位列表</Link>,
                        component: PostIndicatorLibrary,
                    },
                    {
                        path: '/performance/target/part-b',
                        name: <Link to="/performance/target/job">PartB指标库</Link>,
                        component: PartBIndicatorLibrary,
                    }
                ]
            },
            {
                path: '/performance/manage-center',
                name: '管理中心',
                component: SubRoutes,
                routes: [
                    {
                        path: '/performance/manage-center/activity',
                        name: '绩效活动',
                        component: IndicateActivity
                    },
                    {
                        path: '/performance/manage-center/docs',
                        name: '文档管理',
                        component: DocsManage
                    }
                ]
            },
            {
                path: '/performance/my-goal',
                name: '我的目标',
                component: SubRoutes,
                routes: [
                    {
                        path: '/performance/my-goal/list',
                        name: '目标设定列表',
                        component: MyGoalList
                    }
                ]
            },
            {
                path: '/performance/his-performance',
                name: 'TA的绩效',
                component: SubRoutes,
                routes: [
                    {
                        path: '/performance/his-performance/list',
                        name: '列表',
                        component: SubordinateDocs
                    }
                ]
            },
            {
                path: '/performance/self-evaluation',
                name: '我的考核',
                component: SubRoutes,
                routes: [
                    {
                        path: '/performance/self-evaluation/list',
                        name: '我的考核列表',
                        component: SelfEvalutionList
                    }
                ]
            },
            {
                path: '/performance/approval',
                name: '我的审批',
                component: SubRoutes,
                routes: [
                    {
                        path: '/performance/approval/list',
                        name: '我的审批列表',
                        component: MyApprovalList
                    }
                ]
            },
            {
                path: '/performance/distribution',
                name: '仪表盘',
                component: SubRoutes,
                routes: [
                    {
                        path: '/performance/distribution',
                        name: '强制分布列表',
                        exact: true,
                        component: DistributionList
                    },
                    {
                        path: '/performance/distribution/:id',
                        name: '强制分布详细',
                        component: DistributionDetail
                    }
                ]
            },
            {
                path: '/performance/progress',
                name: '报表',
                component: SubRoutes,
                routes: [
                    {
                        path: '/performance/progress/list',
                        name: '绩效活动列表',
                        exact: true,
                        component: ActivityList,
                    },
                    {
                        name: '绩效结果',
                        path: '/performance/progress/list/Results/:id',
                        component: Results,
                    }, {
                        name: '绩效报表',
                        path: '/performance/progress/list/Reports/:id',
                        component: Reports,
                    }
                ]
            },
            {
                path: '/performance/document',
                name: '我的文档',
                component: SubRoutes,
                routes: [
                    {
                        path: '/performance/document/detail',
                        name: '文档详情',
                        component: DocumentDetail
                    }
                ]
            }
        ]
    },
    {
        path: '/platform',
        name: '系统平台',
        component: SubRoutes,
        routes: [
            {
                path: '/platform/form_manage',
                name: '画面管理',
                component: Form_manage,
            },
            {
                path: '/platform/button_manage',
                name: '按钮管理',
                component: Button_manage,
            },
            {
                path: '/platform/menu_manage',
                name: '菜单管理',
                component: Menu_manage,
            },
            {
                path: '/platform/resource_internal_manage',
                name: '国际化资源管理',
                component: Resource_internal_manage,
            }
        ]
    }
]
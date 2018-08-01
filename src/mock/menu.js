const api = [
    {
        id: '1',
        parentId: '0',
        name: '绩效考核',
        type: 'root',
        path: '/performance',
        routes: [
            {
                id: '2',
                parentId: '1',
                name: '配置中心',
                type: 'node',
                path: '/performance/config',
                routes: [
                    {
                        id: '3',
                        parentId: '2',
                        name: '等级模型',
                        type: 'leaf',
                        path: '/performance/config/list'
                    },
                    {
                        id: '4',
                        parentId: '2',
                        name: '考核分制',
                        type: 'leaf',
                        path: '/performance/config/score',
                    },
                    {
                        id: '6',
                        parentId: '2',
                        name: '绩效类型',
                        type: 'leaf',
                        path: '/performance/config/category',
                    },
                    {
                        id: '7',
                        parentId: '2',
                        name: '组织系数',
                        type: 'leaf',
                        path: '/performance/config/ratio',
                    },
                    {
                        id: '8',
                        parentId: '2',
                        name: '考核范围',
                        type: 'leaf',
                        path: '/performance/config/scope',
                    },
                    {
                        id: '9',
                        parentId: '2',
                        name: '考核人规则',
                        type: 'leaf',
                        path: '/performance/config/approver',
                    },
                    {
                        id: '10',
                        parentId: '2',
                        name: '模板',
                        type: 'leaf',
                        path: '/performance/config/template',
                    },
                    {
                        id: '11',
                        parentId: '2',
                        name: '基础配置',
                        type: 'leaf',
                        path: '/performance/config/base',
                    }
                ]
            },
            {
                path: '/performance/target',
                name: '指标库首页',
                routes: [
                    {
                        path: '/performance/target/part-a',
                        name: 'PartA指标库',
                    },
                    {
                        path: '/performance/target/job',
                        name: '岗位指标-岗位列表',
                        component: '岗位指标-岗位列表',
                    },
                    {
                        path: '/performance/target/part-b',
                        name: 'PartB指标库',
                        component: 'PartB指标库',
                    }
                ]
            },
            {
                path: '/performance/my-goal',
                name: '目标设定',
                routes: [
                    {
                        path: '/performance/my-goal/list',
                        name: '目标设定列表',
                    },
                    {
                        path: '',
                        name: '目前撤回',
                    }
                ]
            },
            {
                path: '/performance/approval',
                name: '目标审批',
                routes: [
                    {
                        path: '/performance/approval/list',
                        name: '目标审批列表'
                    }
                ]
            },
            {

                path: '/performance/self-evaluation',
                name: '我的考核',
                routes: [{
                        path: '/performance/self-evaluation/list',
                        name: '我的自评列表',
                    },
                ]
            },
            {
                path: '/performance/supervisor-evaluation',
                name: '主管考评',
                routes: [{
                        path: '/performance/supervisor-evaluation/list',
                        name: '主管考评列表',
                    },
                ]
            },
            //distribution
            {
                path: '/performance/distribution',
                name: '强制分布',
                routes: [{
                    path: '/performance/distribution/list',
                    name: '强制分布列表',
                }, ]
            },
            {
                path: '/performance/communication-results',
                name: '绩效沟通',
                routes: [
                    {
                        path: '/performance/communication-results/list',
                        name: '绩效沟通结果',
                    },
                ]
            },
            {
                name:'报表',
                path: '/performance/progress',
                routes:[
                    {
                        name:'绩效活动列表',
                        path: '/performance/progress/list'
                    },
                    {
                        name:'绩效结果',
                        path: '/performance/progress/Results'
                    },{
                        name:'绩效报表',
                        path: '/performance/progress/Reports'
                    }
                ]
            },
            {
                path: '/performance/manage-center',
                name: '管理中心',
                routes: [
                    {
                        path: '/performance/manage-center/activity',
                        name: '绩效活动',
                    },
                    {
                        path:'/performance/manage-center/docs',
                        name: '文档管理',
                    },
                ]
            },
        ]
    }
];
export default api;
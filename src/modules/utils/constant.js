export const DOC_STATUS = [
    'D_TargetSet',          // 目标设定
    'D_TargetUpdate',       // 目标修改
    'D_TargetApprival',     // 目标审批
    'D_WaitForAssess',      // 待考核
    'D_SelfAssess',         // 员工自评
    'D_LeaderAssess',       // 主管考评
    'D_WaitToDistribution', // 待分布
    'D_DeptDistribution',   // 部门分布
    'D_Communication',      // 绩效沟通
    'D_Complain',           // 绩效申诉
    'D_Finished',           // 完成
    'D_End',                // 已结束
    'D_Termination'         // 终止
];

export const MODULE_NAME = ['MyTarget', 'MyDocument', 'MyApproval', 'OtherDocument','ManageDocument'];

export const LOCALSTORAGE_KEYS = [
    'ehr.performance.selfComments',
    'ehr.performance.superComments'
];

export const SESSIONSTORAGE_KEYS = ['ehr.menu'];
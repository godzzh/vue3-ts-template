import request from "@/utils/request";

export const getPlanDetailList = (params: any) => {
    return request('/duty-service-provider/taskPlan/planDetailList', {
        method: "POST",
        data:params,
    })
}

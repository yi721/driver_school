import http from "@/utils/request";

//请求首页数据
export const getData = () => {
    //返回应该promise对象
    return http.get('/home/getData')
}
 //登录接口
 export function login(data){
    return service ({
        method:"post",
        url: '/user/login'
    })
 }
  //学生列表删除接口
  export function studentDel(id){
    return service ({
        method:"delete",
        url: '/student/delete/{id}'
    })
 }
  //学生列表删除接口
  export function studentDel(id){
    return service ({
        method:"delete",
        url: '/student/delete/{id}'
    })
 }
 //学生列表删除接口
 export function studentDel(id){
    return service ({
        method:"delete",
        url: '/student/delete/{id}'
    })
 }
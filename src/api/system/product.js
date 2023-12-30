import { request } from "../../utils/request";

export function getList(listQuery){
    return request({
        url: 'index.php/product/product/getlist',
        method: 'get',
        params: listQuery
    })
}

export function getListForSelect(){
    return request({
        url: 'index.php/product/product/getListForSelect',
        method: 'get',
    })
}

export function updateProduct(data){
    return request({
        url: 'index.php/product/product/update',
        method: 'put',
        data: data
    })
}

export function createProduct(data){
    return request({
        url: 'index.php/product/product/create',
        method: 'post',
        data: data
    })
}

export function deleteProduct(id){
    return request({
        url: 'index.php/product/product/delete',
        method: 'delete',
        params:{
            id: id
        }
    })
}

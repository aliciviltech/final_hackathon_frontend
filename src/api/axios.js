import apiClient from ".";

const getReq = async(path)=>{
    try{
        const response = await apiClient.get(path);
        return response;
    } catch(error){
        console.log(error)
    }
}

const getByIdReq = async(path)=>{
    try{
        const response = await apiClient.get(path);
        return response;
    } catch(error){
        console.log(error)
    }
}

const postReq = async(path,data)=>{
    try{
        const response = await apiClient.post(path,data);
        return response;
    } catch(error){
        if(error.response){
            throw new Error(`${error.response?.data.message}`);
        } else{
            throw new Error(`${error.message}`);
        }
    }
}

const deleteReq = async(path)=>{
    try{
        const response = await apiClient.delete(path);
        return response;
    } catch(error){
        throw new Error(`${error.response?.data.message}`);        
    }
}

const putReq = async(path, data)=>{
    try{
        const response = await apiClient.put(path,data);
        console.log(response)
    } catch(error){
        throw new Error(`Error in axios putReq: ${error.response?.data.message}`);        
    }
}
 
export {getReq, postReq, putReq, deleteReq, getByIdReq}
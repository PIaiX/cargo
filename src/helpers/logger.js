const envMode = process.env.NODE_ENV

const logger = (data) => {
    if(envMode === "development"){
        console.log(data)
    }
}

export default logger

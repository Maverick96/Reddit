export const nextPage = (applicationObject,onLoad) => {
    
    //updating previous here and next in onLoad
    let url = applicationObject.url + "after=" + applicationObject.currentResult.data.after
    //storing current result so it can be used 
    applicationObject.previousResults.push(applicationObject.currentResult)
    $.ajax({url : url, success : onLoad})

}

export const previousPage = (applicationObject,onLoad) => {
    
    if(applicationObject.previousResults.length === 0){
        alert("No previous Page Present")
    }
    else {
        let previousResult = applicationObject.previousResults.pop()
        onLoad(previousResult)
    }
}

// module.exports =  {nextPage : nextPage, previousPage : previousPage}
console.log('Client side javascript is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
            console.log(data)
    })
})



const weatherForm=document.querySelector('form')
const message_1=document.querySelector("#message_1")
const message_2=document.querySelector("#message_2")
const getWeatherData=(e)=>{
    
    e.preventDefault()
    message_1.textContent="Loading...."
    message_2.textContent=""
    const city=document.querySelector('input').value
    fetch(`http://localhost:3000/weather?address=${city}`).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                message_1.textContent=""
                message_2.textContent=data.error

            }else{
                message_1.textContent=data.location
                message_2.textContent=data.forecast
            }
            
        })
    })
    
}

weatherForm.addEventListener('submit',(e)=>{
    getWeatherData(e)
})
const weatherForm = document.querySelector('form')
const search=document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    fetch('/weather?address='+location).then((response) =>{

        response.json().then((data) =>{
            if(data.error){
                return messageOne.textContent =data.error
            }
            console.log(data)
            return messageOne.textContent = 'The weather at '+data.Location+' \nLat: '+data.Lat+'\nLong: '+ data.long+'\nThe forecast is '+ data.forecast

        })
    })
    console.log(location)

})
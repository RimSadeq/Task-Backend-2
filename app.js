
const request = require("request")

 const url = "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=yemen"

  request ({url} , (error , response) => {
    //   console.log(response.body)

      const data1 = JSON.parse(response.body)
      console.log(data1)

      console.log(data1.location.name)
      console.log(data1.current.condition.text)

       
  })

////////////////////////////////////////////////////////////////////////////////////////////////////

const url1 = "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=yemen"

request ({url1 , json : true  } , (error , response) => {

    console.log(response.body.location.name)
    console.log(response.body.current.condition.text)

})



 ////////////////////////////////////////////////////////////////////////////////////////////////////////

 const url2 = "http://api.weatherstack.com/current?access_key=aaf8d75230687617eaa10d75e38c7550&query=yemen"

request ({url2 , json : true  } , (error , response) => {

    // console.log(response.body.location.name)
    // console.log(response.body.current.weather_descriptions[0])

    if (error) {
        console.log("ERROR HAS OCCURED")
    } else if (response.body.error){
        console.log(response.body.error.message)
    }else {
        console.log(response.body.location.name ,response.body.current.weather_descriptions[0] )
    }

})
////////////////////////////////////////////////////////////////////////////////////////////////////

const url3 = "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=yemen"

request ({url3 , json : true  } , (error , response) => {

    if (error) {
        console.log("ERROR HAS OCCURED")
    } else if (response.body.error){
        console.log(response.body.error.message)
    }else {
        console.log(response.body.location.name ,response.body.current.condition.text)
    }

})

/////////////////////////////////////////////////////////////////////////////////////////


 

  const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/egypt.json?access_token=pk.yJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw"

  request ({url3 : geocodeUrl , json : true} , (error , response) => {
     
    if (error){
        console.log("unable to connect geocode service")
    }else if (response.body.message)  {
        console.log(response.body.message)
    } else if (response.body.features.length == 0) {
        console.log("Unable to find location")
    } else {
        const longtitude = response.body.features[0].center[0]
        const latitude = response.body.features[0].center[1]
        console.log(latitude , longtitude)
    }
      
  })
  /////////////////////////////////////////////////////////////////////////////////


  const forecast = (latitude , longtitude , callback) => {

const url = "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=" + latitude + "," + longtitude

request ({url , json : true  } , (error , response) => {

    if (error) {
        callback ( "unable to connect weather api service" , undefined )
    } else if (response.body.error){
         callback (response.body.error.message , undefined )
    }else {

         callback (undefined , response.body.location.name + " it is " + response.body.current.condition.text  )
    }
})
  }




    const geocode = ( address , callback) => {

    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address +  ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw"

  request ({url : geocodeUrl , json : true} , (error , response) => {
     
    if (error){
        callback ("unable to connect geocode service" , undefined)
    }else if (response.body.message)  {
        callback (response.body.message , undefined )
    } else if (response.body.features.length == 0) {
         callback("Unable to find location" , undefined)
    } else {

        callback(undefined , {
             longtitude : response.body.features[0].center[0],
             latitude : response.body.features[0].center[1]
        } )
       
    }
  })
}


   
const forecast = require ("./data1/forecast")

const geocode = require("./data1/geocode")



 const country = process.argv[2]


geocode( country , (error , data) => {
    console.log("ERROR : " , error)
    console.log("DATA : "  , data)

    forecast( data.latitude , data.longtitude , (error , data) => {
        console.log("ERROR : " , error)
        console.log("DATA : " , data)
     } )
 })

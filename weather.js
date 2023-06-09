const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{//textbox_input_key
    if(e.key == "Enter" && inputField.value != ""){//если поле не пустое, то пытаемся найти населенный пункт
        requestApi(inputField.value);
        config_dict = get_default_config()
        config_dict['language'] = 'ru'
    }
});

locationBtn.addEventListener("click", () =>{//использовать геолокацию
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Ваш браузер не поддерживает подобные функции");
    }
});

function requestApi(city){//обращение к api openweathermap
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=72b6ae4da4157ffb5d368559b7e8ead0`;
    fetchData();
}

function onSuccess(position){//ищем координаты местности
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=72b6ae4da4157ffb5d368559b7e8ead0`;
    fetchData();
}

function onError(error){//ошибка ввода
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){//отправка запроса на сервер, очень грубо говоря
    infoTxt.innerText = "ищем вашу деревню...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "что-то пошло не так";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){//
    if(info.cod == "404"){//проверка на ошибку поиска
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} это некорректное название города :)`;
    }else{//если успешно
        const city = info.name;//название города
        const country = info.sys.country;//код страны
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);//температура
        weatherPart.querySelector(".weather").innerText = description;//описание
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;//город страна
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);//ощущается как
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;//влажность
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", ()=>{//стрелка назад
    wrapper.classList.remove("active");
});
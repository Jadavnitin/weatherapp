const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const day = document.querySelector("#day");
const todayDate = document.querySelector("#today_date");


const getInfo = async (event) => {
   event.preventDefault();

   let cityVal = cityName.value;

   if (cityVal === "") {
      city_name.innerText = `Plz write the name before search`;
      datahide.classList.add("data_hide");
   } else {

      try {


         let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=dff1291212680fcc72950056f4899999`
         const response = await fetch(url);

         const data = await response.json();
         const arrData = [data];

         city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
         temp_real_val.innerText = arrData[0].main.temp;
         const tempMood = arrData[0].weather[0].main;
         console.log(tempMood);

         //condition to check sunny or cloudy
         if (tempMood == "Clear") {
            temp_status.innerHTML =
               "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
         } else if (tempMood == "Clouds") {
            temp_status.innerHTML =
               "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
         } else if (tempMood == "Rain") {
            temp_status.innerHTML =
               "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
         } else {
            temp_status.innerHTML =
               "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";

         }
         datahide.classList.remove('data_hide');
         cityVal = "";


      } catch {
         cityVal = " ";
         datahide.classList.add("data_hide");
         city_name.innerText = `please enter the proper city name`;
         console.log('please add the proper city name');
      }

   }
}

submitBtn.addEventListener('click', getInfo);


const getCurrentDay = () => {
   const date = new Date();
   const arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   let CurrentDay = arr[date.getDay()];
   return CurrentDay;
}

day.innerHTML=`${getCurrentDay()}`

const getCurrentMonthDay = () => {
   const nowMonthDay = new Date();

   const arrMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

   const month = arrMonth[nowMonthDay.getMonth()];
   const day = nowMonthDay.getDate();

   let CurrentMonthDay = `${day} ${month} `;
   return CurrentMonthDay;
}

todayDate.innerHTML=getCurrentMonthDay()
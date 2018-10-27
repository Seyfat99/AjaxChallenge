// EASY CHALLENGE
Hello = () => {
  $.ajax({
    method: "GET",
    url: "http://api.open-notify.org/astros.json",
    dataType: "json"
  }).done(outputInfo);
};

outputInfo = data => {
  console.log(data);
  let html = "";
  html += `<h2>There are ${data.people.length} people in space</h2>`;

  $.each(data.people, index => {
    html += `<p>${data.people[index].name}, Craft: ${
      data.people[index].craft
    }</p>`;
  });

  $(".easy-challenge__content").html(html);
};
Hello();

// MEDIUM CHALLENGE
(loadWeather = () => {
  const mediumContent = document.querySelector(".medium-challenge__content");

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Charlotte,us&appid=d3baba8ec7ab735669f516bc3659be37&units=imperial";

  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      let html = "";

      html += `<h2>${json.name}</h2>`;
      html += `<p>The temperature is ${json.main.temp} fahrenheit</p>`;
      html += `<p>The sky conditions are ${json.weather[0].description}</p>`;
      html += `<p>Sunrise is at ${new Date(json.sys.sunrise * 1000)}</p>`;
      html += `<p>Sunset is at ${new Date(json.sys.sunset * 1000)}</p>`;

      mediumContent.innerHTML = html;
    });
})(); //IIFE

//MEDIUM 2 CHALLENGE
const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", e => {
  e.preventDefault();
  const userInput = document.getElementById("userInput").value;
  loadWeather(userInput);
});
loadWeather = city => {
  const medium2Content = document.querySelector(".medium2-challenge__content");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d3baba8ec7ab735669f516bc3659be37&units=imperial`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => {
      let html = "";

      html += `<h2>${json.name}</h2>`;
      html += `<p>The temperature is ${json.main.temp} degrees fahrenheit</p>`;

      medium2Content.innerHTML = html;
    })
    .catch(error => console.log(error));
};

//HARD CHALLENGE

const hardContent = document.querySelector(".hard-challenge__content");

hardForm.addEventListener("submit", e => {
  e.preventDefault();
  let inputOne = document.getElementById("inputOne").value;
  let inputTwo = document.getElementById("inputTwo").value;
  Location(inputOne, inputTwo);
});

function Location(one, two) {
  let url = `http://api.open-notify.org/iss-pass.json?lat=${one}&lon=${two}`;
  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      let minutes;
      let seconds;
      let date;
      let final = "";

      final += `<h2>The International Space Station will pass over the given location on:</h2>`;
      for (let key in json.response) {
        minutes = Math.floor(json.response[key].duration / 60); //turns long seconds into minutes
        seconds = json.response[key].duration % 60; // gets leftover seconds
        date = json.response[key].risetime;

        final += `<p>${new Date(date * 1000)}
                        for ${minutes} minutes and ${seconds} seconds</p><br>`;

        hardContent.innerHTML = final;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

getGeoLocation = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    document.getElementById("inputOne").value = pos.coords.latitude;
    document.getElementById("inputTwo").value = pos.coords.longitude;
  });
};

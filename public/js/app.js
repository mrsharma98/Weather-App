// grabbing the location from form
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("sumbit", (e) => {
  e.preventDefault();
  // this will prevent page to reload immediately after submitting our location

  const location = search.value;
  // search.value extracts the input value

  //console.log(location);
  // Now using this location we need to generate url

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.location);
          console.log(data.forecast);
        }
      });
    }
  );
});

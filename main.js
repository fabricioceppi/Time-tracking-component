/* dinamic display of activities + filter by timeline */

// fetch the data in the json file and call the main function when data is ready
fetch("data.json")
  .then((response) => response.json())
  .then((json) => {
    let data = json;
    initialize(data);
  })
  .catch(() => {
    console.log("Error!:");
    console.log(response.status);
  });

// main function of the component
function initialize(data) {
  // grab some references to modify the DOM and filter when clicking the list items
  const main = document.querySelector("main");
  const timeLines = document.querySelectorAll("li");
  let previous;
  let current;

  // create and display the tasks elements in the DOM
  function displayTasks() {
    for (let i = 0; i < data.length; i++) {
      let activity = document.createElement("div");
      let container = document.createElement("div");
      let task = document.createElement("h2");
      let ellipsis = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      let ellipsisPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      let currentTrack = document.createElement("h3");
      let previousTrack = document.createElement("p");
      let titleToLower = data[i].title.toLowerCase().replace(" ", "-");

      activity.classList.add("activity");
      activity.style.backgroundImage = `url(images/icon-${titleToLower}.svg)`;
      previousTrack.textContent = data[i].timeframes.weekly.previous + "hrs";
      currentTrack.textContent = data[i].timeframes.weekly.current + "hrs";
      task.textContent = data[i].title;
      ellipsis.classList.add("ellipsis");
      ellipsis.setAttribute("width", "21");
      ellipsis.setAttribute("height", "5");
      ellipsisPath.setAttribute(
        "d",
        "M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
      );
      ellipsisPath.setAttribute("fill", "#BBC0FF");
      ellipsisPath.setAttribute("fill-rule", "evenodd");
      ellipsis.appendChild(ellipsisPath);

      container.appendChild(task);
      container.appendChild(ellipsis);
      container.appendChild(currentTrack);
      container.appendChild(previousTrack);
      activity.appendChild(container);
      main.appendChild(activity);
    }

    previousDisplayers = document.querySelectorAll(".activity p");
    currentDisplayers = document.querySelectorAll(".activity h3");
  }

  // add event listeners to the list items
  // they should work as filters for timeline in the activity containers
  timeLines.forEach((element) => {
    element.addEventListener("click", () => {
      timeLines.forEach((item) => {
        item.classList.remove("active");
      });
      element.classList.add("active");
      changeTimeline(element.textContent);
    });
  });

  function changeTimeline(filter) {
    for (let i = 0; i < data.length; i++) {
      if (filter === "Weekly") {
        previousDisplayers[i].textContent =
          data[i].timeframes.weekly.previous + "hrs";
        currentDisplayers[i].textContent =
          data[i].timeframes.weekly.current + "hrs";
      } else if (filter === 'Daily') {
        previousDisplayers[i].textContent =
          data[i].timeframes.daily.previous + "hrs";
        currentDisplayers[i].textContent =
          data[i].timeframes.daily.current + "hrs";
      } else {
        previousDisplayers[i].textContent =
          data[i].timeframes.monthly.previous + "hrs";
        currentDisplayers[i].textContent =
          data[i].timeframes.monthly.current + "hrs";
      }
    }
  }

  displayTasks();
}

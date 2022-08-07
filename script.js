class App {
  parentElement = document.getElementById("reports");
  mainNavigation = document.getElementById("main-navigation");
  timeframeButtons = this.mainNavigation.querySelectorAll('button')
  constructor(data) {
    this.data = data;
    this.mainNavigation.addEventListener(
      "click",
      this.handleTimeFrameChange.bind(this)
    );
  }

  render(selectedTimeframe) {
    const markUp = this.data
      .map(
        (report) => `<div class="card">
          <div class="card__icon-box">
          <img src="./images/icon-${report.title
            .split(" ")
            .join("-")
            .toLowerCase()}.svg" alt="icon ${report.title.toLowerCase()}" />
          </div>
          <article class="card__report-info">
            <div class="card__report-info__headind-box">
              <h3 class="card__report-info__headind-box-heading">${
                report.title
              }</h3>
              <div class="card__report-info__headind-box-options">
                <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                    fill="#BBC0FF"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div class="flex">
            <p class="card__report-info__current">${
              report.timeframes[selectedTimeframe].current
            }hrs</p>
            <p class="card__report-info__previous">${
              selectedTimeframe === "daily"
                ? "Yesterday"
                : selectedTimeframe === "monthly"
                ? "Last month"
                : selectedTimeframe === "weekly"
                ? "Last week"
                : ""
            } - ${report.timeframes[selectedTimeframe].previous}hrs</p>
            </div>
          </article>
        </div>`
      )
      .join("");

    this.clearReports();
    this.parentElement.innerHTML = markUp;
  }

  clearReports() {
    this.parentElement.innerHTML = "";
  }

  handleTimeFrameChange({target}) {
    if(!target) return;

    this.changeActiveTimeframeClass(target)
    const targetTimeframe = target.dataset.timeframe

    this.render(targetTimeframe)
  }

  changeActiveTimeframeClass(target) {
    this.timeframeButtons.forEach(button => button.classList.remove('active'))
    target.classList.add('active')
  }
} 

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const app = new App(data);
    app.render('weekly')
  });

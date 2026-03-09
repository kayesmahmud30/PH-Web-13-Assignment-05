const allIssues = [];
const openIssues = [];
const closedIssues = [];

const searchInput = document.getElementById("search-input");
const issueCountDisplay = document.getElementById("issues-count");
const issueContainer = document.getElementById("issue-card-container");
const spinner = document.getElementById("spinner");

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const manageSpinner = (status) => {
  if (status == true) {
    spinner.classList.remove("hidden");
    issueContainer.classList.add("hidden");
  } else {
    issueContainer.classList.remove("hidden");
    spinner.classList.add("hidden");
  }
};

const createLabels = (arr) => {
  const htmlElements = arr.map(
    (element) =>
      `<button class="py-1 px-2 rounded-full font-semibold border-2 border-yellow-400">${element}<button/>`,
  );

  return htmlElements.join(" ");
};

const loadAllIssue = () => {
  manageSpinner(true);

  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => individualDataLoad(data.data));
};

const individualDataLoad = (issues) => {
  issues.forEach((issue) => {
    allIssues.push(issue);

    if (issue.status == "open") {
      openIssues.push(issue);
    } else if (issue.status == "closed") closedIssues.push(issue);
  });
  renderCards(allIssues);
  allBtn.classList.add("active-btn");
};

const renderCards = (issues) => {
  issueCountDisplay.innerText = issues.length;

  issueContainer.innerHTML = "";
  issues.forEach((issue) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div
        class="h-full card shadow-sm border border-gray-200 p-3 border-t-4 space-y-2 ${issue.status == "open" ? "border-t-[#00A96E]" : "border-t-[#A855F7]"}"
      >
        <div class="relative py-4">
          <p id="issue-priority"
            class="text-center w-20 rounded-full ${issue.priority == "high" ? "high" : issue.priority == "medium" ? "medium" : "low"} font-semibold absolute top-0 right-0"
          >
            ${issue.priority}
          </p>
        </div>

        <h2 class="text-[16px] font-semibold">
         ${issue.title}
        </h2>
        <p id="issue-description" class="text-[12px] text-[#64748B]">
          ${issue.description}
        </p>
        <div id="issue-label" class="flex flex-wrap gap-1">
          ${createLabels(issue.labels)}
        </div>
        
<hr class="border-gray-200 my-2">

        <p id="issue-author" class="text-[#64748B]">#${issue.id} by ${issue.author}</p>
        <p id="issue-date" class="text-[#64748B]">${new Date(
          issue.createdAt,
        ).toLocaleDateString("en-US")}</p>

        <p id="issue-assignee" class="hidden">${issue.assignee}</p>
      </div>
    `;
    issueContainer.append(div);
  });
  manageSpinner(false);
};

allBtn.addEventListener("click", () => {
  allBtn.classList.add("active-btn");
  openBtn.classList.remove("active-btn");
  closedBtn.classList.remove("active-btn");
  renderCards(allIssues);
});
openBtn.addEventListener("click", () => {
  allBtn.classList.remove("active-btn");
  openBtn.classList.add("active-btn");
  closedBtn.classList.remove("active-btn");
  renderCards(openIssues);
});
closedBtn.addEventListener("click", () => {
  allBtn.classList.remove("active-btn");
  openBtn.classList.remove("active-btn");
  closedBtn.classList.add("active-btn");
  renderCards(closedIssues);
});

loadAllIssue();

issueContainer.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".card");
  displayModalDetails(clickedCard);
});

const displayModalDetails = (clickedCard) => {
  const detailBox = document.getElementById("modal-details-container");

  detailBox.innerHTML = `
          <h1 class="text-[24px] font-bold">
          ${clickedCard.querySelector("h2").innerText}
          </h1>
          <p class="text-[#64748B]">
            <span
              class="text-white ${clickedCard.classList.contains("border-t-green-600") ? "bg-green-600" : "bg-red-600"} py-[5px] px-[10px] rounded-full mr-1"
              >
              ${clickedCard.classList.contains("border-t-green-600") ? "Opened" : "Closed"}
              </span>
             • by ${clickedCard.querySelector("#issue-author").innerText.split("by")[1]} • ${clickedCard.querySelector("#issue-date").innerText}
          </p>

          <span class="flex gap-1">
        ${clickedCard.querySelector("#issue-label").innerHTML}
          </span>
          <p class="text-[#64748B]">
          ${clickedCard.querySelector("#issue-description").innerText}
          </p>
          <div class="flex items-center">
            <div class="assignee w-[50%] space-y-1">
              <p class="text-[#64748B]">Assignee:</p>
              <h2 class="font-bold ${!!clickedCard.querySelector("#issue-assignee").innerText ? "text-black" : "text-red-400"}">
              ${!!clickedCard.querySelector("#issue-assignee").innerText ? clickedCard.querySelector("#issue-assignee").innerText : "Assignee not found"}
              </h2>
            </div>

            <div class="priority w-[50%] space-y-2">
              <p class="text-[#64748B]">Priority:</p>
              <span
                class="${clickedCard.querySelector("#issue-priority").innerText == "high" ? "high" : clickedCard.querySelector("#issue-priority").innerText == "medium" ? "medium" : "low"} px-[10px] py-[5px] rounded-full"
                >
                ${clickedCard.querySelector("#issue-priority").innerText}
                </span
              >
            </div>
          </div>
  `;
  document.getElementById("open_modal").showModal();
};

searchInput.addEventListener("input", () => {
  manageSpinner(true);
  const searchValue = searchInput.value.trim().toLowerCase();
  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
  )
    .then((res) => res.json())
    .then((data) => {
      if (searchValue.length != 0) {
        renderCards(data.data);
        manageSpinner(false);
        return;
      } else {
        allBtn.classList.add("active-btn");
        openBtn.classList.remove("active-btn");
        closedBtn.classList.remove("active-btn");
        renderCards(allIssues);
        manageSpinner(false);
      }
    });
});

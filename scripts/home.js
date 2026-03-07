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
  // console.log(arr);

  const htmlElements = arr.map(
    (element) =>
      `<button class="p-1 rounded-md font-semibold border-2 border-yellow-400">${element}<button/>`,
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
  console.log(allIssues.length);
  renderAll(allIssues);
  allBtn.classList.add("active-btn");
  // manageSpinner(false);
};

const renderAll = (issues) => {
  issueCountDisplay.innerText = issues.length;

  issueContainer.innerHTML = "";
  issues.forEach((issue) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div
        class="h-full card shadow-sm border border-gray-200 p-3 border-t-4 space-y-2 ${issue.status == "open" ? "border-t-green-600" : "border-t-violet-800"}"
      >
        <div class="relative py-4">
          <p
            class="text-center w-20 rounded-full ${issue.priority == "high" ? "high" : issue.priority == "medium" ? "medium" : "low"} font-semibold absolute top-0 right-0"
          >
            ${issue.priority}
          </p>
        </div>

        <h2 class="text-[14px] font-bold">
         ${issue.title}
        </h2>
        <p class="text-[#64748B]">
          ${issue.description}
        </p>
        <div class="flex flex-wrap gap-1">
          ${createLabels(issue.labels)}
        </div>

        <p class="text-[#64748B]">#${issue.author}</p>
        <p class="text-[#64748B]">${new Date(
          issue.createdAt,
        ).toDateString()}</p>
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
  renderAll(allIssues);
  // manageSpinner(false);
});
openBtn.addEventListener("click", () => {
  allBtn.classList.remove("active-btn");
  openBtn.classList.add("active-btn");
  closedBtn.classList.remove("active-btn");
  renderAll(openIssues);
  // manageSpinner(false);
});
closedBtn.addEventListener("click", () => {
  allBtn.classList.remove("active-btn");
  openBtn.classList.remove("active-btn");
  closedBtn.classList.add("active-btn");
  renderAll(closedIssues);
  // manageSpinner(false);
});

loadAllIssue();

//----------------------------------------------------------------
searchInput.addEventListener("input", () => {
  console.log(searchInput.value);
});
// console.log(cards);

//----------------------------------------------------------------
issueContainer.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".card");

  // console.log(clickedCard);
  displayModalDetails(clickedCard);
  // const title = clickedCard.querySelector("h2");
  // const status = clickedCard.querySelector("h2");
  // console.log(clickedCard);
});

//Modal.....
const displayModalDetails = (clickedCard) => {
  console.log(clickedCard);
  const detailBox = document.getElementById("modal-details-container");
  // console.log(clickedCard);

  // <h1>${clickedCard.querySelector("h2").innerText}</h1>
  detailBox.innerHTML = `
          <h1 class="text-[24px] font-bold">
          ${clickedCard.querySelector("h2").innerText}
          </h1>
          <p class="text-[#64748B]">
            <span
              class="text-white bg-green-600 py-[5px] px-[10px] rounded-full"
              >Opened</span
            >
            • Opened by Fahim Ahmed • 22/02/2026
          </p>

          <span class="flex gap-3">
            <p class="border py-[3px] px-[10px] rounded-full font-semibold">
              Bug
            </p>
            <p class="border py-[3px] px-[10px] rounded-full font-semibold">
              help wanted
            </p>
          </span>
          <p class="text-[#64748B]">
            The navigation menu doesn't collapse properly on mobile devices.
            Need to fix the responsive behavior.
          </p>
          <div class="flex items-center">
            <div class="assignee w-[50%] space-y-1">
              <p class="text-[#64748B]">Assignee:</p>
              <h2 class="font-bold">Fahim Ahmed</h2>
            </div>

            <div class="priority w-[50%] space-y-2">
              <p class="text-[#64748B]">Priority:</p>
              <span
                class="bg-red-600 text-white px-[10px] py-[5px] rounded-full"
                >High</span
              >
            </div>
          </div>
  `;
  document.getElementById("open_modal").showModal();
};

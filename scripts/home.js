const allIssues = [];
const openIssues = [];
const closedIssues = [];

const searchInput = document.getElementById("search-input");
const issueCountDisplay = document.getElementById("issues-count");
const issueContainer = document.getElementById("issue-card-container");

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const createLabels = (arr) => {
  // console.log(arr);

  const htmlElements = arr.map(
    (element) =>
      `<button class="p-1 rounded-md font-semibold border-2 border-yellow-400">${element}<button/>`,
  );

  return htmlElements.join(" ");
};

const loadAllIssue = () => {
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
            class="text-center w-20 bg-red-100 rounded-full text-red-400 font-semibold absolute top-0 right-0"
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
};

allBtn.addEventListener("click", () => {
  allBtn.classList.add("active-btn");
  openBtn.classList.remove("active-btn");
  closedBtn.classList.remove("active-btn");
  renderAll(allIssues);
});
openBtn.addEventListener("click", () => {
  allBtn.classList.remove("active-btn");
  openBtn.classList.add("active-btn");
  closedBtn.classList.remove("active-btn");
  renderAll(openIssues);
});
closedBtn.addEventListener("click", () => {
  allBtn.classList.remove("active-btn");
  openBtn.classList.remove("active-btn");
  closedBtn.classList.add("active-btn");
  renderAll(closedIssues);
});

loadAllIssue();

//----------------------------------------------------------------
searchInput.addEventListener("input", () => {
  console.log(searchInput.value);
});

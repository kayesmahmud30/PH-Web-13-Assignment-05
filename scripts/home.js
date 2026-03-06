const allIssues = [];
const openIssues = [];
const closedIssues = [];

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
};

loadAllIssue();

// console.log(allIssues.length);

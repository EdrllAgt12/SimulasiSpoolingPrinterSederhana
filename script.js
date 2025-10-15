let queue = [];
let jobId = 1;
let isPrinting = false;
let isPausedused = false;
let currentJob = null;

function log(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += `<div> ${new Date().toLocaleTimeString()} - ${msg}</div>`;
  logBox.scrollTop = logBox.scrollHeight;
}

function renderQueue() {
  const antriDiv = document.getElementById("antri");
  antriDiv.innerHTML = "";
  queue.forEach(job => {
    const div = document.createElement("div");
    div.className = "job";
    if (job.status === "printing") div.classList.add("printing");
    if (job.status === "done") div.classList.add("done");
    div.textContent = `${job.name} (${job.status})`;
    antriDiv.appendChild(div);
  });
}

function add() {
  const id = jobId;   
  const job = { id: id, name: "Dokumen " + id, status: "menunggu" };
  jobId++;
  queue.push(job);
  log(`${job.name} ditambahkan ke antrian.`);
  renderQueue();
}


function Print() {
  if (isPrinting) return;
  isPrinting = true;
  isPaused = false;
  log("Printer dimulai.");
  printNext();
}

function pausePrint() {
  isPaused = true;
  isPrinting = false;
  document.getElementById("status-text").textContent = "Paused";
  log("Printer dijeda.");
}

function reset() {
  queue = [];
  jobId = 1;
  isPrinting = false;
  isPaused = false;
  currentJob = null;
  document.getElementById("status-text").textContent = "Idle";
  document.getElementById("log").innerHTML = "";
  renderQueue();
  log("Simulasi direset.");
}

function printNext() {
  if (!isPrinting || isPaused) return;
  if (queue.length === 0) {
    document.getElementById("status-text").textContent = "Idle";
    log("Tidak ada dokumen dalam antrian. Printer idle.");
    isPrinting = false;
    return;
  }

  currentJob = queue[0];
  currentJob.status = "printing";
  document.getElementById("status-text").textContent = "Mencetak...";
  renderQueue();
  log(`${currentJob.name} sedang dicetak.`);

  setTimeout(() => {
    if (isPaused) return;
    currentJob.status = "done";
    log(`${currentJob.name} selesai dicetak.`);
    queue.shift();
    renderQueue();
    printNext();
  }, 2000);
}

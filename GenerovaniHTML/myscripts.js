let MathScore = [
    ["Bar", 20, 60, "A"],
    ["Foo", 10, 52, "B"],
    ["Joey", 5, 24, "F"],
    ["John", 28, 43, "A"],
    ["Liza", 16, 51, "B"],
  ];

  let tableBody = document.getElementById("mathScoresBody");

  MathScore.forEach((student) => {
    let row = document.createElement("tr");
    student.forEach((data) => {
      let cell = document.createElement("td");
      cell.textContent = data;
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
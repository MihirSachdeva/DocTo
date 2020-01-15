const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("http").Server(app);
const upload = require("express-fileupload");

app.use(upload());
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

const Lily = [{
    name: "Lily_Prescription_1.pdf",
    date: "23/12/2019"
  },
  {
    name: "Lily_Prescription_2.pdf",
    date: "29/12/2019"
  },
  {
    name: "Lily_Prescription_3.pdf",
    date: "30/12/2019"

  },
  {
    name: "Lily_Prescription_4.pdf",
    date: "11/01/2020"

  }
];

const Albus = [{
    name: "Albus_Prescription_1.pdf",
    date: "03/01/2020"
  },
  {
    name: "Albus_Prescription_2.pdf",
    date: "05/01/2020"
  },
  {
    name: "Albus_Prescription_3.pdf",
    date: "07/01/2020"

  },
  {
    name: "Albus_Prescription_4.pdf",
    date: "14/01/2020"

  }
];


const James = [{
    name: "James_Prescription_1.pdf",
    date: "13/12/2019"
  },
  {
    name: "James_Prescription_2.pdf",
    date: "17/12/2019"
  },
  {
    name: "James_Prescription_3.pdf",
    date: "03/01/2020"

  },
  {
    name: "James_Prescription_4.pdf",
    date: "15/01/2020"

  }
];




app.get("/", function(req, res) {


  res.render("home", {
    familyName: "Potters",
  });
});




app.get("/Lily", function(req, res) {

  res.render("patient", {
    patientName: "Lily",
    patientObject: Lily
  });
});

app.get("/Albus", function(req, res) {


  res.render("patient", {
    patientName: "Albus",
    patientObject: Albus
  });
});

app.get("/James", function(req, res) {


  res.render("patient", {
    patientName: "James",
    patientObject: James
  });
});




app.get("/:patinentName/:fileName", function(req, res) {
  var fileName = req.params.fileName;
  var patientName = req.params.patientName;

  res.download(__dirname + "/allFiles/" + fileName, fileName);
});

app.get("/add", function(req, res) {
  res.render("add");
});

app.post("/add", function(req, res) {
  var file = req.files.filename;
  var filename = file.name;
  file.mv(__dirname + "/allFiles/" + filename, function(err) {
    var patientName = req.body.patientName;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    newFile = {
      name: filename,
      date: today
    }
    if (patientName == "Lily") {
      Lily.push(newFile);
    } else if (patientName == "Albus") {
      Albus.push(newFile);
    } else if (patientName == "James") {
      James.push(newFile);
    }
    res.redirect("/" + patientName);
  });
});

app.listen(process.env.PORT || 4444, function() {
  console.log("Server started on port 4444...");
});

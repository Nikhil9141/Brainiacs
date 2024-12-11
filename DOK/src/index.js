const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, "../templates");
app.use(express.static(path.join(__dirname, "../public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set View Engine and Views Path
app.set("view engine", "hbs");
app.set("views", templatePath);

// Routes
app.get("/", (req, res) => {
    res.render("home"); // Render the homepage
});

// Homepage Route (first page with Start button)
app.get("/", (req, res) => {
    res.render("home1"); // Render the homepage
});

// Option Page Route (second page with different options)
app.get("/option", (req, res) => {
    res.render("option"); // Render the options page after clicking Start
});

// Login Page Route
app.get("/login", (req, res) => {
    res.render("login"); // Render the login page
});

// Signup Page Route
app.get("/signup", (req, res) => {
    res.render("signup"); // Render the signup page
});

app.get("/Apti", (req, res) => {
    res.render("Apti"); // Render the signup page
});
app.get('/TechnicalRound', (req, res) => {
    res.render('technicalRound');  // This is your technical round page template
  });
app.get("/Arithmetic", (req, res) => {
    res.render("Arithmetic"); // Render the signup page
});
app.get("/Algebra", (req, res) => {
    res.render("Algebra"); // Render the signup page
});
app.get("/TimeandDistance", (req, res) => {
    res.render("TimeandDistance"); 
});
app.get("/NumberSystem", (req, res) => {
    res.render("NumberSystem"); 
});
app.get("/RatioandProportion", (req, res) => {
    res.render("RatioandProportion"); 
});
app.get("/DataSufficiency", (req, res) => {
    res.render("DataSufficiency"); 
});
app.get("/Syllogisms", (req, res) => {
    res.render("Syllogisms"); 
});
app.get("/CriticalThinking", (req, res) => {
    res.render("CriticalThinking"); 
});
app.get("/DecisionMaking", (req, res) => {
    res.render("DecisionMaking"); 
});
app.get("/Vocabulary", (req, res) => {
    res.render("Vocabulary"); 
});
app.get("/Grammar", (req, res) => {
    res.render("Grammar"); 
});
app.get("/ReadingComprehension", (req, res) => {
    res.render("ReadingComprehension"); 
});
app.get("/Synonyms&Antonyms", (req, res) => {
    res.render("Synonyms&Antonyms"); 
});
app.get("/Mechanical", (req, res) => {
    res.render("Mechanical"); 
});
app.get("/Electronics", (req, res) => {
    res.render("Electronics"); 
});
app.get("/ComputerScience", (req, res) => {
    res.render("ComputerScience"); 
});
app.get("/Artificialintelligence", (req, res) => {
    res.render("Artificialintelligence"); 
});
app.get("/Civil", (req, res) => {
    res.render("Civil"); 
});
app.get("/PercentageProblems", (req, res) => {
    res.render("PercentageProblems"); 
});
app.get("/PermutationandCombination", (req, res) => {
    res.render("PermutationandCombination"); 
});
app.get("/Profitandloss", (req, res) => {
    res.render("Profitandloss"); 
});
app.get("/ProblemsonAges", (req, res) => {
    res.render("ProblemsonAges"); 
});
app.get("/AlligationandMixture", (req, res) => {
    res.render("AlligationandMixture"); 
});
app.get('/Amazon', (req, res) => {
    res.render('Amazon'); // Render Handlebars template for Amazon page
  });
  app.get('/amazon1', (req, res) => {
    res.render('amazon1'); // Render Handlebars template for Amazon page
  });
  
  app.get('/FullsyllabusTest', (req, res) => {
    res.render('Fullsyllabustest');
});



// Handle Signup Form Submission
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
    };
    await collection.insertMany([data]);
    res.render("home1");
});

// Handle Login Form Submission
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (check.password === req.body.password) {
            res.render("home1");
        } else {
            res.send("Wrong password");
        }
    } catch {
        res.send("Wrong details");
    }
});
app.get("/:subcategory", (req, res) => {
    const subcategory = req.params.subcategory;
    console.log(`Accessing subcategory: ${subcategory}`);
    const validSubcategories = ["Arithmetic", "Algebra","Arithmetic", "Algebra", "Time and Distance", "Number System", "Ratio and Proportion",
        "Data Sufficiency", "Syllogisms", "Critical Thinking", "Decision Making",
            "Vocabulary", "Grammar", "Reading Comprehension", "Synonyms & Antonyms",
            "Artificial intelligence", "Mechanical", "Civil", "Computer Science", "Electronics",
            "Problems on Ages", "Percentage Problems", "Profit and loss", "Permutation and Combination","Alligation and Mixture"]; // Add all valid subcategories here

    if (validSubcategories.includes(subcategory)) {
        res.render(subcategory); // Dynamically render the subcategory page
    } else {
        res.status(404).send("Page not found");
    }
});


// Start the Server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
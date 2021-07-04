// Globals
var XAXIS = [];
var YAXIS = [];
var XAVG = 0;
var YAVG = 0;
var ALLFALSE = false;

// Share Links
window.onload = setShareLinks();

function setShareLinks() {
    var pageUrl = encodeURIComponent(document.URL);
    var description = document.querySelector("meta[name='description']").getAttribute("content");
    var description = encodeURIComponent(description);

    elements = document.querySelectorAll("share-img.social-share.facebook");
    Array.prototype.forEach.call(elements, function(el) {
        el.addEventListener("click", function() {
            url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
            socialWindow(url);
        });
    });

    elements = document.querySelectorAll("share-img.social-share.twitter");
    Array.prototype.forEach.call(elements, function(el) {
        el.addEventListener("click", function() {
            url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + description;
            socialWindow(url);
        });
    });

    elements = document.querySelectorAll("share-img.social-share.linkedin");
    Array.prototype.forEach.call(elements, function(el) {
        el.addEventListener("click", function() {
            url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
            socialWindow(url);
        });
    });
};

function socialWindow(url) {
    var left = (screen.width - 570) / 2;
    var top = (screen.height - 570) / 2;
    var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
    window.open(url,"NewWindow",params);
};

function show(){
    // show survey
    document.getElementById("survey-form").style.display = 'block';
    document.getElementById("btn2").style.display = 'block';
    // delete button & subtitle
    document.getElementById("btn1").style.display = 'none';
    document.getElementById('subtitle').style.display = 'none';
    document.getElementById('subtitle1').style.display = 'none';
};

function generateGraph() {
    
    // XAXIS
    XAXIS.push(document.querySelector('input[name="q1"]:checked').value);
    XAXIS.push(document.querySelector('input[name="q2"]:checked').value);
    XAXIS.push(document.querySelector('input[name="q3"]:checked').value);
    XAXIS.push(document.querySelector('input[name="q4"]:checked').value);
    XAXIS.push(document.querySelector('input[name="q5"]:checked').value);
    XAXIS.push(document.querySelector('input[name="q6"]:checked').value);
    XAXIS.push(document.querySelector('input[name="q7"]:checked').value);
    XAXIS.push(document.querySelector('input[name="q8"]:checked').value);
    XAXIS.push(document.querySelector('input[name="q9"]:checked').value);
    XAXIS.push(document.querySelector('input[name="q10"]:checked').value);
    // edge case (taking the last 10 elems)
    if (XAXIS.length > 10) {
        XAXIS = XAXIS[XAXIS.length-10, XAXIS.length]
    }
    // average
    var xtot = 0
    for(var i = 0; i < XAXIS.length; i++) {
        xtot += Number(XAXIS[i]);
    }
    XAVG = xtot / XAXIS.length;

    // YAXIS
    YAXIS.push(document.querySelector('input[name="q11"]:checked').value);
    YAXIS.push(document.querySelector('input[name="q12"]:checked').value);
    YAXIS.push(document.querySelector('input[name="q13"]:checked').value);
    YAXIS.push(document.querySelector('input[name="q14"]:checked').value);
    YAXIS.push(document.querySelector('input[name="q15"]:checked').value);
    YAXIS.push(document.querySelector('input[name="q16"]:checked').value);
    YAXIS.push(document.querySelector('input[name="q17"]:checked').value);
    YAXIS.push(document.querySelector('input[name="q18"]:checked').value);
    YAXIS.push(document.querySelector('input[name="q19"]:checked').value);
    YAXIS.push(document.querySelector('input[name="q20"]:checked').value);
    // Edge case (taking the last 10 elems)
    if (YAXIS.length > 10) {
        YAXIS = YAXIS[YAXIS.length-10, YAXIS.length]
    }
    // average
    var ytot = 0
    for(var j = 0; j < YAXIS.length; j++) {
        ytot += Number(YAXIS[j]);
    }
    YAVG = ytot / YAXIS.length;
    
    // Flush page after survey
    var compForm = document.getElementById("survey-form");
    var resBtn = document.getElementById("btn2");
    // var subtitle = document.getElementById('subtitle');
    compForm.remove();
    resBtn.remove();
    // subtitle.remove();

    // Generating Chart

    var c = document.getElementById('graph');
    var ctx = c.getContext("2d");
    
    ctx.canvas.width = (window.innerWidth / 2);
    ctx.canvas.height = (window.innerHeight / 2);
    ctx.fillStyle = 'red';
    ctx.fillRect(
        ctx.canvas.width / 2 - 5 + (XAVG * (0.03068 * ctx.canvas.width)),
        ctx.canvas.height / 2 - (YAVG * (0.04317 * ctx.canvas.height)),
        10,
        10
    );
    ctx.globalCompositeOperation = 'destination-over';
    make_base();

    function make_base() {
        base_img = new Image();
        base_img.src = "images/cart.png";
        base_img.onload = function() {
            ctx.drawImage(
                base_img, 
                0, 0, base_img.width, base_img.height,
                0, 0, c.width, c.height
            );
        }
    }

    // Check if all are dissagree / strongly disagree
    if((JSON.stringify(XAXIS) == JSON.stringify(["1", "-1", "1", "-1", "1", "-1", "1", "-1", "1", "-1"])) && JSON.stringify(YAXIS) == JSON.stringify(["1", "-1", "-1", "1", "-1", "1", "-1", "1", "-1", "1"])){
        ALLFALSE = true
    }
    // Check if all are disagree
    if((JSON.stringify(XAXIS) == JSON.stringify(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"])) && JSON.stringify(YAXIS) == JSON.stringify(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"])){
        ALLFALSE = true
    }

    // Report Description
    var wrapper = document.querySelector('#results-desc');
    var desc = '';
    // central 
    if(-2 >= XAVG <= 2 && -2 >= YAVG <= 2){
        desc = '<h3 id="result">RESULT: PURE DATA SCIENTIST</h3>'
        desc += "<h3>Overview:</h3>" 
        desc += '<p>&#9;Data scientists are a little bit of everything when it comes to their roles and skills in the professional world. As leading programmers and engineers with strong backgrounds in mathematics and statistics, an ability to communicate analysis and findings effectively, and an impressive understanding of their relative industries, data scientists have it all. Overall, data scientists play key roles in extracting value from data using skills like data analysis, statistical analysis, and machine learning all while conveying results to business leaders and decision makers. Data science is a relatively new field and is growing rapidly as more companies invest more and more into ML/AI initiatives. Here is a deeper breakdown of the abilities and skills of a data scientist:</p>'
        desc += "<h3>Mathematician  / Statistician:</h3>" 
        desc += "<p>&#9;A key component of being an effective data scientist is having a strong understanding of core math and stats concepts. Math and stats are absolutely essential for utilizing machine learning algorithms, solving complex problems in the real world, and performing data analysis. Data scientists often start out as mathematicians and statisticians and easily adapt to the changes because of how interlinked the fields are. Math concepts like linear algebra and calculus are key componentes of all alogirthm applications. </p>"
        desc += "<img class='charts' src='/images/math_stats.png'></img>"
        desc += "<h3>Programmer:</h3>" 
        desc += "<p>&#9;Along with having a strong math/stats background, data scientists are very proficient programmers, and use programming languages like Python, Java, R, and SQL to drive insights from big datasets they are working with. Rather than the typical roles of software engineers and computer scientists, data scientists focus on utilizing programming for data analysis. Whether it be for data cleaning, mining, or for creating a machine learning algorithm, data scientists use various computer programs to leverage big data and to get the insights their business needs.</p>"
        desc += "<img class='charts' src='/images/programmers.png'></img>"
        desc += "<h3>Domain Expert:</h3>" 
        desc += "<p>&#9;While data scientists have a strong technical background, they are also domain experts, and have a strong understanding of their business and industry. In this sense, data scientists have the middle ground between the technical and business side of their company. Having a strong understanding of their respective domain is an extremely unique skill data scientists have, and makes their role even more important to the success of a business.</p>"
        desc += "<img class='charts' src='/images/domain_experts.png'></img>"
        desc += "<h3>Data Storyteller:</h3>" 
        desc += "<p>&#9;Not only do data scientists spend time programming, analyzing data, and implementing machine learning models, but they also have to convey their results to business executives and decision makers. In this sense, data scientists are experts when it comes to relaying their findings through data visualizations in a way that business leaders can interpret, understand, and implement. Data storytelling and being able to interpret findings to those who cannot understand the code and program is a key skill data scientists have and differentiates data scientists from computer scientists and software engineers for the most part.</p>"
        desc += "<img class='charts' src='/images/storytellers.png'></img>"
    };
    // upper middle
    if(-3 >= XAVG <= 2 && YAVG > 2){
        desc = '<h3 id="result">RESULT: MATHEMATICIAN / STATISTICIAN</h3>'
        desc += "<h3>Overview:</h3>"
        desc += "<p>Mathematicians and statisticians have an incredible understanding of machine learning algorithms, predictive modeling, statistical analysis concepts. Topics like linear algebra and calculus are key components of all machine learning algorithms. When it comes to solving complex problems in the real world and creating and applying machine learning models, having a strong understanding of high level math and stats is crucial. Data scientists often start out as mathematicians and statisticians and easily adapt to the changes because of how interlinked the fields are. Mathematicians and statisticians are the greatest minority in our LinkedIn dataset of data scientists, making up about 10% of the total population. Here is a distribution of some of the most common skills of mathematicians and statisticians found in our dataset:</p>"
        desc += "<img class='charts' src='/images/math_stats.png'></img>"
        desc += "<p>Our algorithm determined that in order to become a more well-rounded data scientist, it might serve you to expand your skills on data storytelling. Data storytellers are able to take data, analyze it, and through visualizations, tell a story about that data to others. Data storytellers go beyond just the analysis and are able to effectively communicate their results to business leaders. In this sense, data storytellers are experts when it comes to relaying their findings through data visualizations in a way that business leaders can interpret, understand, and implement. Check out some of the most common skills of data storytellers found in our LinkedIn dataset:</p>"
        desc += "<img class='charts' src='/images/storytellers.png'></img>"
    };
    // lower middle
    if(-3 >= XAVG <= 2 && YAVG < -2){
        desc = '<h3 id="result">RESULT: DATA STORYTELLER</h3>'
        desc += "<h3>Overview:</h3>"
        desc += "<p>Data storytellers are excellent communicators and do much more than just analyze data. As a data storyteller, you are able to take data, and through visualizations, tell a story about that data to others. In the workforce, being a data storyteller is a crucial skill. While there are many people that can perform some sort of data analysis, data storytellers go beyond just the analysis and are able to effectively communicate their results to their colleagues or business leaders. In this sense, data storytellers are experts when it comes to relaying their findings through data visualizations in a way that business leaders can interpret, understand, and implement. Data storytellers make up about 25% percent of types of data scientists in our LinkedIn dataset, which is the second least out of the other categories. Here is a distribution of some of the most common skills of data storytellers found in our dataset:</p>"
        desc += "<img class='charts' src='/images/storytellers.png'></img>"
        desc += "<p>Our algorithm determined that in order to become a more well-rounded data scientist, it might serve you to expand your skills on mathematics and statistics. Concepts like linear algebra and calculus are key components of all machine learning algorithms. When it comes to solving complex problems in the real world and creating and applying machine learning models, having a strong understanding of high level math and stats is crucial, and is a skill that all data scientists must have and be able to use on a daily basis. Check out some of the most common skills of mathematicians and statisticians found in our LinkedIn dataset:</p>"
        desc += "<img class='charts' src='/images/math_stats.png'></img>"
    };
    // left middle
    if(XAVG < -3 && -3 >= YAVG <=3){
        desc = '<h3 id="result">RESULT: PROGRAMMER</h3>'
        desc += "<h3>Overview:</h3>" 
        desc += "<p>The term “Programmer” is very broad in the sense that it encapsulates numerous professions that have a strong emphasis on computer programming, from Software Engineers to Data Engineers and Architects, to even Machine Learning Engineers. Programmers make up about 30% of our data set of data scientists on LinkedIn, which is ranked the second most popular title out of four clusters of types of data scientists. As a programmer, you are responsible to write code to do a multitude of tasks. As a part of their day-to-day work, programmers are more focused on the front-end/back-end development, creating web and mobile applications, developing operating systems, implementing machine learning algorithms and models, and designing innovative software for businesses. Here is a distribution of some of the most common skills of programmers found in our dataset:</p>"
        desc += "<img class='charts' src='/images/programmers.png'></img>"
        desc += "<p>Our algorithm determined that in order to become a more well-rounded data scientist, it might serve you to expand your skills on your particular domain expertise. Having a strong understanding of your respective domain is an extremely unique skill that could make your role even more important to the success of a business. Being in the middle ground between the technical side and business side of a company is where true data scientists fall. Check out some of the most common skills of domain experts found in our LinkedIn dataset:</p>"
        desc += "<img class='charts' src='/images/domain_experts.png'></img>"
    };
    // right middle
    if(XAVG > 2 && -2 >= YAVG <=2){
        desc = '<h3 id="result"> RESULT: DOMAIN EXPERT </h3>'
        desc += "<h3>Overview:</h3>" 
        desc += "<p>Domain experts are industry leaders, and tend to lean farther away from the technical side of work. They have great abilities when it comes to their respective industry, and can lead and communicate effectively with other business leaders and professionals. Driving business strategy and decision making are a key component of the tasks and roles of a domain expert, and their work contributes to increase profits, spur business growth and development, and reduce risk. In our LinkedIn dataset of data scientists, domain experts were the interesting majority of professionals, accounting for 35% of the data. Overall, domain experts have a stronger understanding of their “niche,” whether it be a particular company, line of work, or business. Here is a distribution of some of the most common skills of domain experts found in our dataset:</p>" 
        desc += "<img class='charts' src='/images/domain_experts.png'></img>"
        desc += "<p>Our algorithm determined that in order to become a more well-rounded data scientist, it might serve you to expand your skills on computer programming. Having a strong ability to analyze data and perform computing tasks on the technical side is an extremely unique skill that could make your role even more important to the success of a business. Being in the middle ground between the technical side and business side of a company is where true data scientists fall. Check out some of the most common skills of domain experts found in our LinkedIn dataset:</p>"
        desc += "<img class='charts' src='/images/programmers.png'></img>"    
    };
    // top right
    if(XAVG > 2 && YAVG > 2){
        desc = '<h3 id="result"> RESULT: MATHEMATICIAN / STATISTICIAN + DOMAIN EXPERT</h3>'
        desc += "<h3>Overview:</h3>" 
        desc += "<p>As a mathematician/statistician and a domain expert, you have both a strong background in math and stats, and your respective domain. You are able to understand and apply machine learning algorithms and statistical analysis methods, as well as navigate beyond into the business/domain side of your work. Here is a deeper breakdown of the abilities and skills of a mathematician/statistician and domain expert:</p>"
        desc += "<h3>Mathematician / Statistician:</h3>"
        desc += "<p>Mathematicians and statisticians have an incredible understanding of machine learning algorithms, predictive modeling, statistical analysis concepts. Topics like linear algebra and calculus are key components of all machine learning algorithms. When it comes to solving complex problems in the real world and creating and applying machine learning models, having a strong understanding of high level math and stats is crucial. Data scientists often start out as mathematicians and statisticians and easily adapt to the changes because of how interlinked the fields are. Mathematicians and statisticians are the greatest minority in our LinkedIn dataset of data scientists, making up about 10% of the total population. Here is a distribution of some of the most common skills of mathematicians and statisticians found in our dataset:</p>"
        desc += "<img class='charts' src='/images/math_stats.png'></img>"
        desc += "<h3>Domain Expert:</h3>"
        desc += "<p>Domain experts are industry leaders, and tend to lean farther away from the technical side of work. They have great abilities when it comes to their respective industry, and can lead and communicate effectively with other business leaders and professionals. Driving business strategy and decision making are a key component of the tasks and roles of a domain expert, and their work contributes to increase profits, spur business growth and development, and reduce risk. In our LinkedIn dataset of data scientists, domain experts were the interesting majority of professionals, accounting for 35% of the data. Overall, domain experts have a stronger understanding of their “niche,” whether it be a particular company, line of work, or business. Here is a distribution of some of the most common skills of domain experts found in our dataset:</p>"
        desc += "<img class='charts' src='/images/domain_experts.png'></img>"
        desc += "<p>Our algorithm determined that in order to become a more well-rounded data scientist, it might serve you to expand your skills on data storytelling and programming. Data storytellers are able to take data, analyze it, and through visualizations, tell a story about that data to others. Data storytellers go beyond just the analysis and are able to effectively communicate their results to business leaders. In this sense, data storytellers are experts when it comes to relaying their findings through data visualizations in a way that business leaders can interpret, understand, and implement. At the same time, having a strong ability to analyze data and perform computing tasks on the technical side is an extremely unique skill that could make your role even more important to the success of a business. Check out some of the most common skills of data storytellers and programmers found in our LinkedIn dataset:</p>"
        desc += "<img class='charts' src='/images/storytellers.png'></img>"
        desc += "<img class='charts' src='/images/programmers.png'></img>"
    };
    // top left
    if(XAVG < -2 && YAVG > 2){
        desc = '<h3 id="result"> RESULT: MATHEMATICIAN / STATISTICIAN + PROGRAMMER</h3>'
        desc += "<h3>Overview:</h3>" 
        desc += "<p>As a mathematician/statistician and a programmer, you have a very strong technical ability. You are able to understand and apply machine learning algorithms and statistical analysis methods, as well as use programming languages to analyze and gain insights from big datasets. Here is a deeper breakdown of the abilities and skills of a mathematician/statistician and domain expert:</p>"
        desc += "<h3>Mathematician / Statistician:</h3>"
        desc += "<p>Mathematicians and statisticians have an incredible understanding of machine learning algorithms, predictive modeling, statistical analysis concepts. Topics like linear algebra and calculus are key components of all machine learning algorithms. When it comes to solving complex problems in the real world and creating and applying machine learning models, having a strong understanding of high level math and stats is crucial. Data scientists often start out as mathematicians and statisticians and easily adapt to the changes because of how interlinked the fields are. Mathematicians and statisticians are the greatest minority in our LinkedIn dataset of data scientists, making up about 10% of the total population. Here is a distribution of some of the most common skills of mathematicians and statisticians found in our dataset:</p>"
        desc += "<img class='charts' src='/images/math_stats.png'></img>"
        desc += "<h3>Programmer:</h3>" 
        desc += "<p>The term “Programmer” is very broad in the sense that it encapsulates numerous professions that have a strong emphasis on computer programming, from Software Engineers to Data Engineers and Architects, to even Machine Learning Engineers. Programmers make up about 30% of our data set of data scientists on LinkedIn, which is ranked the second most popular title out of four clusters of types of data scientists. As a programmer, you are responsible to write code to do a multitude of tasks. As a part of their day-to-day work, programmers are more focused on the front-end/back-end development, creating web and mobile applications, developing operating systems, implementing machine learning algorithms and models, and designing innovative software for businesses. Here is a distribution of some of the most common skills of programmers found in our dataset:</p>"
        desc += "<img class='charts' src='/images/programmers.png'></img>"
        desc += "<p>Our algorithm determined that in order to become a more well-rounded data scientist, it might serve you to expand your skills on data storytelling and domain expertise. Data storytellers are able to take data, analyze it, and through visualizations, tell a story about that data to others. Data storytellers go beyond just the analysis and are able to effectively communicate their results to business leaders. In this sense, data storytellers are experts when it comes to relaying their findings through data visualizations in a way that business leaders can interpret, understand, and implement. At the same time, having a strong understanding of your respective domain is an extremely unique skill that could make your role even more important to the success of a business. Being in the middle ground between the technical side and business side of a company is where true data scientists fall. Check out some of the most common skills of data storytellers and domain experts found in our LinkedIn dataset:</p>"
        desc += "<img class='charts' src='/images/storytellers.png'></img>"
        desc += "<img class='charts' src='/images/domain_experts.png'></img>"
    };
    // bottom right
    if(XAVG > 2 && YAVG < -2){
        desc = '<h3 id="result"> RESULT: DATA STORYTELLER + DOMAIN EXPERT</h3>'
        desc += "<h3>Overview:</h3>" 
        desc += "<p>As a data storyteller and domain expert, you are able to create effective data visualizations and relay your insights to colleagues and business leaders and executives effectively. At the same time, you have the ability to go beyond the technical side and work as a leader with business executives and decision makers. Here is a deeper breakdown of the abilities and skills of a data storyteller and domain expert:</p>"
        desc += "<h3>Data Storyteller:</h3>" 
        desc += "<p>Data storytellers are excellent communicators and do much more than just analyze data. As a data storyteller, you are able to take data, and through visualizations, tell a story about that data to others. In the workforce, being a data storyteller is a crucial skill. While there are many people that can perform some sort of data analysis, data storytellers go beyond just the analysis and are able to effectively communicate their results to their colleagues or business leaders. In this sense, data storytellers are experts when it comes to relaying their findings through data visualizations in a way that business leaders can interpret, understand, and implement. Data storytellers make up about 25% percent of types of data scientists in our LinkedIn dataset, which is the second least out of the other categories. Here is a distribution of some of the most common skills of data storytellers found in our dataset:</p>"
        desc += "<img class='charts' src='/images/storytellers.png'></img>"
        desc += "<h3>Domain Expert:</h3>" 
        desc += "<p>Domain experts are industry leaders, and tend to lean farther away from the technical side of work. They have great abilities when it comes to their respective industry, and can lead and communicate effectively with other business leaders and professionals. Driving business strategy and decision making are a key component of the tasks and roles of a domain expert, and their work contributes to increase profits, spur business growth and development, and reduce risk. In our LinkedIn dataset of data scientists, domain experts were the interesting majority of professionals, accounting for 35% of the data. Overall, domain experts have a stronger understanding of their “niche,” whether it be a particular company, line of work, or business. Here is a distribution of some of the most common skills of domain experts found in our dataset:</p>"
        desc += "<img class='charts' src='/images/domain_experts.png'></img>"
        desc += "<p>Our algorithm determined that in order to become a more well-rounded data scientist, it might serve you to expand your skills on math/stats, and programming. Concepts like linear algebra and calculus are key components of all machine learning algorithms. When it comes to solving complex problems in the real world and creating and applying machine learning models, having a strong understanding of high level math and stats is crucial, and is a skill that all data scientists must have and be able to use on a daily basis. At the same time, having a strong ability to analyze data and perform computing tasks on the technical side is an extremely unique skill that could make your role even more important to the success of a business. Check out some of the most common skills of mathematicians/statisticians and programmers found in our LinkedIn dataset:</p>"
        desc += "<img class='charts' src='/images/math_stats.png'></img>"
        desc += "<img class='charts' src='/images/programmers.png'></img>"
    };
    // bottom left
    if(XAVG < -2 && YAVG < -2){
        desc = '<h3 id="result"> RESULT: PROGRAMMER + DATA STORYTELLER</h3>'
        desc += "<h3>Overview:</h3>" 
        desc += "<p>As a programmer and data storyteller, you are able to utilize various computer programming languages to analyze and gain insights from big datasets. At the same time, you are able to create effective data visualizations and relay your insights to colleagues and business leaders and executives effectively. Here is a deeper breakdown of the abilities and skills of a programmer and data storyteller:</p>"
        desc += "<h3>Programmer:</h3>" 
        desc += "<p>The term “Programmer” is very broad in the sense that it encapsulates numerous professions that have a strong emphasis on computer programming, from Software Engineers to Data Engineers and Architects, to even Machine Learning Engineers. Programmers make up about 30% of our data set of data scientists on LinkedIn, which is ranked the second most popular title out of four clusters of types of data scientists. As a programmer, you are responsible to write code to do a multitude of tasks. As a part of their day-to-day work, programmers are more focused on the front-end/back-end development, creating web and mobile applications, developing operating systems, implementing machine learning algorithms and models, and designing innovative software for businesses. Here is a distribution of some of the most common skills of programmers found in our dataset:</p>"
        desc += "<img class='charts' src='/images/programmers.png'></img>"
        desc += "<h3>Data Storyteller:</h3>" 
        desc += "<p>Data storytellers are excellent communicators and do much more than just analyze data. As a data storyteller, you are able to take data, and through visualizations, tell a story about that data to others. In the workforce, being a data storyteller is a crucial skill. While there are many people that can perform some sort of data analysis, data storytellers go beyond just the analysis and are able to effectively communicate their results to their colleagues or business leaders. In this sense, data storytellers are experts when it comes to relaying their findings through data visualizations in a way that business leaders can interpret, understand, and implement. Data storytellers make up about 25% percent of types of data scientists in our LinkedIn dataset, which is the second least out of the other categories. Here is a distribution of some of the most common skills of data storytellers found in our dataset:</p>"
        desc += "<img class='charts' src='/images/storytellers.png'></img>"
        desc += "<p>Our algorithm determined that in order to become a more well-rounded data scientist, it might serve you to expand your skills on math/stats and domain expertise. Concepts like linear algebra and calculus are key components of all machine learning algorithms. When it comes to solving complex problems in the real world and creating and applying machine learning models, having a strong understanding of high level math and stats is crucial, and is a skill that all data scientists must have and be able to use on a daily basis. At the same time, having a strong understanding of your respective domain is an extremely unique skill that could make your role even more important to the success of a business. Being in the middle ground between the technical side and business side of a company is where true data scientists fall. Check out some of the most common skills of mathematicians/statisticians and domain experts found in our LinkedIn dataset:</p>"
        desc += "<img class='charts' src='/images/math_stats.png'></img>"
        desc += "<img class='charts' src='/images/domain_experts.png'></img>"
    };

    // IF ALLFALSE = TRUE CASE
    if(ALLFALSE == true) {
        document.getElementById("graph").style.display = 'none';
        desc = '<h3 id="result"> The survey results show that you strongly disagreed to every question, which may mean you are in the wrong place. If you want to become a data scientist, check out our description of data scientists as well as the skills required to become one below: </h3>'
        desc += '<p>&#9;Data scientists are a little bit of everything when it comes to their roles and skills in the professional world. As leading programmers and engineers with strong backgrounds in mathematics and statistics, an ability to communicate analysis and findings effectively, and an impressive understanding of their relative industries, data scientists have it all. Overall, data scientists play key roles in extracting value from data using skills like data analysis, statistical analysis, and machine learning all while conveying results to business leaders and decision makers. Data science is a relatively new field and is growing rapidly as more companies invest more and more into ML/AI initiatives. Here is a deeper breakdown of the abilities and skills of a data scientist:</p>'
        desc += "<h3>Mathematician  / Statistician:</h3>" 
        desc += "<p>&#9;A key component of being an effective data scientist is having a strong understanding of core math and stats concepts. Math and stats are absolutely essential for utilizing machine learning algorithms, solving complex problems in the real world, and performing data analysis. Data scientists often start out as mathematicians and statisticians and easily adapt to the changes because of how interlinked the fields are. Math concepts like linear algebra and calculus are key componentes of all alogirthm applications. </p>"
        desc += "<img class='charts' src='/images/math_stats.png'></img>"
        desc += "<h3>Programmer:</h3>" 
        desc += "<p>&#9;Along with having a strong math/stats background, data scientists are very proficient programmers, and use programming languages like Python, Java, R, and SQL to drive insights from big datasets they are working with. Rather than the typical roles of software engineers and computer scientists, data scientists focus on utilizing programming for data analysis. Whether it be for data cleaning, mining, or for creating a machine learning algorithm, data scientists use various computer programs to leverage big data and to get the insights their business needs.</p>"
        desc += "<img class='charts' src='/images/programmers.png'></img>"
        desc += "<h3>Domain Expert:</h3>" 
        desc += "<p>&#9;While data scientists have a strong technical background, they are also domain experts, and have a strong understanding of their business and industry. In this sense, data scientists have the middle ground between the technical and business side of their company. Having a strong understanding of their respective domain is an extremely unique skill data scientists have, and makes their role even more important to the success of a business.</p>"
        desc += "<img class='charts' src='/images/domain_experts.png'></img>"
        desc += "<h3>Data Storyteller:</h3>" 
        desc += "<p>&#9;Not only do data scientists spend time programming, analyzing data, and implementing machine learning models, but they also have to convey their results to business executives and decision makers. In this sense, data scientists are experts when it comes to relaying their findings through data visualizations in a way that business leaders can interpret, understand, and implement. Data storytelling and being able to interpret findings to those who cannot understand the code and program is a key skill data scientists have and differentiates data scientists from computer scientists and software engineers for the most part.</p>"
        desc += "<img class='charts' src='/images/storytellers.png'></img>"
    }


    desc += '<form name="submit-to-google-sheet">' +
        '<table>' +
            '<tr>' +            
                '<p style="margin-top:20%" class="callToAction Top">Did you enjoy taking our survey?  Lets get you connected to The Data Standard.</p>' +
                '<p class="callToAction">The Data Standard is the premier community of data thought leaders in every vertical. On its platform, The Data Standard hosts unique podcasts, blog content, and monthly thought leadership events featuring many leading industry data science professionals from companies like Microsoft, IBM, and more.</p>' +
                '<p class="callToAction">Please enter your email and name so we can reach out to you and get you involved in the Data Standard’s Premium Community.</p>' +
            '</tr>' +
            '<tr>' +
                '<td>Email: </td>' +
                '<td>' +
                    '<input name="email" class="form-input"type="email" placeholder="example@domain.com" required>' +
                '</td>' +
            '</tr>' +
            '<tr>' +
                '<td>Name: </td>' +
                '<td>' +
                    '<input name="name" class="form-input" type="text" placeholder="John Smith"><br>' +
                '</td>' +
            '</tr>' +
        '</table>' +
        '<button id="emailSubmit" class="submitFormBtn" type="submit">Get Connected!</button>' +
    '</form>'

    wrapper.innerHTML = desc;

const scriptURL = 'https://script.google.com/a/macros/datastandard.io/s/AKfycby4qJDC1ZxgMVsE6KmTJ2Cluucy5AFBmjmzCmHZ5_j2FnmZcBUD-UjebA/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
})

    // Sharables (button)
    // https://www.progress.com/blogs/make-your-website-content-shareable-with-social-media-sharing-buttons
};
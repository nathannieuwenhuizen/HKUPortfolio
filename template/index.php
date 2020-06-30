<!DOCTYPE HTML>
<HTML>

<HEAD>
	<TITLE>Nathan Nieuwenhuizen</TITLE>
	<link rel="icon" type="image/png" href="./assets/page_elements/profile.jpg"/>
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	<link id="stylesheet" rel="stylesheet" href="assets/style.css?version=2" type="text/css" />
	<script src="assets/dir.php"></script>
	<script src="app.js"></script>
	<script src="assets/flocking.js"></script>
</HEAD>

<BODY>
	<div id="wrapper"> 
	<input type="button" value="change style" id="styleButton"/>
	<header>
		<section class="title_image">
			<canvas id="selfCanvas"></canvas>
			<div id="selfImage">
			<div id="circleWrapper">
				<div id="flockButton">Show boids! </div>
				<canvas id="canvas"></canvas>
				<canvas id="selfCanvasResult"></canvas>
				<div id="speak" class="hide">...</div>
			</div>
				<form action="assets/upload.php" method="post" enctype="multipart/form-data">
					<input type="file" id="selfFile" name="selfFile" style="display: none;"/>
					<input type="button" value="Browse..." name="selfButton" id ="selfButton" onclick="document.getElementById('selfFile').click();" />
					<input type="range" id="selfValue" value="1" min="1" max="200" />
					<input type="submit" value="Upload" id="submit" name="submit">
					<input type="button" value="show uploaded images" name="uploadImage" id ="uploadImage" />
				</form>
 			</div>
 
		</section>
		<section class="title_text">
			<section class="text">
				<h1>Nathan</h1>
				<h1>Nieuwenhuizen</h1>
				<h2>Game developer</h2>
			</section>
		</section>
	</header>
	<nav>
		<ul id="navigation">
		<a id ="profileShortcut" href="./index.php"></a>

			<li><a href="./">Home</a></li>
			<li><a href="./#projecten">My Work</a></li>
			<li><a href="./#about">About</a></li>
			<li><a href="./#contact">Contact</a></li>
			<!-- <li><a href="./dirtest.php">HKU</a></li> -->
		</ul>
	</nav>
	<section class="content">

		<!-- <div class="flipTile">
			<div class="cover">
				<section class="front">
					<h2>Title project</h2>
				</section>
				<section class="back"></section>
			</div>
			<div class="backPage">
				<h2>Title project</h2>
				<p><b>Type </b> type prpject</p>
				<p><b>Date </b> 0-0-1995</p>
				<p><b>Duration </b> 2 weeks</p>
				<p><b>Team </b> all by myself :(</p>
				
				<p><b>Description: </b> </p>
				<p> text text text text text text text text text text text text text text </p>
				<div class="buttons">
				<a href="./index.php"></a>
				<a href="./index.php"></a>
				<a href="./index.php"></a>
			</div>


			</div>
		</div> -->

		<section id="about">
			<section class="aboutField">
				<section class="centerField">
				</section>
				<section class="socialField">
					<a target="_blank" href="https://github.com/nathannieuwenhuizen"><img src="./assets/page_elements/github.png" /></a>
					<!-- github -->
					<a target="_blank" href="https://nl.linkedin.com/in/nathan-nieuwenhuizen-908395b3"><img src="./assets/page_elements/li.png" /></a>
					<!-- linkedin -->
					<a target="_blank" href="assets/files/resume.pdf"><img src="./assets/files/cv.png" /></a>
					<!-- CV -->
					<a target="_blank" href="https://nathannieuwenhuizen.itch.io/"><img src="./assets/page_elements/itch.png" /></a>
					<!-- itch -->


				</section>
				<section class="summaryField">
					<p><b>Name</b> Nathan Nieuwenhuizen</p>
					<p><b>Age</b> 24</p>
					<p><b>Summary</b> Hello, I'm Nathan. I'm a game developer currently studying 'Games and Interaction' at the HKU
						in Utrecht.</p>
				</section>
				<section class="newStatField">
					<ul>
					<li class="li">HTML5</li>
					<li class="li">CSS</li>
					<li class="li">Javascript</li>
					<li class="li">Typescript</li>
					<li class="li">C#</li>
					<li class="li">C++</li>
					<li class="li">SCRUM</li>
					<li class="li">Agile</li>
					<li class="li">Unity</li>
					<li class="li">PHP</li>
					<li class="li">MySQL</li>
					<li class="li">Apps</li>
					</ul>
				</section>
				<section class="statField">
					<section class="stat">
						<section class="container">
							<section class="value"></section>
						</section>
						<h5>HTML5</h5>
					</section>
					<section class="stat">
						<section class="container">
							<section class="value"></section>
						</section>
						<h5>TS</h5>
					</section>
					<section class="stat">
						<section class="container">
							<section class="value"></section>
						</section>
						<h5>Phaser</h5>
					</section>

				</section>
				<section class="descriptionField">
					<p>
						Game Development to me is the realization of interactive media/game from an idea into reality!
					</p>
					<p>I am an enthusiastic programmer who can motivate himself to do any work or project either independently or in a
						team and always strive to do the best work possible.</p>
					<p>I'm open to the suggestions and feedback of others and am always looking to use these to improve my skillset. I
						must warn you I have an unusual sense of humour.
						My goal is to challenge myself to become a better programmer / designer. To become a better team player. And last
						but not least: To make games!
					</p>
				</section>
				<section class="lines">
					<span class="line"></span>
					<span class="line"></span>
					<span class="line"></span>
					<span class="line"></span>
				</section>
			</section>
		</section>

		<section id="projecten">
			<!-- <h3> Highlights</h3> -->

			<h1> Highlighted work </h1>
			<section class="slider" style="display:block; height:70vh;">
				<section class="buttons">
					<section class="button">
					</section>
					<section class="button">
					</section>
				</section>
				<section class="slideshow">
					<section class="slidecontainer">
					</section>
				</section>
			</section>

			<h2> Other works</h2>

			<h3> Order by 
				
			<select id="projectsorder" name="cars">
    <option value="Time" selected>Time</option>
    <option value="Title">Title</option>
    <option value="Type">Type of project</option>
  </select>
   | invert <input id="projectorderInvert" type="checkbox">
			</h3>
			<form  method="post" enctype="text/plain" class="projectForm hide">
				<!-- <INPUT TYPE="hidden" NAME="required" VALUE="from,name"> -->
				<label>Project name</label>
				<input class="title" type="text" name="name"><br>
				<label>Team</label>
				<input class="team" type="text" name="team"><br>
				<label>Type</label>
				<input class="type" type="text" name="type"><br>
				<label>Duration</label>
				<input class="duration" type="text" name="duration"><br>
				<label>Date</label>
				<input class="date" type="date" name="date"><br>
				
				<label>Summary</label>
				<textarea type="field" class ="summary" name="content" size="30" rows="2" cols="40"></textarea><br><br>

				<label>Description</label>
				<textarea type="field" name="content" class="description" size="80" rows="10" cols="40"></textarea><br><br>
				<label>Image links</label>
				<input class="numberofimages" type="number" name="from" value = 0><br>
				<div class="imageLinksContainer">  
				</div>
				<div id ="exampleimageLink"  class = "hide">
				<input class ="imageLink" type="text" value ="./assets/projects/" name="name"><br>
				</div> 
				<label>Amount of buttons</label>
				<input class="numberofbuttons" type="number"  name="from" value = 0><br>
				<div class="buttonContainer">  
				</div>
				<div id ="exampleButton" class="hide">
				<label>Some button</label><br>
				<label>Text</label>
				<input class ="buttonText" type="text" name="name"><br>
				<label>Link</label>
				<input class = "buttonLink" type="text" name="name"><br>
</div>
				<input type="button" id="projectUploadButton" value="Upload project">
				<!-- <input type="reset" value="Reset"> -->
			</form>

		</section>
		<section id="contact">
			<h3> Contact</h3>
			<form action="mailto:nathan.nieuwenhuizen@student.hku.nl" method="post" enctype="text/plain">
				<!-- <INPUT TYPE="hidden" NAME="required" VALUE="from,name"> -->
				<label>Name</label>
				<input type="text" name="name"><br>
				<label>E-mail</label>
				<input type="text" name="from"><br>
				<label>Subject</label>
				<input type="text" name="subject"><br>
				<label>Content</label>
				<textarea type="field" name="content" size="80" rows="10" cols="40"></textarea><br><br>
				<input type="submit" id="submit" value="Send">
				<!-- <input type="reset" value="Reset"> -->
			</form>
			<!-- <center><object data="https://www.gentlemens-magic.com/prubiked/28JM6" frameborder="no" scrolling="no" width="100%" height="400px"></object></center> -->
		</section>

		<section id="HKU">
			<h1>HKU</h1>
			<div class="filter">
				<!-- <input list="filter_val"> -->

				<select id="filter_val"> 
						<option value = ''> -- select a subject -- </option>
				  <!-- <option value="Safari"> -->
				</select>
			</div>

			<!-- <div class="subject">
				<div class="subjectHeader">
					<div class="subjectButton"></div>
					<h2>titlesdfg</h2>
				</div>
				<div class="subjectBody">
					<div class="subjectLink">
						<a href="">link sddvfbgn</a>
						<p>axcsdvdfbbdbfb</p>
					</div>
					<div class="subjectLink">
						<a href="">link sddvfbgn</a>
						<p>axcsdvdfbbdbfb</p>
					</div>
					<div class="subjectLink">
						<a href="">link sddvfbgn</a>
						<p>axcsdvdfbbdbfb</p>
					</div>
				</div>
			</div> -->

		</section>

		<section id="projectinfo">
		<section id="project_title"> <h1 id="project_title_h"> title name </h1></section>

			<section class="projectOverview">

				<section class="slider">
					<section class="buttons">
						<section class="button">
						</section>
						<section class="button">
						</section>
					</section>
					<section class="slideshow">
						<section class="slidecontainer">
						</section>
					</section>
				</section>
				<section class="projectInfo">
					<section class="textInfo">

						<b> Type:</b>
						<p id="projectTitle"> loading... </p>

						<b> Team:</b>
						<p id="projectTeam"> loading... </p>

						<b> Duaration:</b>
						<p id="projectDuration"> loading... </p>

						<b> Date:</b>
						<p id="projectDate"> loading... </p>

						<b> Summary:</b>
						<p id="projectSummary"> loading... </p>
					</section>

					<section class="projectButtons">
					</section>
				</section>


			</section>
			<section class="projectSummary">
				<h3>Description</h3>
				<p id="projectDescription">Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen.
					Lorem Ipsum is de standaard
					proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met
					letters
					nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen
					overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in
					de
					jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer
					recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum
					bevatten.</p>
			</section>
		</section>
	</section>
	</div>

	<footer>
			<p id="viewCount">You are the  
			<?php 


			// $views = file_get_contents("views.txt"); 
			// echo $views;
			// $views += 1;
			// file_put_contents("views.txt", $views);


$filename = 'views.txt';

$file_data = file_get_contents($filename);
echo $file_data + 1054;
// $fp = fopen($filename, 'w');
// fwrite($fp, $file_data + 1);
// fclose($fp);
?>th visitor</p>
			<p> - Made by Nathan Nieuwenhuizen!</p>

	</footer> 
</BODY>

</HTML>
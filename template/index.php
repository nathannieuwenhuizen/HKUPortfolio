<?php 
	
	$sheet = $_GET['sheet']; 
	if (!isset($_GET['sheet']) || empty($_GET['sheet'])) 
	{
		$sheet = $_GET['sheet']; 
	}
	if (!filter_var($sheet, FILTER_VALIDATE_INT)) { //is not integer
		$sheet = 1;
	 } else {
	 }
	 if ($sheet > 2 || $sheet < 0) { //als de variabele groter dan 2 is
		$sheet = 1;
		// iemand is aan het fokken (zet variabele naar standaard waarde)
	 }
	// echo $sheet;
?>
<!DOCTYPE HTML>
<HTML>

<HEAD>
	<TITLE>Nathan Nieuwenhuizen</TITLE>
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	
	<link rel="stylesheet" href="assets/<?php
		if($sheet == 2) {
			echo 'style';
		} else {
			echo 'style2';
		}
	?>.css" type="text/css" />
	<script src="app.js"></script>
</HEAD>

<BODY>
	
	<header>
		<section class="title_image">
			<img src="assets/page_elements/pf.jpg" />
			<canvas id="selfCanvas"></canvas>
			<div id="selfImage">
				<canvas id="selfCanvasResult"></canvas>
				<input type="range" id="selfValue" value="15" min="3" max="50" />

			</div>

		</section>
		<section class="title_text">
			<section class="text">
				<h1>Nathan Nieuwenhuizen</h1>
				<h2>Game developer</h2>
			</section>
		</section>
	</header>
	<nav>
		<ul id="navigation">
			<li><a href="#">Home</a></li>
			<li><a href="#projecten">Projects</a></li>
			<li><a href="#about">About</a></li>
			<li><a href="#contact">Contact</a></li>
			<li><a href="#HKU">HKU</a></li>
		</ul>
	</nav>
	<section class="content">


		<section id="about">
			<section class="aboutField">
				<section class="centerField">
				</section>
				<section class="socialField">
					<a target="_blank" href="https://github.com/nathannieuwenhuizen"><img src="./assets/page_elements/github.png" /></a>
					<!-- github -->
					<a target="_blank" href="https://nl.linkedin.com/in/nathan-nieuwenhuizen-908395b3"><img src="./assets/page_elements/li.png" /></a>
					<!-- linkedin -->
					<a href="mailto:nathan-san@live.nl"><img src="./assets/page_elements/email.png" /></a>
					<!-- email -->
					<a target="_blank" href="assets/files/CV_ENGLISH.pdf"><img src="./assets/files/cv.png" /></a>
					<!-- CV -->
				</section>
				<section class="summaryField">
					<p><b>Name</b> Nathan Nieuwenhuizen</p>
					<p><b>Age</b> 22</p>
					<p><b>Summary</b> Hello, I''m Nathan. I am a game developer currently studying 'Games and Interaction' ath the HKU
						in Utrecht.</p>
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
					<p>
						One of my favourite games is the game 'Portal', because it has a simple mechanic that gets deeper and deeper the
						more you go into the game making it one of the deepest tutorials I've ever witnissed!
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
			<h3> Highlights</h3>

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

			<h3> All projects</h3>

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
		</section>
		<section id="HKU">
			<h1>HKU</h1>

			<div class="subject">
				<div class="subjectHeader">
					<h2>title</h2> 
				</div> 
				<div class="subjectLink">
					<a href="">link sddvfbgn</a>
					<p>axcsdvdfbbdbfb</p>
				</div>

			</div>

		</section>

		<section id="projectinfo">
			<section class="projectOverview">
				<section class="slider" style="width: 60%;">
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

						<b> Name:</b>
						<p id="projectTitle"> loading... </p>

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
				<h4>Summary</h4>
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

	<footer>Made by Nathan Nieuwenhuizen</footer>
</BODY>

</HTML>
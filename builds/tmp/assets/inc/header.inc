<input type="button" value="change style" id="styleButton"/>
	<header>
		<section class="title_image">
			<canvas id="selfCanvas"></canvas>
			<div id="selfImage">
				<canvas id="selfCanvasResult"></canvas>
				<form action="assets/upload.php" method="post" enctype="multipart/form-data">
					<input type="file" id="selfFile" name="selfFile" style="display: none;"/>
					<input type="button" value="Browse..." name="selfButton" id ="selfButton" onclick="document.getElementById('selfFile').click();" />
					<input type="range" id="selfValue" value="15" min="2" max="200" />
					<input type="submit" value="Upload" id="submit" name="submit">
					<input type="button" value="show uploaded images" name="uploadImage" id ="uploadImage" />
				</form>
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
			<li><a href="./">Home</a></li>
			<li><a href="./#projecten">Projects</a></li>
			<li><a href="./#about">About</a></li>
			<li><a href="./#contact">Contact</a></li>
			<li><a href="./dirtest.php">HKU</a></li>
		</ul>
	</nav>
	<section class="content">
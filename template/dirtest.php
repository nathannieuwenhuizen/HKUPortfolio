<?php
	/*
	Script geschreven door Ton Markus, versie 10-2018
	
	Dit script bekijkt een map, maakt links naar bestanden en submappen in die map en beeld deze af.
	Je kan kiezen of je links naar beeldmateriaal als de naam van het bestand wil laten zien, of dat je (een verkleinde versie van) de illustratie als link wil laten zien.
	Let er bij je naamgeving op dat je geen spaties, punten of slashes in namen gebruikt.
	Let bij de bestandsextensies op hoofdletter gevoeligheid. JPG is niet hetzelfde als jpg. Als je JPG met hoofdletters wil toelaten zal je die toe moeten voegen aan de $illustratie_file_formats
	
	Sorteren van mappen gaat op basis van een getal vooraan de mapnaam, gevolgd door een - (min-teken). Als het getal een JaarMaandDag datum is (20181017 voor 17-10-2018) zal de datum op de juiste manier vooraan de mapnaam afgebeeld worden. Als er een ander cijfer (1,50, 30005) staat zal de op die volgorde omgekeerd gesorteerd worden. Dit omgekeerd is het gevolg van het sorteren op datum waarbij het laatste werk (met de 'hoogste' datum) bovenaan moet komen.
	
	Dit deel van het script hoort bovenaan de php pagina geplaatst te zijn (nog boven de doctype).
	*/
	
	//**** algemene instellingen, hier kan je dingen aanpassen ****
	$hoofd_directory = "huiswerk"; // deze variabele moet de naam hebben van de hoofdmap waar je huiswerk in zit.
	$laat_illustratie_zien = 2; // keuze of je bij gelinkte illustraties de namen van de illustraties wil laten zien of een (verkleinde) afbeelding van de illustraties. 0 = alleen naam, 1 = illustratie, 2 = beide
	$illustratie_opmaak = "width:200px;margin-bottom:10px;"; // breedte van de klikbare illustraties
	$illustratie_file_formats = array("jpg","gif","png"); // file extentions die afgebeeld moeten worden 
	//**** vanaf hier geen dingen in de fucntions aanpassen, behalve als je heel dapper bent *****

	// vanaf hieronder tot het eind van het script hoef je niks te veranderen
	// hieronder staan de functions die het feitelijke werk doen
	
	function controle($hoofd_directory,$getdir) // Dit is het gedeelte dat de beveiliging regelt en de juiste directory bepaalt
	{
		// controle op hacken stap 1
		if (count(explode(":", $getdir))!=1) // hak in stukjes en als het niet 1 stuk is (dan zat er een : in)
		{
			return hoofdpagina($hoofd_directory); // foutje of hackpoging, hoofdpagina laten zien
		}
		else
		{
			// controle op hacken stap 2
			$subdirectory = str_replace(array(".","%"," ","\"","'"), "", filter_var($getdir, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH)); // haal eventuele andere rommel uit de mapnaam
			if ($subdirectory!=$getdir) // als de gecleande versie anders is dan het origineel dan zat er rommel in
			{
				return hoofdpagina($hoofd_directory); // foutje of hackpoging, hoofdpagina laten zien
			}
			else
			{
				$directory_om_te_scannen = $hoofd_directory . "/" . $subdirectory; // pad naar map die gebruikt moet worden maken van hoofdmap + submap.
			}
			
			// controle op hacken stap 3 
			if (file_exists($directory_om_te_scannen)) // bestaat de map? 
			{
				 return subpagina($directory_om_te_scannen);		
			}
			else // als de gevraagde map niet bestaat
			{
				return hoofdpagina($hoofd_directory);  // foutje of hackpoging, hoofdpagina laten zien
			}
		}
	}
	
	function subpagina($directory_om_te_scannen)
	{
		global $hoofd_directory,$laat_illustratie_zien,$illustratie_opmaak,$illustratie_file_formats;	
		$scanned_directory = array_diff(scandir($directory_om_te_scannen), array('..', '.')); // maak een lijst aan met alles in de map en zorg dat "rommel" die standaard in iedere Unix directory zit niet meegenomen wordt
		$scanned_directory = array_reverse($scanned_directory); // keer volgorde arry om om laatste datum boven te krijgen.
		$comment="";
		$terug="";
		if (in_array("_settings.php", $scanned_directory)) // als er een settings file in de map staat
			{
				$scanned_directory = array_diff($scanned_directory,array('_settings.php')); // haal de naam settings file uit de lijst
				include($directory_om_te_scannen . "/_settings.php"); // include het settings file zodat eventuele afwijke waarden voor instellingen geladen worden
			}
			
		// bouw breadcrumb
		$terug .= breadcrumb($directory_om_te_scannen);
		
		$terug .= "<p><input type=\"button\" value=\"&larr; Terug\" onclick=\"window.history.back()\"></p>"; // beeld de terug knop af	
				
		$terug .= ($comment!="")? "<p>" . $comment . "</p>":"";// laat het eventuele commentaar uit het _setings file zien		
		foreach ($scanned_directory as $link) //maak een loop voor alle elementen in de lijst
		{
			$visible = naam_omzetten($link); // vervang de underscores door spaties om de naam te laten zien
			$file_of_dir = (empty($subdirectory))? $link:$subdirectory . "/". $link; // als submap leeg is (bij hoofdmap of hack) geen / ervoor. 
			
			if(is_dir($directory_om_te_scannen."/".$file_of_dir)) // is het een directory
			{
				// hier regelen dat _settings file gelezen wordt
				$terug .= "<a href=\"?dir=".str_replace(($hoofd_directory."/"), "", $directory_om_te_scannen)."/".$file_of_dir."\" class=\"iets\">".$visible."</a><br />"; // dan link naar directory
			}
			else // als geen directory, dan een file
			{
				if ($laat_illustratie_zien >= 1) // alleen uitvoeren als gekozen is om klikbare illustratie previews te laten zien
				{
					$extension = pathinfo($file_of_dir, PATHINFO_EXTENSION); // wat is de extensie van het bestand
					if (in_array($extension, $illustratie_file_formats)) // als die extentie voorkomt in de lijst
					{
						$image = "<img src=\"" . $directory_om_te_scannen . "/" . $file_of_dir . "\" class=\"classnaam\" style=\"" . $illustratie_opmaak . "\">"; // laat illustratie zien
						if ($laat_illustratie_zien == 2) // ook nog de tekst laten zien?
						{
							$visible = $image . "<br />" . $visible; // zo ja, tekst en illustratie laten zien
						}
						else
						{
							$visible = $image; // zo nee, alleen illustratie laten zien
						}
					}	
				}
				
				$visible=str_replace(".php", "", $visible); // haal bij php files (html-pagina's) de extensie weg
					
				$terug .= "<a href=\"". $directory_om_te_scannen . "/" . $file_of_dir . "\" target=\"laat_huiswerk_zien\" class=\"classnaam\">".$visible."</a><br />"; // dan link naar file
			}
		}
		
		return $terug;	
				
	}
	
	function breadcrumb($directory)
	{
		$directory_array = explode("/", $directory);
		$breadcrumb = "<span class=\"breadcrumb\"><a href=\"?\">" . $directory_array[0] . "</a>";
		array_shift($directory_array); // verwijder de eerste entry in de array (dit is de home directory)
		$present = array_pop($directory_array); //verwijder de laatste entry uit de array, dit is is de huidig directory file
		foreach ($directory_array as $link) // loop door de array om de hele breadcrumb te laten zien
		{
			$breadcrumb .= " &rarr; <a href=\"?dir=" . $link . "\">" . naam_omzetten($link) . "</a>"; // maak een link aan voor iedere stap van de breadcrumb
		}
		$breadcrumb .= " &rarr; " . naam_omzetten($present); // voeg het huidige directory toe (zonder link)
		
		return $breadcrumb;
	}
	
	function hoofdpagina($hoofd_directory)
	{
		$terug = ""; // gaat straks alle content bevatten die door de functie returnded wordt.
		$hoofd_directory_array = array_diff(scandir($hoofd_directory), array('..', '.')); // maak een lijst aan met alles in de map en zorg dat "rommel" die standaard in iedere Unix directory zit niet meegenomen wordt
		foreach ($hoofd_directory_array as $niveau1) //maak een loop voor alle elementen in de lijst
		{	
			$terug .= "<div class=\"themablok\">";
			$terug .= "<h1><a href=\"?dir=".$niveau1."\" class=\"iets\">" . naam_omzetten($niveau1) . "</a></h1>";
			$niveau2 = array_diff(scandir(($hoofd_directory."/".$niveau1)), array('..', '.')); // maak een lijst aan met alles in de map en zorg dat "rommel" die standaard in iedere Unix directory zit niet meegenomen wordt
			$niveau2 = array_reverse($niveau2); // keer volgorde arry om om laatste datum boven te krijgen.
			foreach ($niveau2 as $niveau3) //maak een loop voor alle elementen in de lijst
			{
				if (is_dir($hoofd_directory."/".$niveau1."/".$niveau3)) // is het een directory
				{
					$terug .= "<a href=\"?dir=".$niveau1."/".$niveau3."\" class=\"iets\">".naam_omzetten($niveau3)."</a><br />"; // dan link naar directory
				}
				else // als geen directory, dan een file
				{
					$terug .= "<a href=\"". $hoofd_directory . "/" . $niveau1 . "/" . $niveau3 . "\" target=\"laat_huiswerk_zien\" class=\"classnaam\">".naam_omzetten($niveau3)."</a><br />"; // dan link naar file
				}
			}
			$terug .= "</div>";
		}
		
		return $terug;
	}
	
	function naam_omzetten($naam)
	{
		$naam_delen = explode("-", $naam);
		if (filter_var($naam_delen[0],FILTER_VALIDATE_INT)) // is het eerste deel van de naam een int, dan is ie gebruikt om te sorteren
		{
			$sorter = array_shift($naam_delen);
			$datum="";
			if (strlen($sorter)==8) // dan is het een datum
			{
				$datum = substr($sorter,6,2) . "-" . substr($sorter,4,2). "-" . substr($sorter,0,4);
			}
			$naam = $datum . " " . implode("-", $naam_delen);
		}
		
		$naam = str_replace(".php", "", str_replace("_", " ", $naam));
		
		return $naam;
	}
	
?>

<!doctype html>
<html>

	<head>
		<?php include "./assets/inc/head.inc"; ?>
		<style>
			.themablok
			{
				display:inline-block;
				/* border: 1px solid #f00; */
				box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 20px;
				margin: 0px 20px 20px 0px;
				vertical-align: top;
				min-height: 60px;
				width: 250px;
			}
			
			.themablok H1
			{
				box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 20px;
				font-size: 15pt;
			}
			a {
				/* width: 50px; */
			}
			
		</style>
	</head>

	<body>

<?php
include "./assets/inc/header.inc";
/*
	Dit is het script dat zorgt voor het afbeelden.
	Boven en onder de php tags mag je je eigen html code toevoegen
*/
	if (!isset($_GET["dir"]) || empty($_GET["dir"])) // als niet de juiste var in de url staat hoofdpagina laten zien
	{
		print hoofdpagina($hoofd_directory); // voor "hoofdmap" overzicht maken met 1 niveau dieper
	}
	else
	{
		print controle($hoofd_directory,$_GET["dir"]); //voor submappen "inhoud" laten zien
	}
	include ".\./assets/inc/footer.inc";

?>

	</body>

</html>
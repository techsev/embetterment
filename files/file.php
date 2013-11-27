<?php 

include "../includes/database.php";

$file_folder = "http:///www.thebettermentofseve.com/files/";
$file_resume = "Seve_Teruel_Resume";


function sendResume($extension = 'pdf'){
	global $file_folder, $file_resume, $dbh;

	if(isset($_GET['visitorId']))
	{
		$sth = $dbh->prepare("UPDATE visitors set resume_downloaded = ? WHERE hash like ?");
		$sth->execute(array($extension,$_GET['visitorId']));

		
	}

	header( 'Location: '. $file_folder . $file_resume . '.' . $extension );



}

if(isset($_GET['file']))
{
	switch($_GET['file'])
	{
		case "resume":
					if(isset($_GET['type']))
					{
						sendResume($_GET['type']);
					} else {
						die;
					}
					break;
	}
}


?>
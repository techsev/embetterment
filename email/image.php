<?php 

//
//	Email Tracking Pixel 
//	By Seve Savoie Teruel
//
//	Version 0.1
//	Used to track what has been opened and when.
//

header("content-type:image/jpg");
$im=imagecreate(1,1);
$white=imagecolorallocate($im,255,255,255);
imagesetpixel($im,1,1,$white);
imagejpeg($im);
imagedestroy($im);
/*
header("Expires: Mon, 26 Jul 12012 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
*/


include "../includes/database.php";

// 

$json = NULL;


function trackEmail($hash){
	global $dbh;
	
	if(is_numeric($hash))
	{
		$sth = $dbh->prepare('UPDATE visitors set email_opened = now() WHERE hash = ' . $hash);
		$sth->execute();

			//Future implementations: send myself email when email is opened.


		return true;
		
	} else { return false;}
}



//Check action required for JSON

if (isset($_GET['action']) && $action = $_GET['action'])
{
	switch($action){
		case 'trackEmail':
		if(isset($_GET['id']))
		{
			trackEmail(@$_GET['id'],@$_GET['ip']);
		} else {
			die;
		}
		break;
		

	}

}










?>
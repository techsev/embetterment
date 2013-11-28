<?php 

//
//	JSON Generating Script 
//	By Seve Savoie Teruel
//
//	Version 0.1
//	Used for back and forth communication between front and back end
//


include "../includes/database.php";

// 

$json = NULL;


function trackVisitor($hash = null, $ip = null){
	global $dbh;
	if($hash != null)
	{
		// Get visitor my id
		$sql = "SELECT * FROM visitors WHERE hash like '$hash'";
	} else if($ip != null) 
	{	//search for visitor using last ip (this is to see if someone at an office is testing on multiple devices using same wifi)
		$sql = "SELECT * FROM visitors WHERE ip like '$ip'";
	} else {
		return false;
	}

	$sth = $dbh->prepare($sql);
	$sth->execute();
	$results = $sth->fetch();
	
	if(count($results) > 0)
		{
			
			$sth = $dbh->prepare('UPDATE visitors set last_visit = now(), counter = counter + 1 WHERE id = ' . $results['id']);
			$sth->execute();
			


			return array('status' => 'success',
				'id' => $results['hash'],
				'name' => $results['name'],
				'type' => $results['type'],
				'job_opening' => $results['job_opening'],
				'ip' => $results['ip'],
				'counter' => intval($results['counter']) + 1,
				'email_opened' => $results['email_opened'],
				'last_visit' => $results['last_visit']);
		} else { return false;}
}



//Check action required for JSON

if (isset($_GET['action']) && $action = $_GET['action'])
{
	
switch($action){
	case 'trackVisitor':
						
						$json = trackVisitor($_GET['id'],$_GET['ip']);
						break;
						

}

if($json != null){ echo json_encode($json);}
} else {
	echo json_encode(array('status' => 'Error','Error' => 'JSON is null'));
}










?>
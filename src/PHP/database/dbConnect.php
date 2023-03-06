<?php 
	/**
	* Database Connection
	*/
	class dbConnect {
		private $server = "localhost";
		private $dbname = "scandiproject";
		private $user = "root";
		private $pass = "";

		// *for FreeHostingNoAds*
		// private $server = "fdb27.runhosting.com";
		// private $dbname = "4226523_scandiweb";
		// private $user = "4226523_scandiweb";
		// private $pass = "4;40AYP!2pa:pLIK";

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .'dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
	}
 ?>